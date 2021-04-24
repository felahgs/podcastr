import { type } from 'node:os';
import { createContext, useState } from 'react'

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
export const PlayerContext = createContext({} as PlayerContextData); //Dessa forma o objeto é construído no formato definido pelo type

export function PlayerContextProvider({ children }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  
    function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider value={ {episodeList, currentEpisodeIndex, isPlaying, play, togglePlay, setPlayingState} }>
      {children}
    </PlayerContext.Provider>
  )
}
