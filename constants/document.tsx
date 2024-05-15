import { JSONContent } from "novel";

export const document: JSONContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          text: "header",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: `abdelmounaim.ammari@gmail.com | 0656647353 | Ait Melloul Agadir`,
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic similique illo delectus odit eaque ipsum ipsam cum harum eum perferendis?",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur odit molestias aspernatur animi hic libero velit deserunt fugiat, voluptates rem corrupti, tenetur doloribus nesciunt autem distinctio laboriosam dignissimos? Ipsum.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quasi!",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid obcaecati atque esse, hic saepe iste, animi sit, quo voluptas doloribus ullam quam nam mollitia est rerum quidem accusamus cumque dolorem.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",

          text: "Sincerely",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Ammari Abdelmounaim",
        },
      ],
    },
  ],
};
