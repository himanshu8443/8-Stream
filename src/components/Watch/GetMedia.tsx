import Options from "./Options";
async function getMediaInfo(id: string) {
  try {
    const res = await fetch(
      `https://hayasaka-stream.fr.to/api/v1/mediaInfo?id=${id}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const GetMedia = async ({
  ids,
  tmdbSeasons,
  type,
}: {
  ids: {
    tmdb: string;
    imdb: string;
  };
  tmdbSeasons: any;
  type: string;
}) => {
  const mediaInfo = await getMediaInfo(ids?.imdb);
  return <div></div>;
};

export default GetMedia;
