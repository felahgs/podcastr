import { type } from 'node:os';
import { createContext } from 'react'

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void;
  togglePlay: () => void;
}

// Em PlayerContext é declarado apenas o formato dos dados. O estado inicial caso
//nenhum contexto seja definido no wrapper
const PlayerContext = createContext({} as PlayerContextData); //Dessa forma o objeto é construído no formato definido pelo type

export default PlayerContext
