import React, { useState, useEffect, useRef } from 'react';
import {Swatch} from './Swatch';
import {randomize, generateRandomHexString} from '../helpers.js';

export default function Interface() {
  const [threeColors, setThreeColors] = useState(new Array(3).fill('').map((slot) => generateRandomHexString()));
  const [answer, setAnswer] = useState(() => threeColors[randomize(threeColors.length)]);
  const [playerWins, setPlayerWins] = useState('');
  const gameSeconds = 4;
  const [time, setTime] = useState(gameSeconds);
  const interval = useRef();

  // First mount and unmount
  useEffect(() => {
    interval.current = setInterval(() => {
      setTime((t) => t -= 1);
    }, 1000);
    return () => clearInterval(interval.current);
  }, [])

  // If time runs out, or player makes a choice, stop the countDown
  useEffect(() => {
    if (time <= 0) {
      setPlayerWins(false);
    }
    if (playerWins !== '') {
      clearInterval(interval.current)
    }
  }, [time, playerWins])

  // If threeColors change, set a new answer, clear old countDown, and set new countDown
  useEffect(() => {
    setAnswer(() => threeColors[randomize(threeColors.length)]);
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setTime((t) => t -= 1);
    }, 1000);
  }, [threeColors])

  const swatchClick = (evt) => {
    if (playerWins === '') {
      setPlayerWins(answer === evt.target.id);
    }
  };

  const resetGame = () => {
    setThreeColors(() => threeColors.map((slot) => generateRandomHexString()));
    setPlayerWins('');
    setTime(gameSeconds);
  };

  const message = playerWins ? 'Correct!'
                : playerWins === false && time <= 0 ? 'Out of time!'
                : playerWins === false ? 'Incorrect..'
                : '-'

  const swatches = threeColors.map((hexString) => <Swatch
                                                    key={hexString}
                                                    color={hexString}
                                                    click={swatchClick}
                                                    gameStatus={playerWins}
                                                    answer={answer}
                                                  />)

  return (
    <>
      <div>Click the swatch that matches: <strong>{answer}</strong></div>
      <div className='squares-container'>
        {swatches}
      </div>
      <div>00:0{time}</div>
      <strong className='result'>{message}
                              </strong>
      <button onClick={resetGame}>Play Again</button>
    </>
  );
};
