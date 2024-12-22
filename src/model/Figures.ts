import { DragEvent, MutableRefObject } from "react";

export const createPositionFigures = () => {
  const position: string[][] = new Array(8).fill('').map((_x: string[]) => new Array(8).fill(''));

  for (let i = 0; i < 8; i++) {
    position[i][6] = 'black-pawn';
    position[i][1] = 'white-pawn';
  }

  position[0][0] = 'white-rook';
  position[1][0] = 'white-knight';
  position[2][0] = 'white-bishop';
  position[3][0] = 'white-queen';
  position[4][0] = 'white-king';
  position[5][0] = 'white-bishop';
  position[6][0] = 'white-knight';
  position[7][0] = 'white-rook';

  position[0][7] = 'black-rook';
  position[1][7] = 'black-knight';
  position[2][7] = 'black-bishop';
  position[3][7] = 'black-queen';
  position[4][7] = 'black-king';
  position[5][7] = 'black-bishop';
  position[6][7] = 'black-knight';
  position[7][7] = 'black-rook';

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