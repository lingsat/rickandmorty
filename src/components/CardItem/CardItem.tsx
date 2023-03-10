import { FC } from 'react';
import "./CardItem.scss";

interface CardItemProps {}

const CardItem: FC<CardItemProps> = ({}) => {
  return (
    <div className='carditem'>
      <img src="https://place-hold.it/300" alt="item" className='carditem__img' />
        <div className="carditem__info">
        <h3 className='carditem__name'>Rick Sanchez</h3>
        <p className='carditem__specie'>Human</p>
      </div>
    </div>
  )
};

export default CardItem;
