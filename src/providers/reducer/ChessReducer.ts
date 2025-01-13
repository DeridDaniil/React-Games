import { ActionTypes, StatusTypes } from "../../model/enums";

export const ChessReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.NEW_MOVE: {
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

    case ActionTypes.GENERATE_CANDIDATE_MOVES: {
      return {
        ...state,
        candidateMoves: action.payload.candidateMoves
      }
    }

    case ActionTypes.CLEAR_CANDIDATE_MOVES: {
      return {
        ...state,
        candidateMoves: []
      }
    }

    case ActionTypes.PROMOTION_OPEN: {
      return {
        ...state,
        status: StatusTypes.PROMOTING,
        promotionSquare: { ...action.payload }
      }
    }

    case ActionTypes.PROMOTION_CLOSE: {
      return {
        ...state,
        status: StatusTypes.ONGOING,
        promotionSquare: null
      }
    }

    case ActionTypes.CAN_CASTLE: {
      const { turn, castleDirection } = state;
      castleDirection[turn] = action.payload;
      return {
        ...state,
        castleDirection
      }
    }

    case ActionTypes.STALEMATE: {
      return {
        ...state,
        status: StatusTypes.STALEMATE
      }
    }

    case ActionTypes.NEW_GAME: {
      return {
        ...action.payload
      }
    }

    case ActionTypes.INSUFFICIENT_MATERIAL: {
      return {
        ...state,
        status: StatusTypes.INSUFFICIET
      }
    }
    
    case ActionTypes.CHECKMATE: {
      return {
        ...state,
        status: action.payload === 'white' ? StatusTypes.WHITE : StatusTypes.BLACK
      }
    }

    default:
      return state;
  }
}