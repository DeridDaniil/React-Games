import { useReducer } from 'react';
import { ChessReducer } from '../../providers/reducer/ChessReducer';
import { initChessGame } from '../../model/constant';

import ChessContext from '../../providers/context/ChessContext';
import Board from '../../components/Board/Board';
import Control from '../../components/Control/Control';
import MovesList from '../../components/Control/MovesList.tsx/MovesList';
import TakeBack from '../../components/Control/TakeBack/TakeBack';

import styles from './Chess.module.scss';

const Chess = () => {
  const [chessState, dispatch] = useReducer(ChessReducer, initChessGame);
  const chessProviderState = {
    chessState,
    dispatch
  };

  return (
    <ChessContext.Provider value={chessProviderState}>
      <div className={styles.chess}>
        <Board />
        <Control>
          <MovesList />
          <TakeBack />
        </Control>
      </div>
    </ChessContext.Provider>
  )
}

export default Chess; 