import { ActionTypes } from "../../../model/enums"

export const updateCastling = (direction) => {
  return {
    type: ActionTypes.CAN_CASTLE,
    payload: direction
  }
}