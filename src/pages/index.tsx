// SPA
// SSR
// SSG

import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    // Metodo para fetch de SPA. Tem como desvantagem que os dados são recebidos
    //apenas quando o usuário acessa a aplicação, dessa forma essas informações
    //não estarão disponívels para uma web-crawler por exemplo.
    fetch('http://localhost:3333/episodes')
      .then(response => response.json())
      .then(data => console.log(data));
  }, [])

  return (
      <h1>Index</h1>
    )
}

// Medodo SSR. A funcção getServerSideProps indica que a requisição deve ser realizada
//antes da renderização de qualquer componente.
export async function getServerSidePros() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    }
  }
}