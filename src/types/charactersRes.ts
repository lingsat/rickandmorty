export interface ICharactersResponse {
  info: IInfo;
  results: ICharacter[];
}

interface IInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
