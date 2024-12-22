import { FC } from 'react';
import styles from './Ranks.module.scss';

interface IRanksProps {
  ranks: number[];
}

const Ranks: FC<IRanksProps> = ({ ranks }) => {
  return (
    <div className={styles.ranks}>
      {ranks.map(rank => <span key={rank}>{rank}</span>)}
    </div>
  )
}

export default Ranks;