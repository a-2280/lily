import { defineField, defineType } from "sanity";

export const fashion = defineType({
  name: "fashion",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "fashionImages",
      type: "array",
      of: [
        {
          type: "image",
        }
      ],
      options: {
        layout: 'grid',
        }
    }),
  ],
});