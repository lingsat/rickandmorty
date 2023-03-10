import { FC, useState } from "react";
import Container from "../../components/Container/Container";
import logo from "../../assets/images/logo.png";
import searchIcon from "../../assets/images/search.svg";
import "./CharactersListPage.scss";
import CardItem from '../../components/CardItem/CardItem';

interface CharactersListPageProps {}

const CharactersListPage: FC<CharactersListPageProps> = ({}) => {
  const [characters, setCharacters] = useState(['1', '2', '3', '4', '5', '6', '7', '8']);

  return (
    <div className="characters">
      <Container>
        <img src={logo} alt="RickAndMorty" className="characters__img" />
        <form className="characters__form">
          <input
            type="text"
            placeholder="Filter by name..."
            className="characters__filter"
          />
          <img
            src={searchIcon}
            alt="Search"
            className="characters__searchicon"
          />
        </form>
        <div className='characters__list'>
          {characters.map(character => (
            <CardItem />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CharactersListPage;
