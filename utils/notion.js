import { fetchMovieDetailData, fetchMovieCreditsData, fetchMovieTitle } from "./TMDV";
const writeMovieDatabase = async (id) => {
    const detail = await fetchMovieDetailData(id);
    const credit = await fetchMovieCreditsData(id);
    const title_jp = await fetchMovieTitle(id);
    try {
        const res = await fetch(`/api/write_movie_database`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ detail, title_jp, credit })
        });
        console.log(res);
        return;
    } catch (error) {
        console.error(`Failed to write movie data ${error}`);
        throw new Error(error);
    }
}

export {
    writeMovieDatabase,
}