import { fetchMovieDetailData, fetchMovieCreditsData, fetchMovieTitle, fetchDramaDetailData, fetchDramaCreditsData, fetchDramaTitle, fetchAllSeasonData } from "./TMDV";
const writeMovieDatabase = async (id) => {
    const detail = await fetchMovieDetailData(id);
    const credit = await fetchMovieCreditsData(id);
    const title_jp = await fetchMovieTitle(id);
    const properties = {
        Title : {
            title: [
                {
                    text: {
                        content: detail.title
                    }
                }
            ]
        },
        Genre : {
            multi_select: detail.genres.map((v) => ({name : v.name}))
        },
        "Title (Japanese)" : {
            rich_text: [
                {
                    text: {
                        content: title_jp
                    }
                }
            ]
        },
        "Release Date" : {
            date: {
                start: detail.release_date
            }
        },
        Year : {
            select: {
                name: detail.release_date.slice(0, 4)
            }
        },
        Director : {
            multi_select:
                credit.crew
                    .filter((v) => v.job === "Director")
                    .map((v) => ({name : v.name}))
        },
        "Cast/Actor" : {
            multi_select:
                credit.cast
                    .slice(0, 5)
                    .map((v) => ({name : v.name, color: "green"}))
        },
        Duration : {
            number: detail.runtime
        },
        Type : {
            select : {
                name: "Movie"
            }
        },
        "Production Company" : {
            multi_select:
                detail.production_companies
                    .map((v) => ({name : v.name}))
        },
        Series : {
            select: {
                name: detail.belongs_to_collection.name
            }
        },
        Watched : {
            checkbox: true
        },
        Recommend : {
            checkbox: false
        },
        TMDB_id : {
            number: detail.id
        },
        Reference : {
            url: detail.homepage ? detail.homepage : null
        },
        TMDB_rating : {
            number: detail.vote_average
        }
    };
    const poster = `https://image.tmdb.org/t/p/original${detail.poster_path}`
    const cover = `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
    const children = [
        {
            object: "block",
            type: "image",
            image: {
                type: "external",
                external: {
                    url: poster
                }
            }
        }
    ];

    try {
        const res = await fetch(`/api/write_movie_database`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ properties, poster, cover, children }),
        });
        console.log(res);
        return;
    } catch (error) {
        console.error(`Failed to write movie data ${error}`);
        throw new Error(error);
    }
}

const writeDramaDatabase = async (id) => {
    const detail = await fetchDramaDetailData(id);
    const credit = await fetchDramaCreditsData(id);
    const title_jp = await fetchDramaTitle(id);

    const properties = {
        Title : {
            title: [
                {
                    text: {
                        content: detail.name
                    }
                }
            ]
        },
        Genre : {
            multi_select: detail.genres.map((v) => ({name : v.name}))
        },
        "Title (Japanese)" : {
            rich_text: [
                {
                    text: {
                        content: title_jp
                    }
                }
            ]
        },
        "Release Date" : {
            date: {
                start: detail.first_air_date
            }
        },
        Year : {
            select: {
                name: detail.first_air_date.slice(0, 4)
            }
        },
        Director : {
            multi_select:
                detail.created_by
                    .map((v) => ({name : v.name}))
        },
        "Cast/Actor" : {
            multi_select:
                credit.cast
                    .slice(0, 5)
                    .map((v) => ({name : v.name, color: "green"}))
        },
        Duration : {
            number: detail.episode_run_time[0] || 0
        },
        Type : {
            select : {
                name: "TV Drama"
            }
        },
        "Production Company" : {
            multi_select:
                detail.production_companies
                    .map((v) => ({name : v.name}))
        },
        Watched : {
            checkbox: true
        },
        Recommend : {
            checkbox: false
        },
        TMDB_id : {
            number: detail.id
        },
        Reference : {
            url: detail.homepage ? detail.homepage : null
        },
        TMDB_rating : {
            number: detail.vote_average
        },
    };
    const poster = `https://image.tmdb.org/t/p/original${detail.poster_path}`
    const cover = `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
    const seasons = await fetchAllSeasonData(id, detail.number_of_seasons);
    const children = [
        {
            object: "block",
            type: "image",
            image: {
                type: "external",
                external: {
                    url: poster
                }
            }
        },
    ];

    try {
        const res = await fetch(`/api/write_drama_database`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ properties, cover, children, seasons })
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
    writeDramaDatabase,
}