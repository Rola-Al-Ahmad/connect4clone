import React from 'react';
import { GameState_Winner, GameState_Draw } from '../Constatnts';
import '../Game.css';

export default function Header({player, gameState}) {
    const renderLabel = () => {
        if(gameState === GameState_Winner) return <div>Player {player} Wins!</div>;
        if(gameState === GameState_Draw) return <div>Game Over!</div>;
        return <div>{player}'s Turn</div>;
    }
  return (
    <div className="panel header">
        <div className="header-text">{renderLabel()}</div>
    </div>
  )
}
