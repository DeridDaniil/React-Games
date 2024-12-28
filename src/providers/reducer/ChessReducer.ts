import { actionTypes } from "../../model/actionsTypes";
import { Status } from "../../model/constant";

export const ChessReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.NEW_MOVE: {
      let { turn, position } = state;
      turn = turn === 'white' ? 'black' : 'white';
      position = [
        ...position,
        action.payload.newPosition
      ]
      return {
        ...state,
        turn,
        position
      }
    }
    case actionTypes.GENERATE_CANDIDATE_MOVES: {
      return {
        ...state,
        candidateMoves: action.payload.candidateMoves
      }
    }
    case actionTypes.CLEAR_CANDIDATE_MOVES: {
      return {
        ...state,
        candidateMoves: []
      }
    }

    case actionTypes.PROMOTION_OPEN: {
      return {
        ...state,
        status: Status.PROMOTING,
        promotionSquare: { ...action.payload }
      }
    }

    case actionTypes.PROMOTION_CLOSE: {
      return {
        ...state,
        status: Status.ONGOING,
        promotionSquare: null
      }

    }
    default:
      return state;
  }
}