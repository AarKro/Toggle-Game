import * as React from 'react';
import { Tile } from './Tile';

import './app.scss';

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
}

export const App: React.FC = () => {
  const [size, setSize] = React.useState<number>(5);
  const [active, setActive] = React.useState<boolean[][]>([]);
  const [shuffleCount, setShuffleCount] = React.useState<number>(0);

  React.useEffect(() => {
    const field: boolean[][] = [];

    for (let i: number = 0; i < size; i++) {
      const row: boolean[] = [];
      for (let j = 0; j < size; j++) row[j] = false;
      field.push(row);
    }

    setActive(field);
  }, [size]);

  React.useEffect(() => {
    if (shuffleCount > 0) {
      window.setTimeout(() => {
        switchState(getRandomInt(size), getRandomInt(size));
        setShuffleCount(shuffleCount - 1);
      }, 350 / size);
    }
  }, [shuffleCount]);

  const shuffle = () => {
    setShuffleCount(8 * size);
  } 

  const onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(Number(event.target.value));
  }

  const switchState = (row: number, col: number) => {
    const newActive = active.map((row) => [...row]);

    newActive[-1] = []; 
    newActive[size] = [];
    
    newActive[row - 1][col - 1] = !newActive[row - 1][col - 1];
    newActive[row - 1][col] = !newActive[row - 1][col];
    newActive[row - 1][col + 1] = !newActive[row - 1][col + 1];

    newActive[row][col - 1] = !newActive[row][col - 1];
    newActive[row][col] = !newActive[row][col];
    newActive[row][col + 1] = !newActive[row][col + 1];

    newActive[row + 1][col - 1] = !newActive[row + 1][col - 1];
    newActive[row + 1][col] = !newActive[row + 1][col];
    newActive[row + 1][col + 1] = !newActive[row + 1][col + 1];

    let field = newActive.slice(0, size);
    field = field.map((row) => row.slice(0, size));

    setActive(field);
  }


  const tiles: JSX.Element[] = [];
  active.forEach((row, i) => {
    row.forEach((state, j) => {
      tiles.push(<Tile key={`${i}-${j}`} size={size} row={i} col={j} active={state} toggle={switchState} />);
    })
  })

  return (
    <div className="container">
      <button className="shuffle" onClick={shuffle}>Shuffle</button>

      <input type="range" min="3" max="10" value={size} className="slider" onChange={onSliderChange}/>

      <div className="field">
        {tiles}
      </div>
    </div>
  )
}