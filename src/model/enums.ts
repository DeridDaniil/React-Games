export enum ActionTypes {
  NEW_MOVE = 'NEW_MOVE',
  GENERATE_CANDIDATE_MOVES = 'GENERATE_CANDIDATE_MOVES',
  CLEAR_CANDIDATE_MOVES = 'CLEAR_CANDIDATE_MOVES',
  PROMOTION_OPEN = 'PROMOTION_OPEN',
  PROMOTION_CLOSE = 'PROMOTION_CLOSE',
  CAN_CASTLE = 'CAN_CASTLE',
  STALEMATE = 'STALEMATE',
  NEW_GAME = 'NEW_GAME'
}

export enum StatusTypes {
  ONGOING = 'Ongoing',
  PROMOTING = 'Promoting',
  WHITE = 'White wins',
  BLACK = 'Black wins',
  STALEMATE = 'Game draws due to stalemate',
  INSUFFICIET = 'Game draws due to insufficient material'
}