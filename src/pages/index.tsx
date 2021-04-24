import { useContext } from "react";
import { GetStaticProps } from "next";
import Image from 'next/image';
import Link from 'next/link';
import ptBR from 'date-fns/locale/pt-BR';
import { format, parseISO } from 'date-fns';

import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";
import { PlayerContext } from "../contexts/PlayerContext";

import styles from './home.module.scss';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
  // ...
}

type HomeProps = {
  latestEpisodes: Episode[]
  allEpisodes: Episode[]
  // episodes: Array<Episode> -- Também é válido

}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  //   // Metodo para fetch de SPA tem como desvantagem de que os dados são recebidos
  //   //apenas quando o usuário acessa a aplicação, dessa forma essas informações
  //   //não estarão disponívels para uma web-crawler não tendo um bom SEO por exemplo.
  // useEffect(() => {
  //   fetch('http://localhost:3333/episodes')
  //     .then(response => response.json())
  //     .then(data => console.log(data));
  // }, [])

  const { play } = useContext(PlayerContext);

  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Ultimos Lançamentos</h2>

        <ul>
          {latestEpisodes.map(episode => {
            return (
              <li key={episode.id}>
                <Image 
                  width={192} 
                  height={192} 
                  src={episode.thumbnail} 
                  alt={episode.title} 
                  objectFit="cover"
                />

                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a >{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button" onClick={() => play(episode)}>
                  <img src="/play-green.svg" alt="Reproduzir episódio." />
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map(episode => {
              return (
                <tr key={episode.id}>
                  <td style={{width: 72}}>
                    <Image 
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a >{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100}}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="Reproduzir episódio"/>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

// Medodo SSR (Server Side Render). A funcção getServerSideProps indica que a requisição deve ser realizada
// export async function getServerSideProps() {
//   // Todas as props de getServerSideProps são repassadas para o comonente
//   //principal
//       const response = await fetch('http://localhost:3333/episodes')
//       const data = await response.json()

//     return {
//       props: { //Deve sermpre retornar um props como em getServerSideProps
//         episodes: data,
//       }
//     }
// }

// Metodo SSG (Static Site Generator) para comunicação com a API. dessa forma, a request
//sera realizada apenas quando o conteúdo no backend for alterado. Assim, depois de uma
//requisição do cliente, os mesmos dados serão mantidos e repassados para outros, até haver
//uma atualização.
export const getStaticProps: GetStaticProps = async () => {
  // Todas as props de getServerSideProps são repassadas para o componente
  //principal

  // const response = await fetch('http://localhost:3333/episodes?_limit=12&sort=published_at&_order=desc')

  // Como nós temos uma baseURL definida em 'api' o prefixo http://localhost:3333/ não é necessário
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      duration: Number(episode.file.duration),
      description: episode.description,
      url: episode.file.url,
    }
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: { //Deve sempre retornar um props como em getServerSideProps
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8,
  }
}