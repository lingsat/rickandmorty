import { ChangeEvent, FC, useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import logo from "../../assets/images/logo.png";
import searchIcon from "../../assets/images/search.svg";
import "./CharactersListPage.scss";
import CardItem from "../../components/CardItem/CardItem";
import { ICharacter, ICharactersResponse } from "../../types/charactersRes";

interface CharactersListPageProps {}

const CharactersListPage: FC<CharactersListPageProps> = ({}) => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [searchName, setSearchName] = useState<string>(
    localStorage.getItem("searchKeyWord") || ""
  );

  const fetchCharacters = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${searchName}`
      );
      const data: ICharactersResponse = await response.json();
      if (data.results) {
        const sortedCharactersArr: ICharacter[] = data.results.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCharacters(sortedCharactersArr);
      } else {
        setCharacters([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
    localStorage.setItem("searchKeyWord", e.target.value);
  };

  useEffect(() => {
    fetchCharacters();
  }, [searchName]);

  return (
    <div className="characters">
      <Container>
        <img src={logo} alt="RickAndMorty" className="characters__img" />
        <form className="characters__form">
          <input
            type="text"
            placeholder="Filter by name..."
            className="characters__filter"
            onChange={(e) => handleInputChange(e)}
            value={searchName}
          />
          <img
            src={searchIcon}
            alt="Search"
            className="characters__searchicon"
          />
        </form>
        <div className="characters__list">
          {characters.map((character: ICharacter) => (
            <CardItem
              key={`character-${character.id}`}
              id={character.id}
              name={character.name}
              imgUrl={character.image}
              specie={character.species}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CharactersListPage;
