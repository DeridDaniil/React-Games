import { Status } from '../../model/constant';
import { useChessContext } from '../../providers/context/ChessContext';
import { closePopup } from '../../providers/reducer/actions/popup';
import PromotionBox from './PromotionBox/PromotionBox';

import styles from './Popup.module.scss';

const Popup = () => {
  const { chessState, dispatch } = useChessContext();

  if (chessState.status === Status.ONGOING) return null;
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