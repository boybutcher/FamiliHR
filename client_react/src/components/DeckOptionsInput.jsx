import React from 'react';
import { Form, Button, Radio, Table } from 'semantic-ui-react';
import DeckOptionsEntry from './DeckOptionsEntry.jsx'

const DeckOptionsInput = function (props) {
  return (
    <div className='deckOptionsInput'>
      <Table celled structured>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              colSpan='2'
            >BUILD A DECK
            </Table.HeaderCell>  
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {props.list.map((entry, index) => {
          return (
            <DeckOptionsEntry data={entry} index={index} addToSearch={props.addToSearch}/>
          )
        })}
        </Table.Body>
      </Table>
      <Button
        onClick={props.getLegacyCards}
        basic color='black' style={{marginRight: '44%', marginLeft: '44%'}}>
        START
      </Button>

    </div>
  )
}

export default DeckOptionsInput;