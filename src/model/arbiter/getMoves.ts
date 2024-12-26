export type TMoves = {
  figureName?: string;
  axisY: number;
  axisX: number;
  currentPosition: string[][];
  prevPosition?: string;
}

export const getRookMoves = ({ figureName, axisY, axisX, currentPosition }: TMoves) => {
  const moves: number[][] = [];
  const us = figureName?.slice(0, 5);
  const enemy = us === 'white' ? 'black' : 'white';
  const direction = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];
  direction.forEach(dir => {
    for (let i = 1; i < 8; i++) {
      const y = axisY + (i * dir[0]);
      const x = axisX + (i * dir[1]);
      if (currentPosition?.[y]?.[x] === undefined) break;
      if (currentPosition[y][x].slice(0, 5) === us) break;
      if (currentPosition[y][x].slice(0, 5) === enemy) {
        moves.push([y, x]);
        break;
      }
      moves.push([y, x]);
    }
  });
  return moves;
}

export const getKnightMoves = ({ axisY, axisX, currentPosition }: TMoves) => {
  const moves: number[][] = [];
  const enemy = currentPosition[axisY][axisX].slice(0, 5) === 'white' ? 'black' : 'white';

  const candidates = [
    [-2, 1],
    [-2, -1],
    [2, 1],
    [2, -1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
  ];
  candidates.forEach(candidate => {
    const cell = currentPosition?.[axisY + candidate[0]]?.[axisX + candidate[1]];
    if (cell !== undefined && (cell.slice(0, 5) === enemy || cell === '')) {
      moves.push([axisY + candidate[0], axisX + candidate[1]]);
    }
  })
  return moves;
}

export const getBishopMoves = ({ figureName, axisY, axisX, currentPosition }: TMoves) => {
  const moves: number[][] = [];
  const us = figureName?.slice(0, 5);
  const enemy = us === 'white' ? 'black' : 'white';
  const direction = [
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1],
  ];
  direction.forEach(dir => {
    for (let i = 1; i < 8; i++) {
      const y = axisY + (i * dir[0]);
      const x = axisX + (i * dir[1]);
      if (currentPosition?.[y]?.[x] === undefined) break;
      if (currentPosition[y][x].slice(0, 5) === us) break;
      if (currentPosition[y][x].slice(0, 5) === enemy) {
        moves.push([y, x]);
        break;
      }
      moves.push([y, x]);
    }
  });
  return moves;
}

export const getQueenMoves = ({ figureName, axisY, axisX, currentPosition }: TMoves) => {
  const moves = [
    ...getRookMoves({ figureName, axisY, axisX, currentPosition }),
    ...getBishopMoves({ figureName, axisY, axisX, currentPosition })
  ];
  return moves;
}

export const getKingMoves = ({ figureName, axisY, axisX, currentPosition }: TMoves) => {
  const moves: number[][] = [];
  const us = figureName?.slice(0, 5);

  const direction = [
    [1, -1], [1, 0], [1, 1],
    [0, -1], [0, 1],
    [-1, -1], [-1, 0], [-1, 1]
  ];

  direction.forEach(dir => {
    const y = axisY + dir[0];
    const x = axisX + dir[1];
    if (currentPosition?.[y]?.[x] !== undefined && currentPosition[y][x].slice(0, 5) !== us) {
      moves.push([y, x]);
    };
  });
  return moves;
}

export const getPawnMoves = ({ figureName, prevPosition, axisY, axisX, currentPosition }: TMoves) => {
  const moves: number[][] = [];
  const isWhite = figureName?.slice(0, 5) === 'white';
  const dir = isWhite ? 1 : -1;
  const enemy = isWhite ? 'black' : 'white';
  const enemyPawn = isWhite ? 'black-pawn' : 'white-pawn';
  const axesX = [axisX - 1, axisX + 1];

  // Ход пешки на 1 клетку вперед.
  if (!currentPosition?.[axisY + dir]?.[axisX]) {
    moves.push([axisY + dir, axisX]);
  };

  // Первый ход пешки на 2 клетки вперед.
  if (axisY % 5 === 1) {
    if (!currentPosition?.[axisY + dir]?.[axisX] && !currentPosition?.[axisY + (dir * 2)]?.[axisX]) {
      moves.push([axisY + (dir * 2), axisX]);
    };
  };

  // Атака пешки слева.
  if (currentPosition?.[axisY + dir]?.[axisX - 1] && currentPosition?.[axisY + dir]?.[axisX - 1].slice(0, 5) === enemy) {
    moves.push([axisY + dir, axisX - 1]);
  };

  // Атака пешки справа.
  if (currentPosition?.[axisY + dir]?.[axisX + 1] && currentPosition?.[axisY + dir]?.[axisX + 1].slice(0, 5) === enemy) {
    moves.push([axisY + dir, axisX + 1]);
  };

  // Взятие на проходе.
  if (prevPosition) {
    if ((isWhite && axisY === 4) || (!isWhite && axisY === 3)) {
      axesX.forEach(x => {
        if (
          currentPosition?.[axisY]?.[x] === enemyPawn &&
          currentPosition?.[axisY + (dir * 2)]?.[x] === '' &&
          prevPosition?.[axisY]?.[x] === '' &&
          prevPosition?.[axisY + (dir * 2)]?.[x] === enemyPawn
        ) {
          moves.push([axisY + dir, x]);
        }
      })
    }
  }

  return moves;
};