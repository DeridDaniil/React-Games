import { createPositionFigures } from "./Figures";

export enum Status {
  ONGOING = 'Ongoing',
  PROMOTING = 'Promoting',
  WHITE = 'White wins',
  BLACK = 'Black wins'
}

export const initChessGame = {
  position: [createPositionFigures()],
  turn: 'white',
  candidateMoves: [],
  status: Status.ONGOING,
  promotionSquare: null
}