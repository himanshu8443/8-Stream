import Image from "next/image";
import Link from "next/link";

async function getData(heroId: string) {
  try {
    const resHero = await fetch(
      `https://api.themoviedb.org/3/movie/${heroId}/images?api_key=${process.env.TMDB_KEY}&language=en-US&include_image_language=en,null`,
      {
        next: { revalidate: 300 },
      }
    );
    const hero = await resHero.json();
    return {
      hero,
    };
  } catch (error) {
    console.log(error);
    return {
      hero: [],
    };
  }
}

const Hero = async ({ hero }: { hero: any }) => {
  const data = await getData(hero?.id);

  return (
    <div className="relative flex justify-start items-center">
      <Image
        unoptimized={true}
        className="object-cover w-full h-[500px] lg:h-[600px]"
        src={`https://image.tmdb.org/t/p/original${
          data.hero?.backdrops?.[
            Math.floor(Math.random() * data.hero?.backdrops?.length || 0)
          ]?.file_path
        }`}
        alt={"hero"}
        width={1920}
        height={1080}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black to-transparent"></div>

      <div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-start items-center">
          <div className="ml-12 ">
            {data.hero?.logos?.length > 0 ? (
              <Image
                unoptimized={true}
                className="object-contain w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]"
                src={`https://image.tmdb.org/t/p/original${data.hero?.logos[0]?.file_path}`}
                alt={"hero"}
                width={1920}
                height={1080}
              />
            ) : (
              <h1 className="text-white text-4xl lg:text-6xl font-semibold">
                {hero?.title}
              </h1>
            )}
            <p className="text-white text-sm lg:text-base font-medium max-w-[500px] relative lg:bottom-6">
              {hero?.overview?.length > 150
                ? hero?.overview?.slice(0, 150) + "..."
                : hero?.overview}
            </p>
            <div className="flex gap-2 mt-4">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md font-semibold">
                TMDB {hero?.vote_average.toFixed(1)}
              </button>
              <Link href={`/watch/movie/${hero?.id}`}>
                <button className="bg-white text-black px-4 py-2 rounded-md font-semibold">
                  Watch
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
