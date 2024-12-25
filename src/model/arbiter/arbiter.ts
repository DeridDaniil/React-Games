import { getRookMoves, getKnightMoves, TMoves, getBishopMoves, getQueenMoves, getKingMoves, getPawnMoves } from "./getMoves"

const arbiter = {
  getRegularMoves: function ({ figureName, axisY, axisX, currentPosition }: TMoves) {
    const figure = figureName?.slice(6);
    if (figure === 'pawn') return getPawnMoves({ figureName, axisY, axisX, currentPosition });
    if (figure === 'king') return getKingMoves({ figureName, axisY, axisX, currentPosition });
    if (figure === 'queen') return getQueenMoves({ figureName, axisY, axisX, currentPosition });
    if (figure === 'bishop') return getBishopMoves({ figureName, axisY, axisX, currentPosition });
    if (figure === 'knight') return getKnightMoves({ axisY, axisX, currentPosition });
    if (figure === 'rook') return getRookMoves({ figureName, axisY, axisX, currentPosition });
  }
}

export default arbiter;