import { areSomeColorTiles, findFiguresCoords } from "../Figures";
import { getRookMoves, getKnightMoves, IRegularMoves, getBishopMoves, getQueenMoves, getKingMoves, getPawnMoves, IValidMoves, getKingPosition, getFigures, getCastlingMoves, getEnPassantMoves } from "./getMoves"
import { movePawn, moveFigure, TPerformMove } from "./move";

const arbiter = {
  getRegularMoves: function ({ figureName, axisY, axisX, currentPosition }: IRegularMoves) {
    const figure = figureName?.slice(6);
    if (figure === 'queen') return getQueenMoves({ figureName, axisY, axisX, currentPosition });
    if (figure === 'bishop') return getBishopMoves({ figureName, axisY, axisX, currentPosition });
    if (figure === 'knight') return getKnightMoves({ figureName, axisY, axisX, currentPosition });
    if (figure === 'rook') return getRookMoves({ figureName, axisY, axisX, currentPosition });
    if (figure === 'king') return getKingMoves({ figureName, axisY, axisX, currentPosition });
    if (figure === 'pawn') return getPawnMoves({ figureName, axisY, axisX, currentPosition });
  },

  getValidMoves: function ({ figureName, axisY, axisX, currentPosition, prevPosition, castleDirection }: IValidMoves) {
    const player = figureName.slice(0, 5) === 'white' ? 'white' : 'black';
    let moves = this.getRegularMoves({ figureName, axisY, axisX, currentPosition });;
    const notInCheckMoves: number[][] = [];

    if (figureName.slice(6) === 'pawn') {
      moves = [
        ...moves,
        ...getEnPassantMoves({ figureName, prevPosition, axisY, axisX, currentPosition })
      ];
    }

    if (figureName.slice(6) === 'king') {
      moves = [
        ...moves,
        ...getCastlingMoves({ figureName, axisY, axisX, currentPosition, castleDirection })
      ];
    }

    moves?.forEach(([y, x]) => {
      const positionAfterMove = this.performMove({ currentPosition, figureName, axisY, axisX, y, x });
      if (!this.isPlayerInCheck({ positionAfterMove, currentPosition, player })) notInCheckMoves.push([y, x]);
    })

    return notInCheckMoves;
  },

  performMove: function ({ currentPosition, figureName, axisY, axisX, y, x }: TPerformMove) {
    if (figureName.slice(6) === 'pawn') return movePawn({ currentPosition, figureName, axisY, axisX, y, x });
    else return moveFigure({ currentPosition, figureName, axisY, axisX, y, x });
  },

  isPlayerInCheck: function ({ positionAfterMove, currentPosition, player }: IIsPlayerInCheck) {
    const enemy = player === 'white' ? 'black' : 'white';
    let kingPosition = getKingPosition(positionAfterMove, player);
    const enemyfigures = getFigures(positionAfterMove, enemy);

    if (!kingPosition) return;

    const enemyMoves = enemyfigures.reduce((acc, f) => acc = [
      ...acc,
      ...(f.figureName === `${enemy}-pawn`)
        ? getPawnMoves({
          currentPosition: positionAfterMove,
          prevPosition: currentPosition,
          ...f
        })
        : this.getRegularMoves({
          currentPosition: positionAfterMove,
          ...f
        })
    ], [])

    if (enemyMoves.some(([y, x]) => kingPosition[0] === y && kingPosition[1] === x)) return true
    return false;
  },

  isStalemate: function (currentPosition: string[][], player: string, castleDirection: string) {
    const isInCheck = this.isPlayerInCheck({ positionAfterMove: currentPosition, player });
    if (isInCheck) return false;

    const figures = getFigures(currentPosition, player);
    const moves = figures.reduce((acc, f) => acc = [
      ...acc,
      ...(this.getValidMoves({
        currentPosition,
        castleDirection,
        ...f
      }))
    ], []);

    return (!isInCheck && moves.length === 0);
  },

  insufficientMaterial: function (currentPosition: string[][]) {
    const figures = currentPosition.reduce((acc, axisY) =>
      acc = [
        ...acc,
        ...axisY.filter(y => y)
      ], []);

    if (figures.length === 2) return true;
    if (figures.length === 3 && (figures.some(f => f.slice(6) === 'bishop' || f.slice(6) === 'knight'))) return true;
    if (figures.length === 4 &&
      figures.every(f => f.slice(6) === 'bishop' || f.slice(6) === 'king') &&
      new Set(figures).size === 4 &&
      areSomeColorTiles(
        findFiguresCoords(currentPosition, 'white-bishop')[0],
        findFiguresCoords(currentPosition, 'black-bishop')[0],
      )
    ) return true;
    return false;
  },

  isCheckMate: function (currentPosition: string[][], player: string, castleDirection: string) {
    const isInCheck = this.isPlayerInCheck({ positionAfterMove: currentPosition, player });

    const figures = getFigures(currentPosition, player);
    const moves = figures.reduce((acc, f) => acc = [
      ...acc,
      ...(this.getValidMoves({
        currentPosition,
        castleDirection,
        ...f
      }))
    ], []);

    return (isInCheck && moves.length === 0);
  },
};

interface IIsPlayerInCheck {
  positionAfterMove: string[][];
  currentPosition?: string[][];
  player: string;
}

export default arbiter;