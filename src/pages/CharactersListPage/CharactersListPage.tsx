import { ChangeEvent, FC, useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import logo from "../../assets/images/logo.png";
import searchIcon from "../../assets/images/search.svg";
import "./CharactersListPage.scss";
import CardItem from "../../components/CardItem/CardItem";
import { ICharacter, ICharactersResponse } from "../../types/charactersRes";
import ReactPaginate from "react-paginate";

interface CharactersListPageProps {}

const CharactersListPage: FC<CharactersListPageProps> = ({}) => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [searchName, setSearchName] = useState<string>(
    localStorage.getItem("searchKeyWord") || ""
  );
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pagesCount, setPagesCount] = useState<number>(1);

  // Need refactoring - too much rerendering
  const fetchCharacters = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/?page=${currentPage + 1}&name=${searchName}`
      );
      const data: ICharactersResponse = await response.json();
      if (data.results) {
        const sortedCharactersArr: ICharacter[] = data.results.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCharacters(sortedCharactersArr);
        setPagesCount(data.info.pages);
      } else {
        setCharacters([]);
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log(error.error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearchName(e.target.value);
    localStorage.setItem("searchKeyWord", e.target.value);
  };

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  }

  useEffect(() => {
    // Debouncing
    if (!characters.length) {
      fetchCharacters();
    } else {
      const getFilteredData = setTimeout(fetchCharacters, 500);
      return () => clearTimeout(getFilteredData);
    }
  }, [searchName, currentPage]);

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
        {!characters.length && !isLoading && (
          <p style={{ textAlign: "center" }}>No characters found</p>
        )}
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
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pagesCount}
          previousLabel="<"
          initialPage={currentPage}
          containerClassName='pagination'
          activeLinkClassName='active__page'
        />
      </Container>
    </div>
  );
};

export default CharactersListPage;
