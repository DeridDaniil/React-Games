import { DragEvent, useRef } from 'react';

import { calculateCoords } from '../../model/Figures';
import { useChessContext } from '../../providers/context/ChessContext';
import { makeNewMove } from '../../providers/reducer/actions/move';
import Figure from '../Figure/Figure';

import styles from './Figures.module.scss';

const Figures = () => {
  const figuresRef = useRef(null);
  const { chessState, dispatch } = useChessContext();
  const currentPosition = chessState.position[chessState.position.length - 1];

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    const newPosition = currentPosition.map((element: string[]) => element);
    const { x, y } = calculateCoords(event, figuresRef);
    const [figureName, axisY, axisX] = event.dataTransfer.getData('text').split(', ');

    newPosition[Number(axisY)][Number(axisX)] = '';
    newPosition[y][x] = figureName;

    dispatch(makeNewMove({ newPosition }));
  }

  const onDragOver = (event: DragEvent<HTMLDivElement>) => event.preventDefault();

  return (
    <div className={styles.figures} onDrop={onDrop} onDragOver={onDragOver} ref={figuresRef}>
      {currentPosition.map((row, y) =>
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