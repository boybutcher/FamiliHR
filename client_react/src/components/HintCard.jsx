import React from 'react';
import { Card, Icon, Input, Image, Button, Form, Label, TextArea } from 'semantic-ui-react';
import HintEntry from './HintEntry.jsx';
import $ from 'jquery';

class HintCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submittedHint: '',
      viewHints: false,
    }

    this.inputHint = this.inputHint.bind(this);
    this.onViewHints = this.onViewHints.bind(this);
    this.onSubmitHint = this.onSubmitHint.bind(this);
  }

  inputHint (e) {
    this.setState({submittedHint: e.target.value});
  }

// VIEW ALL HINTS
  onViewHints (e) {
    e.preventDefault();
    if (this.state.viewHints === false && this.props.hints.length > 0) {
      this.setState({viewHints: true});
    } else {
      console.log('no hints');
      this.setState({viewHints: false});
    }
  }

  onSubmitHint (e) {
    console.log('onSubmitHint')
    e.preventDefault();

    var hintInfo = {
      cardID: this.props.currentCard.id,
      hint: this.state.submittedHint
    }
    this.props.submitHint(hintInfo);
    // this.setState({
    //   submittedHint: ''
    // });
  }
  
  
  render () {
    const self = this;

    if(this.state.viewHints === false) {
      return (
        <div style={{width: 400, marginBottom: 200}}>
          <Card style={{width: '100%', paddingBottom: 15}}>
            <Card.Content>
              <Card.Header>
                <p style={{"float": "left"}}>SCORE: {this.props.score}</p>
                <p style={{"float": "right", "display": this.state.pointDisplay}}>
                -25 POINTS
                </p>
              </Card.Header>
            </Card.Content>

            <Image src={this.props.currentCard.pictureUrl} />
            <Card.Header
              style={{textAlign: 'center'}}
            >RANDOM HINT:
            </Card.Header>
            <Card.Meta
              style={{textAlign: 'center'}}
            >{this.props.hints[this.props.hintIndex].hint}
            </Card.Meta>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button
                  basic
                  color='green'
                  onClick={this.props.onShowAnswer}
                >
                ANSWER
                </Button>
                <Button
                  basic color='yellow'
                  onClick={this.props.onHint}
                >
                HINT
                </Button>
              </div>
            </Card.Content>
          </Card>
          <Form>
            <Form.Field>
              <Input
                onChange={this.inputHint}
                focus placeholder='Your Hint'
                autoHeight/>
            </Form.Field>
              <Button
                onClick={this.onViewHints}
              >View Hints</Button>
              <Button
                onClick={this.onSubmitHint}
                size='medium'
                icon>
                <Icon
                  name='write'
                />
              </Button>
          </Form>
        </div>
      )
    } else {
      return (
        <div style={{width: 400, marginBottom: 200}}>
          <Card style={{width: '100%', paddingBottom: 15}}>
            <Card.Content>
              <Card.Header>
                SCORE: {this.props.score}
              </Card.Header>
            </Card.Content>
            <div style={{overflow: 'scroll'}}>
            {this.props.hints.map(function(hint, index) {
              return (
                <HintEntry 
                  key={index}   
                  hint={hint} 
                  index={index}
                  deleteHint={self.props.deleteHint}
                  hints={self.props.hints}
                />)
            })}
            </div>
            <Card.Header
              style={{textAlign: 'center'}}
            >RANDOM HINT:
            </Card.Header>
            <Card.Meta>
              <span className='hint'>
                {this.props.hints[this.props.hintIndex].hint}
              </span>
            </Card.Meta>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button
                  basic
                  color='green'
                  onClick={this.props.onShowAnswer}
                >
                ANSWER
                </Button>
                <Button
                  basic color='yellow'
                  onClick={this.props.onHint}
                >
                HINT
                </Button>
              </div>
            </Card.Content>
          </Card>
          <Form>
            <Form.Field>
              <Input
                action={true}
                onChange={this.inputHint}
                focus placeholder='Your Hint'
                autoHeight/>
            </Form.Field>
              <Button
                onClick={this.onViewHints}
              >View Hints</Button>
              <Button
                onClick={this.onSubmitHint}
                size='medium'
                icon>
                <Icon name='write' />
              </Button>
          </Form>

        </div>
      )
    }
  }
};

export default HintCard;