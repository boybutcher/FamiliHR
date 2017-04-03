import React from 'react';
import { 
  Card, 
  Image, 
  Button, 
  Icon, 
  Form, 
  TextArea,
  Input } from 'semantic-ui-react';

class StartCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointDisplay: 'none',
      submittedHint: ''
    }
    this.inputHint = this.inputHint.bind(this);
    this.hoverHint = this.hoverHint.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.onSubmitHint = this.onSubmitHint.bind(this);

    this.props.getHints();
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

  inputHint (e) {
    this.setState({submittedHint: e.target.value});
    console.log(e.target.value);
  }

  hoverHint() {
    this.setState({
      pointDisplay: 'inline',
    })
  }

  mouseLeave() {
    this.setState({
      pointDisplay: 'none',
    })
  }

  render() {
    if (this.props.hints.length > 0) {
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
            <Card.Content>
              <div className='ui two buttons'>
                <Button
                  basic color='green'
                  onClick={this.props.onShowAnswer}
                >
                ANSWER
                </Button>
                <Button
                  basic color='yellow'
                  onClick={this.props.onHint}
                  onMouseEnter={this.hoverHint}
                  onMouseLeave={this.mouseLeave}
                >
                HINT
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      )

    } else { // NO HINTS
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
            <Card.Content>
              <div className='ui two buttons'>
                <Button
                  basic color='green'
                  onClick={this.props.onShowAnswer}
                >
                ANSWER
                </Button>
                <Button
                  basic color='yellow'
                  onClick={this.props.onHint}
                  onMouseEnter={this.hoverHint}
                  onMouseLeave={this.mouseLeave}
                >
                NO HINTS
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
                onClick={(e)=>{e.preventDefault()}}
              >NO HINTS AVAILABLE</Button>
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
}

export default StartCard;