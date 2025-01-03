import { DragEvent, useRef } from 'react';

import { calculateCoords } from '../../model/Figures';
import { useChessContext } from '../../providers/context/ChessContext';
import { clearCandidates, makeNewMove } from '../../providers/reducer/actions/move';
import Figure from '../Figure/Figure';

import styles from './Figures.module.scss';
import arbiter from '../../model/arbiter/arbiter';
import { openPromotion, TOpenPromotion } from '../../providers/reducer/actions/popup';

const Figures = () => {
  const figuresRef = useRef(null);
  const { chessState, dispatch } = useChessContext();
  const currentPosition = chessState.position[chessState.position.length - 1];

  const openPromotionBox = ({ axisY, axisX, y, x }: TOpenPromotion) => {
    dispatch(openPromotion({ axisY, axisX, y, x }));
  }

  const move = (event: DragEvent<HTMLDivElement>) => {
    const { x, y } = calculateCoords(event, figuresRef);
    const [figureName, axisY, axisX] = event.dataTransfer.getData('text').split(', ');
    if (chessState.candidateMoves?.find((m: number[]) => m[0] === y && m[1] === x)) {
      if ((figureName === 'white-pawn' && y === 7) || (figureName === 'black-pawn' && y === 0)) {
        openPromotionBox({ axisY, axisX, y, x });
      }
      const newPosition = arbiter.performMove({
        currentPosition,
        figureName, axisY, axisX,
        y, x
      });
      dispatch(makeNewMove({ newPosition }));
    }
    dispatch(clearCandidates());
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    move(event);
  }

  const onDragOver = (event: DragEvent<HTMLDivElement>) => event.preventDefault();

  return (
    <div className={styles.figures} onDrop={onDrop} onDragOver={onDragOver} ref={figuresRef}>
      {currentPosition.map((row: string[], y: number) =>
        row.map((_y, x: number) => (
          currentPosition[y][x] ?
            <Figure
              key={x + '-' + y}
              axisY={y}
              axisX={x}
              figureName={currentPosition[y][x]}
            />
            : null
        ))
      )}
    </div>
  )
}

export default Figures;