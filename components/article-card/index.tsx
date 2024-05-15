import { Heart, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function ArticleCard() {
  return (
    <article className="rounded-lg flex flex-col justify-between border hover:cursor-pointer  border-gray-200 bg-background p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:hover:shadow-lg">
      <div className="space-y-2">
        <h2 className="text-xl font-playfairdisplay font-bold text-foreground ">
          Mastering the Art of Minimalist Web Design
        </h2>
        <p className="text-muted-foreground ">
          By Jane Smith • Published on April 15, 2023
        </p>
        <p className="line-clamp-3 text-muted-foreground ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ad
          eveniet temporibus molestias ex? Recusandae odio reprehenderit
          quisquam libero voluptate quam iure aliquam? Numquam porro doloribus
          consectetur eaque ut dolorum soluta accusantium autem in nam deserunt
          excepturi quo facere sunt consequuntur quaerat ducimus dolor at quae
          nemo, rem sit ex?
        </p>
      </div>
      <div className="mt-4 flex gap-4 justify-end items-center">
        <button>
          <MessageCircle className="size-5" />
        </button>
        <button>
          <Heart className="size-5" />
        </button>
        <Button variant="default">Read More</Button>
      </div>
    </article>
  );
}
