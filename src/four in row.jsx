import React from 'react';
import {useState} from "react";
import Slot from "./Component/slot";
import "./Component/Slot.css";

function Four() {

    const [board,setBoard] = useState([
            ['','','','','','',''],
            ['','','','','','',''],
            ['','','','','','',''],
            ['','','','','','',''],
            ['','','','','','',''],
            ['','','','','','',''],
            ['','','','','','','']
        ])
    const directions = [
        [0, 1],  // Horizontal
        [1, 0],  // Vertical
        [1, 1],  // Diagonal (top-left to bottom-right)
        [1, -1], // Diagonal (top-right to bottom-left)
    ];
    const [currrentplayer,setCurrentplayer]=useState('X')
    const [oppplayer,setOppplayer]=useState('O')
    const [gameOver,setGameover]=useState(false)
    const checkWin=(row,column,ch)=>
    {

            for (const [dr, dc] of directions) {
                let count = 1; // Count for consecutive tokens
                console.log([dr,dc])
                // Check in both directions from the current position
                for (let dir = -1; dir <= 1; dir += 2) {
                    for (let step = 1; step < 4; step++) {
                        console.log(column,step,dc,dr)
                        const newRow = parseInt(row, 10) + (step * dr * dir);
                        const newCol = parseInt(column, 10) + (step * dc * dir);
                console.log(newCol)


                        if (
                            newRow >= 0 &&
                            newRow < board.length &&
                            newCol >= 0 &&
                            newCol < board[0].length &&
                            board[newRow][newCol] === ch)
                        {
                            count++;
                        } else
                        {

                            break; // Stop checking in this direction
                        }
                    }
                }

                if (count >= 4) {
                    return true; // Player has won
                }
            }

            return false; // No win detected
        }

    const updateBoard=(row,column,ch)=>
    {

        setBoard(prev => {
            const boardCopy = [...prev];
            boardCopy[row][column] = ch;
            return boardCopy;
        });
        return checkWin(row, column, ch);

    }
    const handleClick = (e) =>
    {
        let column = e.target.getAttribute('X');
        let row = board.findIndex((rowArr,index)=>
        {
            return (rowArr[column] !== '' || (index === board.length -1));
        })
    if(row !== (board.length -1)) row=row-1;
    if(board[row][column] !== '' ) row=row-1;

    setGameover(updateBoard(row,column,currrentplayer));

    if(!gameOver )
    {
        const currentplayercopy= currrentplayer;
        setCurrentplayer(oppplayer)
        setOppplayer(currentplayercopy)
    }
    }

    return (
        <>
            {gameOver && (
                <h2>game over! {oppplayer==='X'?'red':'black'} wins</h2>
            )}
            <h2 id='playerDisplay'>{currrentplayer === 'X' ? 'Red':'Black'}Move</h2>

              <section id='board' onClick={ gameOver? null: handleClick}>
                  {
                      board.map((row,i)=>{
                          return row.map((ch,j)=>{
                              return <Slot ch={ch} y={i} x={j} />
                          })
                      })
                  }
              </section>
        </>
    );
}


export default Four;

