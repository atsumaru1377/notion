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
    const titleObj = data.titles.find((v) => v.iso_3166_1 === "JP").title;

    if (!titleObj) {
      return ""
    }

    return titleObj;

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
  const data = [];
  for (let i = 1; i <= n; i++) {
    const res = await fetch(`/api/get_season_data?id=${id}&i=${i}`);
    const season_i = await res.json();
    data.push(
      {
        object: "block",
        type: "toggle",
        toggle:{
          rich_text: [
            {
              type: "text",
              text: {
                content: season_i.name
              }
            }
          ],
          children: [
            {
              object: "block",
              type: "image",
              image: {
                type: "external",
                external: {
                  url: `https://image.tmdb.org/t/p/original${season_i.poster_path}`
                }
              }
            },
            {
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: [
                  {
                    type: "text",
                    text: {
                      content: season_i.air_date
                    }
                  }
                ]
              }
            },
            ... season_i.episodes.map((v) => (
              {
                object: "block",
                type: "numbered_list_item",
                numbered_list_item: {
                  rich_text: [
                    {
                      type: "text",
                      text: {
                        content: v.name
                      }
                    }
                  ]
                }
              }
            ))
          ]
        },
      }
    )
  }
  return data;
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