import Ranks from '../Bits/Ranks/Ranks';
import Files from '../Bits/Files/Files';
import Figures from '../Figures/Figures';

import { useChessContext } from '../../providers/context/ChessContext';
import styles from './Board.module.scss';
import Popup from '../popup/Popup';
import arbiter from '../../model/arbiter/arbiter';
import { getKingPosition } from '../../model/arbiter/getMoves';

const Board = () => {
  const axisX = Array(8).fill('').map((_y, i) => i + 1);
  const axisY = Array(8).fill('').map((_x, i) => 8 - i);

  const { chessState } = useChessContext();
  const position = chessState.position[chessState.position.length - 1];

  const isChecked = (() => {
    const isInCheck = arbiter.isPlayerInCheck({
      positionAfterMove: position,
      player: chessState.turn
    });
    if (isInCheck) return getKingPosition(position, chessState.turn);
    return null;
  })();

  const getClassName = (i: number, j: number) => {
    let stylesCell = styles.cell;
    stylesCell += (i + j) % 2 !== 0 ? ` ${styles.white}` : ` ${styles.black}`;
    if (chessState.candidateMoves?.find(m => m[0] === i && m[1] === j)) {
      if (position[i][j]) stylesCell += ` ${styles.attaking}`;
      else stylesCell += ` ${styles.highlight}`;
    }

    if (isChecked && isChecked[0] === i && isChecked[1] === j) stylesCell += ` ${styles.checked}`;

    return stylesCell;
  }

  return (
    <div className={styles.board}>
      <Ranks ranks={axisY} />
      <div className={styles.cells}>
        {axisY.map((y, i) => (
          axisX.map((x, j) => (
            <div
              key={x + '-' + y}
              className={getClassName(7 - i, j)}>
            </div>
          ))
        ))}
        <Figures />
        <Popup />
      </div>
      <Files files={axisX} />
    </div>
  )
}

export default Board;