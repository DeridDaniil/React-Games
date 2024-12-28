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
  
  newPosition[axisY][axisX] = '';
  newPosition[y][x] = figureName;

  return newPosition;
}