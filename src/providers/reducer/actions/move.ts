import { ActionTypes } from "../../../model/enums"

type TMakeNewMove = {
  newPosition: string[][];
  newMove: string;
}

export const makeNewMove = ({ newPosition, newMove }: TMakeNewMove) => {
  return {
    type: ActionTypes.NEW_MOVE,
    payload: { newPosition, newMove }
  }
}

type TGenerateCandidateMoves = {
  candidateMoves: number[][] | undefined;
}

export const generateCandidateMoves = ({ candidateMoves }: TGenerateCandidateMoves) => {
  return {
    type: ActionTypes.GENERATE_CANDIDATE_MOVES,
    payload: { candidateMoves }
  }
}

export const clearCandidates = () => {
  return {
    type: ActionTypes.CLEAR_CANDIDATE_MOVES
  }
}

export const takeBack = () => {
  return {
    type: ActionTypes.TAKE_BACK
  }
}