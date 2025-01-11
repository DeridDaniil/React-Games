import { StatusTypes } from '../../../model/enums';
import { useChessContext } from '../../../providers/context/ChessContext';
import { setupNewGame } from '../../../providers/reducer/actions/game';
import styles from './GameEnds.module.scss';

type TGameEnds = {
  onClosePopup: () => void;
}

const GameEnds = ({ onClosePopup }: TGameEnds) => {
  const { chessState, dispatch } = useChessContext();
  const { status } = chessState;

  if (status === StatusTypes.ONGOING || status === StatusTypes.PROMOTING) return null;
  const isWin = status.slice(6) === 'wins';

  const newGame = () => {
    dispatch(setupNewGame());
  }

  return (
    <div className={styles.popup_inner}>
      <h1>{isWin ? status : 'Draw'}</h1>
      <p>{!isWin && status}</p>
      <div className={styles.status}></div>
      <button onClick={newGame}>New Game</button>
    </div>
  )
};

export default GameEnds;