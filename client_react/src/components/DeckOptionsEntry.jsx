import React from 'react';
import {Radio, Checkbox, Input } from 'semantic-ui-react';

class DeckOptionsEntry extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {

  	}
  }

  render() {
  	return (
      <tr>
        <td>
          <input type='checkbox' value={this.props.data} onClick={this.props.addToSearch}/>
        </td>
        <td>
          {this.props.data}
        </td>
      </tr>
    )
  }
}

export default DeckOptionsEntry