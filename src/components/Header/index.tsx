import styles from './styles.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export default function Header () {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  });

  return (
  <header className={styles.headerContainer}>
    <img src="/logo.svg" alt="Podcastr logo"/>
    <p>O melhor para você ouvir, sempre</p>

    {/*Formato: Qui, 8 Abril */}
    <span>{currentDate}</span>
  </header>
  )
}

