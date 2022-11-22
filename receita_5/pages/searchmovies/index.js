import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";

async function theFetcher(url) {
	if (url === null || url === "") return { Search: "" };
	const res = await fetch(url);
	const json = await res.json();
	return json;
}

export default function Movies3() {
    const router = useRouter()
	const onClickHandler = (e) => {
		e.preventDefault();
        
		const search = document.getElementById('search-field').value
    
        router.push(`/searchmovies/${search}`);
	};

	return (
		<div>
			<form>
				<input id="search-field" type="text"></input>
				<button type="submit" onClick={onClickHandler}>
					Buscar
				</button>
			</form>
		</div>
	);
}