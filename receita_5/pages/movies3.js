import useSWR from 'swr';
import { useState } from 'react';
import Link from 'next/link';

export default function Movies3() {
  const [url, setUrl] = useState('');
  const { data, error } = useSWR(url, theFetcher);
  const onClickHandler = (e) => {
    e.preventDefault();
    if (url === '')
      setUrl(
        `https://www.omdbapi.com/?apikey=e10b7a04&s=bagdad`
      );
    else setUrl('');
  };

  return (
    <main >
      <div >
        <div >
          <TheLink url={url} handler={onClickHandler} />
          <TheMovies
            data={
              error
                ? { error: 'Erro na pesquisa' }
                : data
                ? data
                : { Search: '' }
            }
            show={url !== ''}
          />
        </div>
      </div>
    </main>
  );
}

async function theFetcher(url) {
  if (url === null || url === '') return { Search: '' };
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

export function TheMovies({ data, show }) {
  if (!show) return <div></div>;
  if (data.error) return <div>falha na requisição</div>;
  if (data.Search === '') return <div>carregando...</div>;

  return (
    <section className='container'>
      <div className='row'>
        <div className='col p-0 mt-3'>
          <h2>Filmes encontrados:</h2>
          <ul className='list-group'>
            {data.Search.map((m) => (
              <li className='list-group-item'>
                <Link href={`/onemovie/${m.imdbID}`}>
                  <p>{m.Title} ({m.Year})</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function TheLink({ url, handler }) {
  return (
    <a href='/movies3.js' onClick={handler} className='btn btn-primary'>
      {' '}
      {url === '' ? 'Mostrar' : 'Ocultar'}{' '}
    </a>
  );
}