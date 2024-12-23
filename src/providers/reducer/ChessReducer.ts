import { actionTypes } from "../../model/actionsTypes";

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
    default:
      return state;
  }
}