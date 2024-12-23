import Ranks from '../Bits/Ranks/Ranks';
import Files from '../Bits/Files/Files';
import Figures from '../Figures/Figures';

import styles from './Board.module.scss';

const Board = () => {
  const axisX = Array(8).fill('').map((_y, i) => i + 1);
  const axisY = Array(8).fill('').map((_x, i) => 8 - i);
  return (
    <div className={styles.board}>
      <Ranks ranks={axisY} />
      <div className={styles.cells}>
        {axisY.map((y, i) => (
          axisX.map((x, j) => (
            <div
              key={x + '-' + y}
              className={`${styles.cell} ${(i + j) % 2 === 0 ? styles.white : styles.black}`}>
            </div>
          ))
        ))}
        <Figures/>
      </div>
      <Files files={axisX} />
    </div>
  )
}

export default Board;