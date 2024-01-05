import Options from "@/components/Watch/Options";
import Seasons from "@/components/Watch/Seasons";
import Image from "next/image";
import { Suspense } from "react";

async function getData(id: string, type: string) {
  try {
    const resDetails = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
    );
    const resImages = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${process.env.TMDB_KEY}&language=en-US&include_image_language=en,null`
    );
    const resExternalIds = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/external_ids?api_key=${process.env.TMDB_KEY}`
    );
    const externalIds = await resExternalIds.json();
    const details = await resDetails.json();
    const images = await resImages.json();
    return {
      details,
      images,
      externalIds,
    };
  } catch (error) {
    console.log(error);
    return {
      details: [],
      images: [],
      externalIds: [],
    };
  }
}

const page = async ({ params }: { params: { id: string; type: string } }) => {
  const data = await getData(params.id, params.type);
  return (
    <div>
      <div className="relative flex justify-start items-center w-full h-[500px] lg:h-[700px]">
        <Image
          src={`https://image.tmdb.org/t/p/original${
            data?.images?.backdrops[
              Math.floor(Math.random() * data.images?.backdrops.length)
            ]?.file_path
          }`}
          alt={data.details?.title}
          width={1920}
          height={1080}
          className="object-cover w-full h-[500px] lg:h-[700px] absolute top-0 left-0"
        />
        <div className="absolute top-0 flex flex-col gap-3 z-20 ml-8">
          {data?.images?.logos?.length > 0 ? (
            <Image
              src={`https://image.tmdb.org/t/p/original${data.images?.logos[0]?.file_path}`}
              alt={data.details?.title}
              width={1920}
              height={1080}
              className="object-contain w-[800px] h-[300px] lg:w-[300px] lg:h-[300px]"
            />
          ) : (
            <h1 className="text-white text-4xl lg:text-6xl font-semibold mt-[250px]">
              {data.details?.title}
            </h1>
          )}
          {/* rating */}
          <div className="flex gap-4 mt-4 justify-start items-center">
            <div className="flex justify-start items-center">
              <p className="bg-green-700 rounded-full px-2 py-1 text-base text-white font-bold">
                TMDB
              </p>
              <p className=" rounded-full px-3 py-1 text-xl text-white font-extrabold">
                {data.details?.vote_average?.toFixed(1)}
              </p>
            </div>
            <p className="text-white text-xl font-medium">
              {data.details?.release_date?.slice(0, 4)}
            </p>
            <p className="text-white text-xl font-medium">
              {data.details?.runtime ? data.details?.runtime + " min" : ""}
              {data.details?.episode_run_time?.[0]
                ? data.details?.episode_run_time?.[0] + " min"
                : ""}
            </p>
          </div>

          <p className="text-white text-sm lg:text-sm font-medium max-w-[500px] ">
            {data.details?.overview?.length > 350
              ? data.details?.overview?.slice(0, 350) + "..."
              : data.details?.overview}
          </p>
          {/* tags */}
          <div className="flex gap-2">
            {data.details?.genres?.map((genre: any) => {
              return (
                <p
                  key={genre?.id}
                  className=" cursor-pointer bg-white/30 bg-opacity-100 backdrop-blur-lg  px-2 py-1 text-sm text-white font-medium rounded-full"
                >
                  {genre?.name}
                </p>
              );
            })}
          </div>
        </div>
        {/* left right and bottom to top  */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent"></div>
      </div>
      <Options
        ids={{
          tmdb: params.id,
          imdb: data.externalIds?.imdb_id,
        }}
        seasons={data.details?.seasons}
      />
    </div>
  );
};

export default page;
