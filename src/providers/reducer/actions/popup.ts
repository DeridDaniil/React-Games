import { actionTypes } from "../../../model/actionsTypes"

export type TOpenPromotion = Record< 'axisY' | 'axisX' | 'y' | 'x' , number>;

export const openPromotion = ({ axisY, axisX, y, x }: TOpenPromotion) => {
  return {
    type: actionTypes.PROMOTION_OPEN,
    payload: { axisY, axisX, y, x }
  }
}

export const closePopup = () => {
  return {
    type: actionTypes.PROMOTION_CLOSE
  }
}