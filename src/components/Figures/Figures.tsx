import { DragEvent, useRef } from 'react';

import { calculateCoords } from '../../model/Figures';
import { useChessContext } from '../../providers/context/ChessContext';
import { clearCandidates, makeNewMove } from '../../providers/reducer/actions/move';
import Figure from '../Figure/Figure';

import styles from './Figures.module.scss';

const Figures = () => {
  const figuresRef = useRef(null);
  const { chessState, dispatch } = useChessContext();
  const currentPosition = chessState.position[chessState.position.length - 1];

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const newPosition = currentPosition.map((y: string[]) => y.map(x => x));
    const { x, y } = calculateCoords(event, figuresRef);
    const [figureName, axisY, axisX] = event.dataTransfer.getData('text').split(', ');

    if (chessState.candidateMoves?.find((m: number[]) => m[0] === y && m[1] === x)) {
      // Взятие пешкой на проходе.
      if (figureName.slice(6) === 'pawn' && !newPosition[y][x] && y !== axisY && x !== axisX) newPosition[axisY][x] = '';

      newPosition[Number(axisY)][Number(axisX)] = '';
      newPosition[y][x] = figureName;

      dispatch(makeNewMove({ newPosition }));
    }
    dispatch(clearCandidates());
  }

  const onDragOver = (event: DragEvent<HTMLDivElement>) => event.preventDefault();

  return (
    <div className={styles.figures} onDrop={onDrop} onDragOver={onDragOver} ref={figuresRef}>
      {currentPosition.map((row: number[], y: number) =>
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