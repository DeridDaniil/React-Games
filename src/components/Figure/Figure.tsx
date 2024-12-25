import { FC, DragEvent } from 'react';
import './Figure.scss';
import { useChessContext } from '../../providers/context/ChessContext';
import arbiter from '../../model/arbiter/arbiter';
import { generateCandidateMoves } from '../../providers/reducer/actions/move';

interface IFigureProps {
  axisX: number;
  axisY: number;
  figureName: string;
}

const Figure: FC<IFigureProps> = ({ axisY, axisX, figureName }) => {
  const { chessState, dispatch } = useChessContext();
  const { turn, position } = chessState;
  const currentPosition = position[position.length - 1];

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', `${figureName}, ${axisY}, ${axisX}`);
    setTimeout(() => {
      const target = event.target as HTMLDivElement; // для ts
      target.style.display = 'none';
    }, 0);
    if (turn === figureName.slice(0, 5)) {
      const candidateMoves = arbiter.getRegularMoves({ figureName, axisY, axisX, currentPosition });
      dispatch(generateCandidateMoves({ candidateMoves }));
    };
  }

  const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement; // для ts
    target.style.display = 'block';
  };

  return (
    <div
      className={`figure ${figureName} p-${axisY}${axisX}`}
      draggable='true'
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  )
}

export default Figure;