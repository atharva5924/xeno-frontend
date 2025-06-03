export const exerciseOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    "x-rapidapi-key": "c4ce6edc51mshab501bf058b1fd3p159728jsn16210838a87a",
  },
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "youtube-search-and-download.p.rapidapi.com",
    "x-rapidapi-key": "c4ce6edc51mshab501bf058b1fd3p159728jsn16210838a87a",
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
