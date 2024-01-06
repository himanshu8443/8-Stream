import Catalogue from "@/components/Home/Catalogue";
import Hero from "@/components/Home/Hero";

async function getData() {
  try {
    const resTendingMovies = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?include_adult=true&api_key=${process.env.TMDB_KEY}`
    );
    const resTendingTV = await fetch(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.TMDB_KEY}`
    );
    const resDiscoverBollywoodMovies = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_original_language=hi`
    );
    const resDiscoverTv = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`
    );

    const tendingMovies = await resTendingMovies.json();
    const tendingTV = await resTendingTV.json();
    const DiscoverBollywoodMovies = await resDiscoverBollywoodMovies.json();
    const DiscoverTv = await resDiscoverTv.json();

    return {
      tendingMovies,
      tendingTV,
      DiscoverBollywoodMovies,
      DiscoverTv,
    };
  } catch (error) {
    console.log(error);
    return {
      tendingMovies: [],
      tendingTV: [],
      DiscoverBollywoodMovies: [],
      DiscoverTv: [],
    };
  }
}

export default async function Page() {
  const data = await getData();
  const hero =
    data.tendingMovies?.results?.[
      Math.floor(Math.random() * data.tendingMovies?.results?.length || 0)
    ];
  return (
    <main>
      <Hero hero={hero} />
      <Catalogue data={data} />
    </main>
  );
}
