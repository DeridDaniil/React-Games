import { getRookMoves, getKnightMoves, TMoves } from "./getMoves"

const arbiter = {
  getRegularMoves: function ({ figureName, axisY, axisX, currentPosition }: TMoves) {
    const figure = figureName?.slice(6); 
    if (figure === 'knight') return getKnightMoves({ axisY, axisX, currentPosition });
    if (figure === 'rook') return getRookMoves({ figureName, axisY, axisX, currentPosition });
  }
}

export default arbiter;