import React from 'react';
import { Segment, Icon, Button, Divider } from 'semantic-ui-react';

class HintEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.onRemoveHint = this.onRemoveHint.bind(this);
  }
  componentWillReceiveProps(nextProps) {
      console.log('componentWillReceiveProps', nextProps);
    }

  onRemoveHint() {   
    console.log('onRemoveHint', this.props.hints[this.props.index])
    const hintInfo = this.props.hints[this.props.index]
    this.props.deleteHint(hintInfo)
  } 

  render() {
    return (
      <Segment>
        <div style={{overflow: 'scroll', width: '100%',}}>
          {this.props.hint.hint}
        </div>
        <Divider/>
        <Button
          size='medium'
          icon>
          <Icon name='like' style={{float: 'right'}} />
        </Button>

        <Button
          size='medium'
          icon>
          <Icon 
            name='close' 
            style={{float: 'right'}}
            onClick={this.onRemoveHint}
          />
        </Button>
      </Segment>
    )  
  } 
} 

export default HintEntry;