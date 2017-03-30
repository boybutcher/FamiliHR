import React from 'react';
import {GridTile} from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class GridTileEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ifClicked: false,
    }
  }
  
  render () {
    
    return (
      <GridTile
        index={this.props.index}
        key={this.props.card.id}
        titleStyle={this.props.style.titleStyle}
        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      >
        <img src={this.props.card.pictureUrl} />
      </GridTile>
    )
  }
}

export default GridTileEntry;