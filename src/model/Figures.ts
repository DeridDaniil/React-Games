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

export const areSomeColorTiles = (coords1, coords2) => {
  (coords1.y + coords1.x) % 2 === (coords2.y + coords2.x) % 2;
}

export const findFiguresCoords = (position, type) => {
  let results = [];
  position.forEach((axisY, y) => {
    axisY.forEach((axisX, x) => {
      if (axisX === type) results.push({ y: y, x: x });
    });
  });
  return results;
};

export const getCharacter = (axisX: number) => String.fromCharCode(axisX + 96);

interface IGetNewMoveNotation {
  figureName: string;
  axisY: number;
  axisX: number;
  y: number;
  x: number;
  currentPosition: string[][];
  promotesTo?: string;
}

export const getNewMoveNotation = ({ figureName, axisY, axisX, y, x, currentPosition, promotesTo }: IGetNewMoveNotation) => {
  let note = '';
  const figure = figureName.slice(6);

  axisY = Number(axisY);
  axisX = Number(axisX);

  if (figure === 'king' && Math.abs(axisX - x) === 2) {
    if (axisX > x) return '0-0'
    else return '0-0-0'
  };

  if (figure !== 'pawn') {
    if (figure === 'knight') note += figureName.slice(7, 8).toUpperCase();
    else note += figureName.slice(6, 7).toUpperCase();
    if (currentPosition[y][x]) note += 'x'
  } else if (axisY !== y && axisX !== x) note += getCharacter(axisX + 1) + 'y';

  note += getCharacter(x + 1) + (y + 1);

  if (promotesTo) note += '=' + promotesTo.slice(0, 1).toUpperCase();

  return note;
}