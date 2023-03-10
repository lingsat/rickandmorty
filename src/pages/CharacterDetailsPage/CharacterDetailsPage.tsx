import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import arrowBack from "../../assets/images/arrowBack.svg";
import "./CharacterDetailsPage.scss";
import { ICharacter } from "../../types/charactersRes";

interface CharacterDetailsPageProps {}

const CharacterDetailsPage: FC<CharacterDetailsPageProps> = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleCharacter, setSingleCharacter] = useState<ICharacter>();

  const fetchSingleCharacter = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
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

  // if (!singleCharacter) {
  //   return <p style={{textAlign: 'center'}}>Loading...</p>;
  // }

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
          <div className="info__item">
            <h5 className="info__category">Gender</h5>
            <p className="info__value">{singleCharacter?.gender}</p>
          </div>
          <div className="info__item">
            <h5 className="info__category">Status</h5>
            <p className="info__value">{singleCharacter?.status}</p>
          </div>
          <div className="info__item">
            <h5 className="info__category">Specie</h5>
            <p className="info__value">{singleCharacter?.species}</p>
          </div>
          <div className="info__item">
            <h5 className="info__category">Origin</h5>
            <p className="info__value">{singleCharacter?.origin.name}</p>
          </div>
          <div className="info__item">
            <h5 className="info__category">Type</h5>
            <p className="info__value">{singleCharacter?.type || "Unknown"}</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CharacterDetailsPage;
