import { DragEvent, MutableRefObject } from "react";

export const createPositionFigures = () => {
  const position: string[][] = new Array(8).fill('').map((_x: string[]) => new Array(8).fill(''));

  for (let i = 0; i < 8; i++) {
    position[6][i] = 'black-pawn';
    position[1][i] = 'white-pawn';
  }

  position[0][0] = 'white-rook';
  position[0][1] = 'white-knight';
  position[0][2] = 'white-bishop';
  position[0][3] = 'white-queen';
  position[0][4] = 'white-king';
  position[0][5] = 'white-bishop';
  position[0][6] = 'white-knight';
  position[0][7] = 'white-rook';

  position[7][0] = 'black-rook';
  position[7][1] = 'black-knight';
  position[7][2] = 'black-bishop';
  position[7][3] = 'black-queen';
  position[7][4] = 'black-king';
  position[7][5] = 'black-bishop';
  position[7][6] = 'black-knight';
  position[7][7] = 'black-rook';

  // position[6][0] = 'white-rook';
  // position[7][5] = 'white-king';
  // position[7][7] = 'black-king';

  return position;
}

export const calculateCoords = (event: DragEvent<HTMLDivElement>, figuresRef: MutableRefObject<HTMLDivElement | null>) => {
  if (!figuresRef.current?.getBoundingClientRect()) return; // для ts
  const { width, left, top } = figuresRef.current?.getBoundingClientRect();
  const size = width / 8;
  const x = Math.floor(Math.floor(event.clientX - left) / size);
  const y = 7 - Math.floor(Math.floor(event.clientY - top) / size);
  return { x, y };
}