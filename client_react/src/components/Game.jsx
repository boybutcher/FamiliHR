import React from 'react';
import HintCard from './HintCard.jsx';
import AnswerCard from './AnswerCard.jsx';
import StartCard from './StartCard.jsx';
import GameOver from './GameOver.jsx';
import $ from 'jquery';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'start',
      counter: 0,
      score: 0,
      hints: [],
      hintIndex: -1
    }
    this.onCorrect = this.onCorrect.bind(this);
    this.onAlmost = this.onAlmost.bind(this);
    this.onMiss = this.onMiss.bind(this);
    this.onAnswer = this.onAnswer.bind(this);
    this.onShowAnswer = this.onShowAnswer.bind(this);
    this.onHint = this.onHint.bind(this);
    this.submitScore = this.submitScore.bind(this);
    this.submitHint = this.submitHint.bind(this);
    this.getHints = this.getHints.bind(this);
    this.deleteHint = this.deleteHint.bind(this);
  }


  componentDidMount () {
    console.log('cards', this.props.cards);
  }

  submitHint (hintInfo) {
    $.ajax({
      url: '/hints/new',
      type: 'POST',
      data: hintInfo,
      success: () => {
        this.getHints();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getHints () {
    console.log('getHints')
    var currentCardID = {
      cardID: this.props.cards[this.state.counter].id
    };

    $.ajax({
      url: '/hints/get',
      type: 'GET',
      data: currentCardID,
      success: (hints) => {
        this.setState({
          hints: hints
        });
        console.log('getHints success');
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  deleteHint (hintInfo) {
    console.log('delete', hintInfo)
    $.ajax({
      url: '/hints/delete',
      type: 'POST',
      data: hintInfo,
      success: () => {
        console.log('deleteHint');
        this.getHints();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  submitScore (info) {
    console.log('SCORE INFO', info);
    $.ajax({
      url: '/leaders/create',
      type: 'POST',
      data: info,
      success: () => {
        this.props.loadDashboard();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  onAnswer() {
    this.setState({
      counter: this.state.counter + 1,
      display: 'start'
    });

    if (this.state.counter === this.props.cards.length - 1) {
      this.setState({ display: 'game over' })
    }
  }

  onShowAnswer() {
    this.setState({
      display: 'show answer',
      hintIndex: - 1
    });
  }

  onHint() {
    if (this.state.display !== 'hint' && this.state.hints.length > 0 && (this.state.hintIndex < this.state.hints.length - 1)) {
      this.setState({
        display: 'hint',
        score: this.state.score - 25,
        hintIndex: this.state.hintIndex + 1
      });
    } else if (this.state.hintIndex < this.state.hints.length - 1){
      this.setState({
        score: this.state.score - 25,
        hintIndex: this.state.hintIndex + 1
      });
    }
  }

  onCorrect() {
    this.setState({score: this.state.score + 150});
    this.onAnswer();
  }

  onAlmost() {
    this.setState({score: this.state.score + 100});
    this.onAnswer();
  }

  onMiss() {
    this.setState({score: this.state.score + 0});
    this.onAnswer();
  }

  render() {
    if (this.state.display === 'hint') {
      return (
        <HintCard
          hints={this.state.hints}
          hintIndex={this.state.hintIndex}
          score={this.state.score}
          currentCard={this.props.cards[this.state.counter]}
          onShowAnswer={this.onShowAnswer}
          onHint={this.onHint}
          roundPoints={this.state.roundPoints}
          submitHint={this.submitHint}
          getHints={this.getHints}
          deleteHint={this.deleteHint}
        />
      )
    } else if (this.state.display === 'show answer') {
      return (
        <AnswerCard
          score={this.state.score}
          currentCard={this.props.cards[this.state.counter]}
          onCorrect={this.onCorrect}
          onAlmost={this.onAlmost}
          onMiss={this.onMiss}
          roundPoints={this.state.roundPoints}
        />
      )
    } else if (this.state.display === 'start') {
      return (
        <StartCard
          submitHint={this.submitHint}
          getHints={this.getHints}
          hints={this.state.hints}
          score={this.state.score}
          currentCard={this.props.cards[this.state.counter]}
          onShowAnswer={this.onShowAnswer}
          onHint={this.onHint}
          roundPoints={this.state.roundPoints}
        />
      )
    } else if (this.state.display === 'game over') {
      return (
        <GameOver
          score={this.state.score}
          highScores={this.props.highScores}
          submitScore={this.submitScore}
        />
      )
    }
  }
}

export default Game;
