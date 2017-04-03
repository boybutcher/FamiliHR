import { Icon, Button, Input, Segment } from 'semantic-ui-react';
import React from 'react';
import LeaderBoard from './leaderBoard.jsx';

class GameOver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  onNameChange(e) {
    this.setState({
      nickname: e.target.value
    });
  }

  onSubmit() {
    var info = {
      nickname: this.state.nickname,
      score: this.props.score
    };
    this.props.submitScore(info);
  }

  render() {
    return (
      <div style={{marginBottom: '5%'}}>
        <LeaderBoard highScores={this.props.highScores} />
        <Segment raised style={{textAlign: 'center'}}>
          SCORE: {this.props.score}
        </Segment>
          <Input
            focus
            placeholder="NAME"
            onChange={this.onNameChange}
            style={{width: '70%'}}
          />
        <Button 
          basic
          style={{width: '28%'}}
          onClick={this.onSubmit}
        > Submit
        </Button>
    </div>
    )
  }
};

export default GameOver;
