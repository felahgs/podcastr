import {useMediaQuery} from 'react-responsive';

import Header from '../components/Header';
import Player from '../components/Player';
import {PlayerContextProvider} from '../contexts/PlayerContext';

import '../styles/global.scss';
import styles from '../styles/app.module.scss';


function MyApp({ Component, pageProps }) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 768 })

  return(
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
