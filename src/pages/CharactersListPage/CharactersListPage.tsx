import { ChangeEvent, FC, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import CardItem from "../../components/CardItem/CardItem";
import Container from "../../components/Container/Container";
import { ICharacter, ICharactersResponse } from "../../types/charactersRes";
import searchIcon from "../../assets/images/search.svg";
import logo from "../../assets/images/logo.png";
import "./CharactersListPage.scss";

interface CharactersListPageProps {}

const CharactersListPage: FC<CharactersListPageProps> = ({}) => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [searchName, setSearchName] = useState<string>(
    localStorage.getItem("searchKeyWord") || ""
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pagesCount, setPagesCount] = useState<number>(1);

  const fetchCharacters = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/?page=${
          currentPage + 1
        }&name=${searchName}`
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
        setPagesCount(1);
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log(error.error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearchName(e.target.value);
    localStorage.setItem("searchKeyWord", e.target.value);
  };

  const handlePageChange = (event: any) => {
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    // Debouncing
    if (!characters.length) {
      fetchCharacters();
    } else {
      const getFilteredData = setTimeout(fetchCharacters, 250);
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
        {!characters.length && !isLoading && (
          <p style={{ textAlign: "center" }}>No characters found</p>
        )}
        {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
        {!isLoading && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageChange}
            pageRangeDisplayed={3}
            pageCount={pagesCount}
            previousLabel="<"
            initialPage={currentPage}
            containerClassName="pagination"
            activeLinkClassName="active__page"
          />
        )}
      </Container>
    </div>
  );
};

export default CharactersListPage;
