import Link from "next/link";
import useSWR from "swr";

export default function Movies2() {
  const { data } = useSWR(
    `http://www.omdbapi.com/?apikey=e10b7a04&s=bagdad`,
    fetcher
  );
  
  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h2>Filmes encontrados:</h2>
      {data.Search.map((m) => (
        <div>
          <Link
              href={`/onemovie/${m.imdbID}`}
                    className='text-decoration-none'
                  >
                    <p>{m.Title}</p>
                  </Link>
        </div>
      ))}
    </div>
  );
}

async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}
