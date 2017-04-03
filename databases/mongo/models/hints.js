var mongoose = require('mongoose');
var db = require('../config');

var HintsSchema = mongoose.Schema({
  cardID: String,
  hint: String,
  fav: {type: Boolean, default: true}
});

var Hint = mongoose.model('Hint', HintsSchema); 

getHintsByID = function (cardIdObj, callback) { 
  Hint.find(cardIdObj, function(err, hints) {
    if (err) {
      callback(err);
    } else {
      callback(null, hints);
    }
  });
}

createHint = function (hintObj, callback) {
  Hint.create(hintObj, function (err, success) {
    if (err) {
      callback(err);
    } else {
      callback(null, success);
    }
  });
}

var removeHint = function(obj, callback) {
  console.log('db remove', obj)
  Hint.remove(obj, function(err) {
    if (err) {
      callback(err, null);
    } else {
      console.log('---> HINT REMOVED!')
    }
  })
};

module.exports.createHint = createHint;
module.exports.removeHint = removeHint;
module.exports.getHintsByID = getHintsByID;
