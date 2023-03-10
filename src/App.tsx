import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import CharacterDetailsPage from './pages/CharacterDetailsPage/CharacterDetailsPage';
import CharactersListPage from './pages/CharactersListPage/CharactersListPage';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<CharactersListPage />} />
        <Route path='/:id' element={<CharacterDetailsPage />} />
      </Routes>
    </>
  );
};

export default App;
