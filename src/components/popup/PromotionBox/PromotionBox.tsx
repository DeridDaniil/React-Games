import { useChessContext } from '../../../providers/context/ChessContext';
import { clearCandidates, makeNewMove } from '../../../providers/reducer/actions/move';
import './PromotionBox.scss';

type TPromotionBox = {
  onClosePopup: () => void; 
}

const PromotionBox = ({ onClosePopup }: TPromotionBox) => {
  const options = ['queen', 'rook', 'bishop', 'knight'];
  const { chessState, dispatch } = useChessContext();
  const { promotionSquare } = chessState;

  if (!promotionSquare) return null;

  const color = promotionSquare.y === 7 ? 'white' : 'black';

  const getPromotionBoxPosition = () => {
    const style = { top: '', left: '', right: '' };

    if (promotionSquare.y === 7) style.top = '-14%';
    else style.top = '101%';

    if (promotionSquare.x <= 1) style.left = '0%';
    else if (promotionSquare.x >= 6) style.right = '0%';
    else style.left = `${12.5 * promotionSquare.x - 20}%`

    return style;
  }

  const onClick = (option: string) => {
    onClosePopup();
    const newPosition: string[][] = chessState.position[chessState.position.length - 1].map((row: string[]) => row.map(x => x));
    newPosition[promotionSquare.axisY][promotionSquare.axisX] = '';
    newPosition[promotionSquare.y][promotionSquare.x] = color + '-' + option;

    dispatch(clearCandidates());
    dispatch(makeNewMove({ newPosition }));
  }

  return (
    <div className='popup-inner promotion-choices' style={getPromotionBoxPosition()}>
      {options.map((option: string) => (
        <div
          key={option}
          className={`figure ${color}-${option}`}
          onClick={() => onClick(option)}
        />
      ))}
    </div>
  )
};

export default PromotionBox;