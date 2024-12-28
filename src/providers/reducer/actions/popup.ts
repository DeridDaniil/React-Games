import { ActionTypes } from "../../../model/enums"

export type TOpenPromotion = Record< 'axisY' | 'axisX' | 'y' | 'x' , number>;

export const openPromotion = ({ axisY, axisX, y, x }: TOpenPromotion) => {
  return {
    type: ActionTypes.PROMOTION_OPEN,
    payload: { axisY, axisX, y, x }
  }
}

export const closePopup = () => {
  return {
    type: ActionTypes.PROMOTION_CLOSE
  }
}