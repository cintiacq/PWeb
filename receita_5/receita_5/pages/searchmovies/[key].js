import useSWR from "swr";
import { useRouter } from "next/router";

async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

export default function SeachMovieFind() {
    const router = useRouter();
    const { key } = router.query;
    
    const { data, error } = useSWR(
      `https://www.omdbapi.com/?apikey=2f9b03c7&i=${key}`,
      fetcher
    );

	return (
		<div>
		</div>
	);
}
