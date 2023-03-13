import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import CharacterDetailsPage from "./pages/CharacterDetailsPage/CharacterDetailsPage";
import CharactersListPage from "./pages/CharactersListPage/CharactersListPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import { IUser } from "./types/user";

const App = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const logOut = () => {
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const authedUser = JSON.parse(localStorage.getItem("user")!);
      setUser(authedUser);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <>
      <Header user={user} onLogOut={logOut} />
      <Routes>
        <Route path="/" element={<CharactersListPage />} />
        <Route path="/:id" element={<CharacterDetailsPage />} />
        <Route path="/sign-in" element={<AuthPage onSetUser={setUser} />} />
        <Route path="/sign-up" element={<AuthPage onSetUser={setUser} />} />
      </Routes>
    </>
  );
};

export default App;
