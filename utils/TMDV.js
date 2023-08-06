const fetchMovieData = async (query) => {
  try {
    const res = await fetch(`/api/find_movie?query=${query}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch movie data ${error}`);
    throw new Error(error);
  }
}

const fetchMovieDetailData = async (id) => {
  try {
    const res = await fetch(`/api/get_movie_detail?id=${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch movie detail data ${error}`);
    throw new Error(error);
  }
}

const fetchMovieCreditsData = async (id) => {
  try {
    const res = await fetch(`/api/get_movie_credits?id=${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch movie credits data ${error}`);
    throw new Error(error);
  }
}

const fetchMovieTitle = async (id) => {
  try {
    const res = await fetch(`/api/get_movie_title?id=${id}`);
    const data = await res.json();
    const titleObj = data.titles.find((v) => v.iso_3166_1 === "JP");

    if (!titleObj) {
      return ""
    }

    return titleObj.title;

  } catch (error) {
    console.error(`Failed to fetch movie title ${error}`);
    throw new Error(error);
  }
}

const fetchDramaData = async (query) => {
  try {
    const res = await fetch(`/api/find_drama?query=${query}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch drama data ${error}`);
    throw new Error(error);
  }
}

const fetchDramaDetailData = async (id) => {
  try {
    const res = await fetch(`/api/get_drama_detail?id=${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch drama detail data ${error}`);
    throw new Error(error);
  }
}

const fetchDramaCreditsData = async (id) => {
  try {
    const res = await fetch(`/api/get_drama_credits?id=${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch drama credits data ${error}`);
    throw new Error(error);
  }
}

const fetchDramaTitle = async (id) => {
  try {
    const res = await fetch(`/api/get_drama_title?id=${id}`);
    const data = await res.json();
    const titleObj = data.results.find((v) => v.iso_3166_1 === "JP");

    if (!titleObj) {
      return ""
    }

    return titleObj.title;
  } catch (error) {
    console.error(`Failed to fetch drama title ${error}`);
    throw new Error(error);
  }
}


const fetchAllSeasonData = async (id, n) => {
  try {
    const promises = [];
    for (let i = 1; i <= n; i++) {
      promises.push(fetch(`/api/get_season_data?id=${id}&i=${i}`).then(res => res.json()));
    }
    const seasons = await Promise.all(promises);

    const data = seasons.map(season_i => ({
      name: season_i.name,
      air_date: season_i.air_date,
      num_episode: season_i.episodes.length,
      episodes: season_i.episodes.map((v) => ({ name: v.name })),
      poster_path: season_i.poster_path,
    }));

    console.log(data)

    return data;
  } catch (error) {
    console.error(`Failed to fetch all season data ${error}`);
    throw new Error(error);
  }
}



export {
  fetchMovieData,
  fetchMovieDetailData,
  fetchMovieCreditsData,
  fetchMovieTitle,
  fetchDramaData,
  fetchDramaDetailData,
  fetchDramaCreditsData,
  fetchDramaTitle,
  fetchAllSeasonData
}