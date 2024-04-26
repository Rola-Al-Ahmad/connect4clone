import React from 'react';
import {GameState_Playing} from '../Constatnts';
import '../Game.css';

export default function Footer({ onNewGameClick, onSuggestClick, gameState }) {
  const renderButtons = () => {
    if(gameState === GameState_Playing) return <button onClick={onSuggestClick}>Suggest</button>;
    return <button onClick={onNewGameClick}>New Game</button>
  }
  return (
    <div className="panel footer">
      {renderButtons()}
      {// if statement in react
        //gameState === GameState_Playing && <button onClick={onSuggestClick}>Suggest</button>
      }
      {
        //gameState !== GameState_Playing && <button onClick={onNewGameClick}>New Game</button>
      }
    </div>
  )
}
