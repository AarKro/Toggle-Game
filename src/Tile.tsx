import * as React from 'react';

interface Props {
  row: number;
  col: number;
  active: boolean;
  size: number;
  toggle: (row: number, col: number) => void;
}

export const Tile: React.FC<Props> = (props) => {
  const size = 100 / props.size;
  const tileSize = `calc(${size}% - 8px)`;
  const fontSize = `${size}px`;

  return (
    <div 
      onClick={() => props.toggle(props.row, props.col)} 
      className={`tile ${props.active ? 'active' : ''}`}
      style={{width: tileSize, height: tileSize, fontSize}}
    />
  );
}