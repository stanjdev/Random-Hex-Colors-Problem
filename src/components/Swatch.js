import React from 'react';

export const Swatch = ({color, click, gameStatus, answer}) => {
  return <div
            className={`square ${gameStatus !== '' && color === answer ? 'winner-square' : ''}`}
            style={{backgroundColor: color}}
            onClick={click}
            id={color}
          ><span>{gameStatus !== '' ? color : ''}</span>
        </div>
};
