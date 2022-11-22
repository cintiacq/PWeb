import { useRouter } from "next/router";
import useSWR from "swr";

async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

export default function ListMovies() {
    const router = useRouter();
    const { id } = router.query;
    
    const { data, error } = useSWR(
      `https://www.omdbapi.com/?apikey=2f9b03c7&i=${id}`,
      fetcher
    );

    console.log(data)
  
    if (error) return <div>Falha na requisição!</div>;
    return (
        <section >
          <div >
            <div >
              {!data ? (
                <div><p>Carregando...</p></div>
              ) : (
                <div >
                  <img src={data.Poster} alt='' />
                  <div >
                    <h1 >
                      {data.Title} ({data.Year})
                    </h1>
                    <p >Direção: {data.Director || '-'}</p>
                    <p >Duração: {data.Runtime || '-'}</p>
                    <p >Idioma: {data.Language || '-'}</p>
                    <p >Gênero: {data.Genre || '-'}</p>
                    <p >Enredo: {data.Plot || '-'}</p>
                    <p >Bilheteria: {data.BoxOffice || '-'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      );
}

