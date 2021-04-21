import styles from './styles.module.scss';

export default function Player() {
  return (
    <div className={styles.playerContainer}>
        <header>
          <img src="/playing.svg" alt="Tocando Agora"/>
          <strong>Tocando agora</strong>
        </header>

        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>

        <footer className={styles.empty}>
          <div className={styles.progress}>
            <span>00:00</span>
            <div className={styles.slider}>
              <div className={styles.emptySlider}></div>
            </div>
            <span>00:00</span>
          </div>

          <div className={styles.buttons}>
            <button type="button">
              <img src="/shuffle.svg" alt="Botão shuffle"/>
            </button>
            <button type="button">
              <img src="/play-previous.svg" alt="Botão tocar anterior"/>
            </button>
            <button type="button">
              <img src="/play.svg" alt="Botão tocar"/>
            </button>
            <button type="button">
              <img src="/play-next.svg" alt="Botão trocar próxima"/>
            </button>
            <button type="button">
              <img src="/repeat.svg" alt="Botão repetir"/>
            </button>
          </div>
        </footer>
    </div>
  )
};
