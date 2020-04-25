import * as React from 'react';

interface Props {
  row: number;
  col: number;
  active: boolean;
  size: number;
  toggle: (row: number, col: number) => void;
}

export const Tile: React.FC<Props> = (props) => {
  const size = 600 / props.size - 8;
  const tileSize = `${size}px`;
  const fontSize = `${size / 4}px`;

  return (
    <div 
      onClick={() => props.toggle(props.row, props.col)} 
      className={`tile ${props.active ? 'active' : ''}`}
      style={{width: tileSize, height: tileSize, lineHeight: tileSize, fontSize}}
    >
      &#9673;
    </div>
  );
}