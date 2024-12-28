import { StatusTypes } from '../../model/enums';
import { useChessContext } from '../../providers/context/ChessContext';
import { closePopup } from '../../providers/reducer/actions/popup';
import PromotionBox from './PromotionBox/PromotionBox';

import styles from './Popup.module.scss';

const Popup = () => {
  const { chessState, dispatch } = useChessContext();

  if (chessState.status === StatusTypes.ONGOING) return null;
  const onClosePopup = () => {
    dispatch(closePopup());
  };

  return (
    <div className={styles.popup}>
      <PromotionBox onClosePopup={onClosePopup} />
    </div>
  )
}

export default Popup;