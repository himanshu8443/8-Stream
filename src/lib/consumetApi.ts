"use server";

// get media info
export async function getConsumetMediaInfo(id: string, type: string) {
  try {
    const res = await fetch(
      `${process.env.CONSUMET_API}/meta/tmdb/info/${id}?type=${type}`
    );
    const data = await res.json();
    // console.log(data);
    if (data?.seasons?.length <= 0) {
      return { success: false, error: "No season found" };
    }
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}

// play
export async function consumetPlay(
  id: string,
  type: string,
  episode: number = 1,
  season: number = 1
) {
  try {
    const mediaInfo = await getConsumetMediaInfo(id, type);
    if (!mediaInfo.success) return { success: false, error: mediaInfo.error };
    if (type === "movie") {
      const res = await fetch(
        `${process.env.CONSUMET_API}/meta/tmdb/watch/${mediaInfo.data.episodeId}?id=${mediaInfo.data.id}`
      );
      const data = await res.json();
      // console.log(data);
      return { success: true, data };
    } else {
      const seasonInfo = mediaInfo.data.seasons[season - 1];
      const episodeInfo = seasonInfo.episodes[episode - 1];
      const episodeId = episodeInfo.id;
      const res = await fetch(
        `${process.env.CONSUMET_API}/meta/tmdb/watch/${episodeId}?id=${mediaInfo.data.id}`
      );
      const data = await res.json();
      // console.log(data);
      return { success: true, data };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}
