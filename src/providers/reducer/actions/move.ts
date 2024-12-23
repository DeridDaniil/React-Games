import { actionTypes } from "../../../model/actionsTypes"

type TMakeNewMove = {
  newPosition: string[][];
}

export const makeNewMove = ({ newPosition }: TMakeNewMove) => {
  return {
    type: actionTypes.NEW_MOVE,
    payload: { newPosition }
  }
}