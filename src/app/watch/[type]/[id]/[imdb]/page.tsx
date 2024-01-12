import { Suspense } from "react";
import Stream from "@/components/Player/Stream";
const page = async ({
  params,
}: {
  params: { imdb: string; type: string; id: string };
}) => {
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <Stream params={params} />
      </Suspense>
    </div>
  );
};

export default page;
