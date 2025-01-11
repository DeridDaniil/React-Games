import { StatusTypes } from '../../model/enums';
import { useChessContext } from '../../providers/context/ChessContext';
import { closePopup } from '../../providers/reducer/actions/popup';

import styles from './Popup.module.scss';
import { Children, cloneElement, PropsWithChildren } from 'react';

const Popup = ({ children }: PropsWithChildren) => {
  const { chessState, dispatch } = useChessContext();

  if (chessState.status === StatusTypes.ONGOING) return null;
  const onClosePopup = () => {
    dispatch(closePopup());
  };

  return (
    <div className={styles.popup}>
      {Children.toArray(children).map(child => cloneElement(child, {onClosePopup}))};
    </div>
  )
}

export default Popup;