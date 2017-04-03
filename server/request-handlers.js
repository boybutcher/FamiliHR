var googleSheet = require(__dirname + '/../databases/google/google-sheet');
var mongo = require(__dirname + '/../databases/mongo/models/familiarities');
var mongoUsers = require(__dirname + '/../databases/mongo/models/users');
var algorithm = require('./repetition-algorithm');
var mongoLeaders = require(__dirname + '/../databases/mongo/models/leaders');
var mongoHints = require(__dirname + '/../databases/mongo/models/hints');


  // NOTE: mongo structure:
  //   userId, cardId, algoData (an object) {bucket: 'red/orange/green'}

// GET /dashboard ----------------
var getDeckBucketCounts = function (req, res) {
  // Buckets are: 'red', 'orange' and 'green'

  // console.log('in get deck buckets, req:', req);

  var userId = req.user._id;

  mongo.getCardIds(userId, function(cardIds) {
    // cardIds = {
    //   'complex unique string1': {algoData},  // full algoData object
    //   'complex unique string2': {algoData},
    // };

    // console.log('received from Mongoose getCardIds:', cardIds);

    var cards = googleSheet.getAllCards(function(cards) {
      // cards = [ {
      //   id: 'complex unique string1',
      //   firstname: 'J-G',
      //   lastname: 'Demathieu',
      //   pictureUrl: 'http//jg...',
      //   deck: 'HRSF74'
      // },..];

      //console.log('cards:', cards);


      let results = {};

      cards.forEach(function(card) {

        // console.log('in foreach of getDeckBucketCounts, card:', card);
        if (!(card.id && card.firstname && card.lastname && card.pictureUrl && card.deck)) {
          // incomplete line, skip it!
          return;
        }

        let bucket;
        let algoData;

        if (!cardIds[card.id]) {
          // the user hasn't seen this card yet
          algoData = algorithm.addFamiliarity(userId, card.id);
        } else {
          // console.log('Familiar card!');
          algoData = cardIds[card.id];
        }
        bucket = algorithm.getBucket(algoData);

        if (!results[card.deck]) {
          results[card.deck] = {red: 0, orange: 0, green: 0};  // create the deck
        }

        results[card.deck][bucket]++;
      });

      // console.log('Deck results:', results);

      res.status(200).send(results);
      // {deckname: {red: score, orange: score, green: score}, ...}

    });
  });
};


// GET /quiz/:deckname -------------------
var getDeckQuiz = function (req, res) {

  var deckname = req.query.deck;

  // console.log('in get deck quiz, req.user:', req.user);

  var userId = req.user._id;
  // query Familiarities from highest to lowest score for user
  // where algoData.bucket is not green
  // into ordered array of cardIds, highest red score first
  // Initial implementation: return rows with red first, then orange,
  // ignoring green rows
  let threshold = algorithm.getQuizDateThreshhold();

  mongo.getOrderedCardIds(userId, threshold, function(orderedCardIds) {
    // console.log('ordered cardIds in getDeckQuiz:', orderedCardIds);
    // TESTING:
    // cardIds = ['complex unique string1', 'complex unique string2': '1'];
    // console.log('OrderedCardIds received from mongo:', orderedCardIds);

    googleSheet.getQuizCards(orderedCardIds, deckname, function(quizCards) {
      // TESTING:
      // quizCards = [ {
      //   id: 'complex unique string1',
      //   firstname: 'J-G',
      //   lastname: 'Demathieu',
      //   pictureUrl: 'https://lh6.googleusercontent.com/uDKlK4ZoXoRxEc1-JbdzeH4eTnA_eQetXUOwqphbfaUQgkut6TRpuAa73Os6CrYHKgIKodqh9vyx1VBdCJ0LINbhZ9L8LHM_eRD1=w2560-h1398-rw',
      //   deck: 'HRSF73'
      // }, {
      //   id: 'complex unique string2',
      //   firstname: 'David',
      //   lastname: 'Deng',
      //   pictureUrl: 'https://drive.google.com/open?id=0B7BE9TWkUdJXOE9TaWVGdjAtZ1hmR1ZHSFFUXzhjNzRuLWVz',
      //   deck: 'HRSF73'
      // }];

      // console.log('@@@@@@@@@ Sending to React the cards:', quizCards);

      console.log(quizCards);
      res.status(200).send(quizCards);
    });
  });
};


// POST /api/card
// data: {cardId: 'cardId', quizResult: 'gotIt/almost/nope'}
var updateUserCardFamiliarity = function (req, res) {

  // console.log('In updateUserCardFamiliarity, Req body is:', req.body);
  var userId = req.user._id;


  let cardId = req.body.cardId;
  let answer = req.body.answer;

  // console.log('in handler, update card familiarity, update card id:', cardId, '  quiz res:', answer);

  algorithm.updateFamiliarity(userId, cardId, answer);

  res.status(201).send('Updated card-user data');
};


var resetMongo = function (req, res) {
  mongo.resetDB(function(FamiliaritiesResetResult) {
    console.log('FamiliaritiesResetResult: ', FamiliaritiesResetResult);
    res.status(200).send('Mongo Familiarities and Users tables reset');
  });
  mongoUsers.resetModel(function(UsersResetResult) {
    console.log('UsersResetResult: ', UsersResetResult);
  });
};

var newLeader = function (req, res) {
  console.log('---> SCORE INFO', req.body)
  mongoLeaders.createLeaders(req.body, function(err, leader) {
    if (err) {
      console.error(err);
    } else {
      res.sendStatus(201);
    }
  });
};

var getLeaders = function (req, res) {
  mongoLeaders.getAllLeaders(function(err, leaders) {
    if (err) {
      console.error(err);
    } else {
      res.status(200).send(leaders);
    }
  });
};

var shuffle = function(array) {
  var j, x, i;
  for (i = array.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = array[i - 1];
    array[i - 1] = array[j];
    array[j] = x;
  }
};

var getLegacyCards = function (req, res) {
  googleSheet.getAllCards(function(cards) {
    // req.query = ['SF72', 'STAFF'];
    // {deck: "SF73", ...}
    var selectedDecks = req.query.gameDecks;
    var selectedCards = [];
    cards.forEach(function(card) {
      selectedDecks.forEach(function(deck) {
        if (card.deck === deck) {
          selectedCards.push(card);
        }
      })
    });

    shuffle(selectedCards);

    res.status(200).send(selectedCards);
  })
};

var postHint = function(req, res) {
  var hintInfo = req.body;
  mongoHints.createHint(hintInfo, function (err, success) {
    if (err) {
      console.error(err);
    } else {
      console.log('---postHint');
      res.sendStatus(201);
    }
  });
};

var deleteHint = function(req, res) {
  var hintInfo = req.body;
  console.log('---remove', hintInfo)
  mongoHints.removeHint(hintInfo, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('---removeHint', hintInfo);
      res.sendStatus(201);
    }
  });
};

var getHints = function(req, res) {
  var cardID = req.query;
  mongoHints.getHintsByID(cardID, function(err, hints) {
    if (err) {
      console.error(err);
    } else {
      shuffle(hints);
      console.log('getHints sent', hints);
      res.status(200).send(hints);
    }
  })
};

//------ Exports -------------------------
module.exports = {
  dashboard: {
    get: getDeckBucketCounts,
  },

  quiz: {
    get: getDeckQuiz,
  },

  api: {
    reset: resetMongo,
    card: updateUserCardFamiliarity,
  },

  legacy: {
    getCards: getLegacyCards
  },

  hints: {
    post: postHint,
    delete: deleteHint,
    get: getHints
  },

  leaders: {
    create: newLeader,
    get: getLeaders,
  },
};