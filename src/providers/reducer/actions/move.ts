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

type TGenerateCandidateMoves = {
  candidateMoves: number[][] | undefined;
}

export const generateCandidateMoves = ({ candidateMoves }: TGenerateCandidateMoves) => {
  return {
    type: actionTypes.GENERATE_CANDIDATE_MOVES,
    payload: { candidateMoves }
  }
}

export const clearCandidates = () => {
  return {
    type: actionTypes.CLEAR_CANDIDATE_MOVES
  }
}