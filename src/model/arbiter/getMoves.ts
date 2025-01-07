import arbiter from "./arbiter";

export interface IValidMoves {
  figureName: string;
  axisY: number;
  axisX: number;
  currentPosition: string[][];
  prevPosition: string;
  castleDirection: string;
}

export interface IRegularMoves {
  figureName: string;
  axisY: number;
  axisX: number;
  currentPosition: string[][];
}

export interface IFigureMoves {
  figureName: string;
  axisY: number;
  axisX: number;
  currentPosition: string[][];
}

interface ICastlingMoves extends IFigureMoves {
  castleDirection: string;
}

interface IPawnMoves extends IFigureMoves {
  prevPosition: string;
}

export type TGetCastlingDirections = {
  figureName: string;
  axisY: number;
  axisX: number;
  castleDirection: {
    white: string;
    black: string;
  } | string;
}

export const getRookMoves = ({ figureName, axisY, axisX, currentPosition }: IFigureMoves) => {
  const moves: number[][] = [];
  const playerColor = figureName?.slice(0, 5);
  const enemy = playerColor === 'white' ? 'black' : 'white';
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
      if (currentPosition[y][x].slice(0, 5) === playerColor) break;
      if (currentPosition[y][x].slice(0, 5) === enemy) {
        moves.push([y, x]);
        break;
      }
      moves.push([y, x]);
    }
  });
  return moves;
}

export const getKnightMoves = ({ figureName, axisY, axisX, currentPosition }: IFigureMoves) => {
  const moves: number[][] = [];
  const enemy = figureName.slice(0, 5) === 'white' ? 'black' : 'white';

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

export const getBishopMoves = ({ figureName, axisY, axisX, currentPosition }: IFigureMoves) => {
  const moves: number[][] = [];
  const playerColor = figureName?.slice(0, 5);
  const enemy = playerColor === 'white' ? 'black' : 'white';
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
      if (currentPosition[y][x].slice(0, 5) === playerColor) break;
      if (currentPosition[y][x].slice(0, 5) === enemy) {
        moves.push([y, x]);
        break;
      }
      moves.push([y, x]);
    }
  });
  return moves;
}

export const getQueenMoves = ({ figureName, axisY, axisX, currentPosition }: IFigureMoves) => {
  const moves = [
    ...getRookMoves({ figureName, axisY, axisX, currentPosition }),
    ...getBishopMoves({ figureName, axisY, axisX, currentPosition })
  ];
  return moves;
}

export const getKingMoves = ({ figureName, axisY, axisX, currentPosition }: IFigureMoves) => {
  const moves: number[][] = [];
  const playerColor = figureName?.slice(0, 5);

  const direction = [
    [1, -1], [1, 0], [1, 1],
    [0, -1], [0, 1],
    [-1, -1], [-1, 0], [-1, 1]
  ];

  direction.forEach(dir => {
    const y = axisY + dir[0];
    const x = axisX + dir[1];
    if (currentPosition?.[y]?.[x] !== undefined && currentPosition[y][x].slice(0, 5) !== playerColor) {
      moves.push([y, x]);
    };
  });

  return moves;
}

export const getPawnMoves = ({ figureName, prevPosition, axisY, axisX, currentPosition }: IPawnMoves) => {
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

export const getCastlingMoves = ({ figureName, axisY, axisX, currentPosition, castleDirection }: ICastlingMoves) => {
  const moves: number[][] = [];
  const playerColor = figureName.slice(0, 5);
  const y = playerColor === 'white' ? 0 : 7;

  if (axisX !== 4 || axisY % 7 !== 0 || castleDirection === 'none') return moves;
  if (arbiter.isPlayerInCheck({ positionAfterMove: currentPosition, player: playerColor })) return moves;

  if (['left', 'both'].includes(castleDirection) &&
    !currentPosition[y][3] &&
    !currentPosition[y][2] &&
    !currentPosition[y][1] &&
    currentPosition[y][0] === `${playerColor}-rook` &&
    !arbiter.isPlayerInCheck({
      positionAfterMove: arbiter.performMove({ currentPosition, figureName, axisY, axisX, y, x: 3 }),
      player: playerColor
    })
  ) {
    moves.push([y, 2]);
  };
  if (['right', 'both'].includes(castleDirection) &&
    !currentPosition[y][5] &&
    !currentPosition[y][6] &&
    currentPosition[y][7] === `${playerColor}-rook` &&
    !arbiter.isPlayerInCheck({
      positionAfterMove: arbiter.performMove({ currentPosition, figureName, axisY, axisX, y, x: 5 }),
      player: playerColor
    })
  ) {
    moves.push([y, 6]);
  };
  return moves;
}

export const getCastlingDirections = ({ figureName, axisY, axisX, castleDirection }: TGetCastlingDirections) => {
  if (!figureName || !castleDirection) return;
  const figure = figureName.slice(0, 5);
  const direction = castleDirection[figure];
  const isWhite = figure === 'white' ? 0 : 7;

  if (figureName?.slice(6) === 'king') {
    return 'none';
  }

  if (axisX === isWhite && axisY === 0) {
    if (direction === 'both') return 'right';
    if (direction === 'left') return 'none';
  }

  if (axisX === isWhite && axisY === 7) {
    if (direction === 'both') return 'right';
    if (direction === 'left') return 'none';
  }

}

export const getKingPosition = (position: string[][], player: string) => {
  let kingPosition;
  position.forEach((axisY, y) => {
    axisY.forEach((_axisX, x) => {
      if (position[y][x].slice(0, 5) === player && position[y][x].slice(6) === 'king') {
        kingPosition = [y, x];
      }
    })
  })
  return kingPosition;
}

export const getFigures = (position: string[][], enemy: string) => {
  const enemyFigures: {
    figureName: string;
    axisY: number;
    axisX: number;
  }[] = [];

  position.forEach((axisY, y) => {
    axisY.forEach((_axisX, x) => {
      if (position[y][x].slice(0, 5) === enemy) {
        enemyFigures.push({
          figureName: position[y][x],
          axisY: y,
          axisX: x
        })
      }
    })
  })

  return enemyFigures;
}