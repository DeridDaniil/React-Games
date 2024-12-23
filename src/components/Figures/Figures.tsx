import { useState, DragEvent, useRef } from 'react';
import Figure from '../Figure/Figure';
import styles from './Figures.module.scss';
import { createPositionFigures, calculateCoords } from '../../model/Figures';

const Figures = () => {
  const figuresRef = useRef(null);
  const [position, setPosition] = useState<string[][]>(createPositionFigures());

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    const newPosition = position.map(element => element);
    const { x, y } = calculateCoords(event, figuresRef);
    const [figureName, axisY, axisX] = event.dataTransfer.getData('text').split(', ');

    newPosition[Number(axisY)][Number(axisX)] = '';
    newPosition[y][x] = figureName;

    setPosition(newPosition);
  }

  const onDragOver = (event: DragEvent<HTMLDivElement>) => event.preventDefault();

  return (
    <div className={styles.figures} onDrop={onDrop} onDragOver={onDragOver} ref={figuresRef}>
      {position.map((row, y) =>
        row.map((_y, x: number) => (
          position[y][x] ?
            <Figure
              key={x + '-' + y}
              axisY={y}
              axisX={x}
              figureName={position[y][x]}
            />
            : null
        ))
      )}
    </div>
  )
}

export default Figures;