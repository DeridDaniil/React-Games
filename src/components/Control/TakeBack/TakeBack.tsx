import { useChessContext } from '../../../providers/context/ChessContext';
import { takeBack } from '../../../providers/reducer/actions/move';
import styles from './TakeBack.module.scss';

const TakeBack = () => {

  const { dispatch } = useChessContext();

  return (
    <button className={styles.button} onClick={() => dispatch(takeBack())} >Take Back</button>
  )
}

export default TakeBack;