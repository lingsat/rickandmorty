import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import arrowBack from "../../assets/images/arrowBack.svg";
import { ICharacter } from "../../types/charactersRes";
import "./CharacterDetailsPage.scss";
import InfoItem from "../../components/InfoItem/InfoItem";

interface CharacterDetailsPageProps {}

const CharacterDetailsPage: FC<CharacterDetailsPageProps> = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleCharacter, setSingleCharacter] = useState<ICharacter>();

  const fetchSingleCharacter = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${id}`
      );
      const data: ICharacter = await response.json();
      setSingleCharacter(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleCharacter();
  }, []);

  return (
    <div className="details">
      <Container>
        <button className="details__btn--back" onClick={() => navigate(-1)}>
          <img src={arrowBack} alt="backArrow" />
          GO BACK
        </button>
        <img
          src={singleCharacter?.image}
          alt={`${singleCharacter?.name} avatar`}
          className="details__img"
        />
        <h2 className="details__name">{singleCharacter?.name}</h2>
        <h4 className="details__subtitle">Informations</h4>
        <div className="info">
          <InfoItem
            category="Gender"
            value={singleCharacter?.gender || "Unknown"}
          />
          <InfoItem
            category="Status"
            value={singleCharacter?.status || "Unknown"}
          />
          <InfoItem
            category="Specie"
            value={singleCharacter?.species || "Unknown"}
          />
          <InfoItem
            category="Origin"
            value={singleCharacter?.origin.name || "Unknown"}
          />
          <InfoItem
            category="Type"
            value={singleCharacter?.type || "Unknown"}
          />
        </div>
      </Container>
    </div>
  );
};

export default CharacterDetailsPage;
