import { getRookMoves, getKnightMoves, TMoves, getBishopMoves, getQueenMoves, getKingMoves } from "./getMoves"

const arbiter = {
  getRegularMoves: function ({ figureName, axisY, axisX, currentPosition }: TMoves) {
    const figure = figureName?.slice(6);
    if (figure === 'king') return getKingMoves({ figureName, axisY, axisX, currentPosition });
    if (figure === 'queen') return getQueenMoves({ figureName, axisY, axisX, currentPosition });
    if (figure === 'bishop') return getBishopMoves({ figureName, axisY, axisX, currentPosition });
    if (figure === 'knight') return getKnightMoves({ axisY, axisX, currentPosition });
    if (figure === 'rook') return getRookMoves({ figureName, axisY, axisX, currentPosition });
  }
}

export default arbiter;