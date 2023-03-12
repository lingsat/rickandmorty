import { FC } from "react";
import "./InfoItem.scss";

interface InfoItemProps {
  category: string;
  value: string;
}

const InfoItem: FC<InfoItemProps> = ({ category, value }) => {
  return (
    <div className="infoitem">
      <h5 className="infoitem__category">{category}</h5>
      <p className="infoitem__value">{value}</p>
    </div>
  );
};

export default InfoItem;
