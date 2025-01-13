import { DragEvent, useRef } from 'react';

import { calculateCoords, getNewMoveNotation } from '../../model/Figures';
import { useChessContext } from '../../providers/context/ChessContext';
import { clearCandidates, makeNewMove } from '../../providers/reducer/actions/move';
import Figure from '../Figure/Figure';

import styles from './Figures.module.scss';
import arbiter from '../../model/arbiter/arbiter';
import { openPromotion, TOpenPromotion } from '../../providers/reducer/actions/popup';
import { getCastlingDirections } from '../../model/arbiter/getMoves';
import { detectCheckMate, detectInsufficientMaterial, detectStalemate, updateCastling } from '../../providers/reducer/actions/game';

const Figures = () => {
  const figuresRef = useRef(null);
  const { chessState, dispatch } = useChessContext();
  const currentPosition = chessState.position[chessState.position.length - 1];

  const openPromotionBox = ({ axisY, axisX, y, x }: TOpenPromotion) => {
    dispatch(openPromotion({ axisY, axisX, y, x }));
  }

  const updateCastlingState = ({ figureName, axisY, axisX }) => {
    const direction = getCastlingDirections({
      figureName, axisY, axisX,
      castleDirection: chessState.castleDirection
    });
    if (direction) {
      dispatch(updateCastling(direction));
    }
  }

  const move = (event: DragEvent<HTMLDivElement>) => {
    const { x, y } = calculateCoords(event, figuresRef);
    const [figureName, axisY, axisX] = event.dataTransfer.getData('text').split(', ');
    if (chessState.candidateMoves?.find((m: number[]) => m[0] === y && m[1] === x)) {
      const opponent = figureName.slice(0, 5) === 'white' ? 'black' : 'white';
      const castleDirection = chessState.castleDirection[opponent];
      if ((figureName === 'white-pawn' && y === 7) || (figureName === 'black-pawn' && y === 0)) {
        openPromotionBox({ axisY, axisX, y, x });
      }
      if (figureName.slice(6) === 'rook' || figureName.slice(6) === 'king') {
        updateCastlingState({ figureName, axisY, axisX });
      }
      const newPosition = arbiter.performMove({
        currentPosition,
        figureName, axisY, axisX,
        y, x
      });

      const newMove = getNewMoveNotation({ figureName, axisY, axisX, y, x, currentPosition });

      dispatch(makeNewMove({ newPosition, newMove }));

      if (arbiter.insufficientMaterial(newPosition)) dispatch(detectInsufficientMaterial());
      if (arbiter.isStalemate(newPosition, opponent, castleDirection)) dispatch(detectStalemate());
      if (arbiter.isCheckMate(newPosition, opponent, castleDirection)) dispatch(detectCheckMate(figureName.slice(0, 5)));
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