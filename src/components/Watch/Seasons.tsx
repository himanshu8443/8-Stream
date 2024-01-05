const Seasons = ({
  ids,
  season,
  api,
  lang,
}: {
  ids?: {
    tmdb: string;
    imdb: string;
  };
  season?: number;
  api?: string;
  lang?: string;
  setLangOptions?: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return <div>id {ids?.tmdb}</div>;
};

export default Seasons;
