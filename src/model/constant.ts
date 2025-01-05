import { StatusTypes } from "./enums";
import { createPositionFigures } from "./Figures";

export const initChessGame = {
  position: [createPositionFigures()],
  turn: 'white',
  candidateMoves: [],
  status: StatusTypes.ONGOING,
  promotionSquare: null,
  castleDirection: {
    white: 'both',
    black: 'both'
  }
}