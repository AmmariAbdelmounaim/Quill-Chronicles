import { Pencil, Trash2 } from "lucide-react";

export default function ArticlePreviewCard() {
  return (
    <article className="rounded-lg flex flex-col justify-between border hover:cursor-pointer  border-gray-200 bg-background p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:hover:shadow-lg">
      <div className="space-y-2">
        <h2 className="text-xl font-playfairdisplay font-bold text-foreground ">
          Mastering the Art of Minimalist Web Design
        </h2>
        <p className="text-muted-foreground ">Published on April 15, 2023</p>
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
          <Pencil className="size-5 stroke-primary opacity-80 hover:opacity-100" />
        </button>
        <button>
          <Trash2 className="size-5 stroke-red-600 opacity-80 hover:opacity-100" />
        </button>
      </div>
    </article>
  );
}
