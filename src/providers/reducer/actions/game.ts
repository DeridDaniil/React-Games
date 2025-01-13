import { initChessGame } from "../../../model/constant"
import { ActionTypes } from "../../../model/enums"

export const updateCastling = (direction) => {
  return {
    type: ActionTypes.CAN_CASTLE,
    payload: direction
  }
}

export const detectStalemate = () => {
  return {
    type: ActionTypes.STALEMATE,
  }
}

export const setupNewGame = () => {
  return {
    type: ActionTypes.NEW_GAME,
    payload: initChessGame
  }
}

export const detectInsufficientMaterial = () => {
  return {
    type: ActionTypes.INSUFFICIENT_MATERIAL,
  }
}

export const detectCheckMate = (winner: string) => {
  return {
    type: ActionTypes.CHECKMATE,
    payload: winner
  }
}