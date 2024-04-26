import React, { useState, useEffect }from 'react';
import GameCircle from './GameCircle';
import Header from './Header';
import Footer from './Footer';
import { checkWin, checkDraw, getComputer } from '../helper';
import { GameState_Draw, GameState_Winner, GameState_Playing } from '../Constatnts';
import '../Game.css';


function GameBoard() {
    /*
    const style ={
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        position:'absolute',
        left: '40%',
        maringLeft: '-250px',
        top: '25%',
    }
    */
    const [board, setBoard] = useState(Array(16).fill(0));
    const [player, setPlayer] = useState(1);
    const [gameState, setGameState] = useState(GameState_Playing);

    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        setBoard(Array(16).fill(0));
        setPlayer(1);
        setGameState(GameState_Playing);
    }

    const initBoard = () => {
        const circles = [];
        for(let i = 0; i < 16; i++) {
            circles.push(renderCircle(i));
        }
        return circles;
    }

    const suggestMove = () => {
        circleClicked(getComputer(board));
    }

    const circleClicked = (id) => {
        /*
        const newBoard = [...board];
        newBoard[id] = player;
        setBoard(newBoard);
        */
       if(board[id] || checkWin(board)) return;

        setBoard(prev => {
            return prev.map((circle, index) => {
                if (index === id) return player;
                return circle;
            });
        });
        
        if(checkWin(board, id, player)) {
            setGameState(GameState_Winner);
            return;
        }

        if(checkDraw(board, id, player)) {
            setGameState(GameState_Draw);
            return;
        }
        
        setPlayer(player === 1 ? 2 : 1);
    }
    
    const renderCircle = (id) => {
        return <GameCircle key={id} id={id} className={`player_${board[id]}`} onCircleClicked={circleClicked}/>
    }
    
    return (
        <>
            <Header player={player} gameState={gameState}/>
            <div className="game-board">
                {
                    initBoard()
                    //{renderCircle(0)}
                    //{renderCircle(1)}
                    //{renderCircle(2)}
                    //{renderCircle(3)}
                    //{renderCircle(4)}
                    //{renderCircle(5)}
                    //{renderCircle(6)}
                    //{renderCircle(7)}
                    //{renderCircle(8)}
                    //{renderCircle(9)}
                    //{renderCircle(10)}
                    //{renderCircle(11)}
                    //{renderCircle(12)}
                    //{renderCircle(13)}
                    //{renderCircle(14)}
                    //{renderCircle(15)}
                }
            </div>
            <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} gameState={gameState}/>
        </>
    );
}
export default GameBoard;