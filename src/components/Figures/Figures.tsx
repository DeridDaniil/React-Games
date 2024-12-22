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
    const [figureName, axisX, axisY] = event.dataTransfer.getData('text').split(', ');
    console.log(x, y, axisX, axisY);

    newPosition[Number(axisX)][Number(axisY)] = '';
    newPosition[x][y] = figureName;

    setPosition(newPosition);
  }

  const onDragOver = (event: DragEvent<HTMLDivElement>) => event.preventDefault();

  return (
    <div className={styles.figures} onDrop={onDrop} onDragOver={onDragOver} ref={figuresRef}>
      {position.map((row, x) =>
        row.map((_y, y: number) => (
          position[x][y] ?
            <Figure
              key={x + '-' + y}
              axisX={x}
              axisY={y}
              figureName={position[x][y]}
            />
            : null
        ))
      )}
    </div>
  )
}

export default Figures;