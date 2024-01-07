"use server";

export async function getEpisodes(id: string, season: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${process.env.TMDB_KEY}`
  );
  const data = await response.json();
  return data.episodes;
}

// get available episodes
export async function getAvailableEpisodes(id: string, season: number) {
  const response = await fetch(
    `${process.env.STREAM_API}/getEpisodes?id=${id}&season=${season}&lang=1`
  );
  const data = await response.json();
  return data;
}

// get stream url
export async function getStreamUrl(
  id: string,
  episode: number,
  lang: number,
  season: number
) {
  const response = await fetch(
    `${process.env.STREAM_API}/getStream?id=${id}&season=${season}&episode=${episode}&lang=${lang}`
  );
  const data = await response.json();
  return data;
}
