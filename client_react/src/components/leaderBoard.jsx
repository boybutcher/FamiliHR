import React from 'react';
import { Table, Label, Segment } from 'semantic-ui-react';

const LeaderBoard = (props) => {
  return (
  	<div 
      className="leaderBoard"
      style={{paddingBottom: 40,}}
    >
    <Segment 
      raised
      style={{marginTop: '10%', marginBottom: 0, backgroudColor: '#313D52', textAlign: 'center'}}
      >LEGACY MODE LEADERBOARD
    </Segment>
      <Table celled structured>
        <Table.Header>
          <Table.Row>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell
              >SCORE
              </Table.HeaderCell>
              <Table.HeaderCell
              >NAME
              </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.highScores.map(record => { 
            return (
              <Table.Row>
                <Table.Cell>{record.nickname}</Table.Cell>
                <Table.Cell>{record.score}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
  	</div>
  )
}

export default LeaderBoard;