import { useChessContext } from '../../../providers/context/ChessContext';
import styles from './MovesList.module.scss';

const MovesList = () => {
  const { chessState } = useChessContext();
  const { movesList } = chessState;

  return (
    <div className={styles.movesList}>
      {movesList.map((move, i) => (
        <div key={i} data-number={Math.floor((i / 2) + 1)}>{move}</div>
      ))}
    </div>
  )
}

export default MovesList;