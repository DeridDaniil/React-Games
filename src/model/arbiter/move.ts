export type TPerformMove = {
  currentPosition: string[][];
  figureName: string;
  axisY: number;
  axisX: number;
  y: number;
  x: number;
}

export const movePawn = ({ currentPosition, figureName, axisY, axisX, y, x }: TPerformMove) => {
  const newPosition = currentPosition.map((y: string[]) => y.map(x => x));

  // Взятие на проходе.
  if (!newPosition[y][x] && y !== axisY && x !== axisX) {
    newPosition[axisY][x] = '';
  }

  newPosition[axisY][axisX] = '';
  newPosition[y][x] = figureName;

  return newPosition;
}

export const moveFigure = ({ currentPosition, figureName, axisY, axisX, y, x }: TPerformMove) => {
  const newPosition = currentPosition.map((y: string[]) => y.map(x => x));

  // Рокировка 
  if (figureName.slice(6) === 'king' && Math.abs(x - axisX) > 1) {
    if (x === 2) {
      newPosition[axisY][0] = '';
      newPosition[axisY][3] = figureName.slice(0, 5) === 'white' ? 'white-rook' : 'black-rook';
    }
    if (x === 6) {
      newPosition[axisY][7] = '';
      newPosition[axisY][5] = figureName.slice(0, 5) === 'white' ? 'white-rook' : 'black-rook';
    }
  }

  newPosition[axisY][axisX] = '';
  newPosition[y][x] = figureName;

  return newPosition;
}