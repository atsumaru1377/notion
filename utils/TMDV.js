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
    return data.titles.find((v) => v.iso_3166_1 === "JP").title;
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

export {
  fetchMovieData,
  fetchMovieDetailData,
  fetchMovieCreditsData,
  fetchMovieTitle,
  fetchDramaData,
  fetchDramaDetailData,
}