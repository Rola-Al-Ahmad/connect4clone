import React from 'react';
import '../Game.css';

export default function GameCircle({id, children, onCircleClicked, className}) {
    /*
    const style = {
        width:100,
        height:100,
        borderRadius:'50%',
        margin:10,
        backgroundColor: id % 2 === 0 ? 'red' : 'blue',
    }
    */
    return (
        <div onClick={() => onCircleClicked(id)} className={`game-circle ${className}`}>
            {children}
        </div>
    )
}
