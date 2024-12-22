import { FC, DragEvent } from 'react';
import './Figure.scss';

interface IFigureProps {
  axisX: number;
  axisY: number;
  figureName: string;
}

const Figure: FC<IFigureProps> = ({ axisX, axisY, figureName }) => {
  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', `${figureName}, ${axisX}, ${axisY}`);
    setTimeout(() => {
      event.currentTarget.style.display = 'none';
    }, 0)
  }

  const onDragEnd = (event: DragEvent<HTMLDivElement>) => event.currentTarget.style.display = 'block';

  return (
    <div
      className={`figure ${figureName} p-${axisX}${axisY}`}
      draggable='true'
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  )
}

export default Figure;