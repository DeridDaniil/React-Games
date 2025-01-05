import { getRookMoves, getKnightMoves, TMoves, getBishopMoves, getQueenMoves, getKingMoves, getPawnMoves } from "./getMoves"
import { movePawn, moveFigure, TPerformMove } from "./move";

const arbiter = {
  getRegularMoves: function ({ figureName, axisY, axisX, currentPosition, prevPosition, castleDirection }: TMoves) {
    const figure = figureName?.slice(6);
    if (figure === 'pawn') return getPawnMoves({ figureName, axisY, axisX, currentPosition, prevPosition });
    if (figure === 'king') return getKingMoves({ figureName, axisY, axisX, currentPosition, castleDirection });
    if (figure === 'queen') return getQueenMoves({ figureName, axisY, axisX, currentPosition });
    if (figure === 'bishop') return getBishopMoves({ figureName, axisY, axisX, currentPosition });
    if (figure === 'knight') return getKnightMoves({ axisY, axisX, currentPosition });
    if (figure === 'rook') return getRookMoves({ figureName, axisY, axisX, currentPosition });
  },
  performMove: function ({ currentPosition, figureName, axisY, axisX, y, x }: TPerformMove) {
    if (figureName.slice(6) === 'pawn') return movePawn({ currentPosition, figureName, axisY, axisX, y, x });
    else return moveFigure({ currentPosition, figureName, axisY, axisX, y, x });
  }
}

export default arbiter;