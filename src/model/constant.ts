import { createPositionFigures } from "./Figures";

export const initChessGame = {
  position: [createPositionFigures()],
  turn: 'white',
  candidateMoves: []
}