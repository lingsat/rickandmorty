import { FC } from "react";
import { Link } from "react-router-dom";
import "./CardItem.scss";

interface CardItemProps {
  id: number;
  name: string;
  imgUrl: string;
  specie: string;
}

const CardItem: FC<CardItemProps> = ({ id, name, imgUrl, specie }) => {
  return (
    <Link to={`/${id}`} className="carditem">
      <img src={imgUrl} alt="Character Avatar" className="carditem__img" />
      <div className="carditem__info">
        <h3 className="carditem__name">{name}</h3>
        <p className="carditem__specie">{specie}</p>
      </div>
    </Link>
  );
};

export default CardItem;
