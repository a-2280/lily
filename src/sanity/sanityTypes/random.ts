import { defineField, defineType } from "sanity";

export const random = defineType({
  name: "random",
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
      name: "randomImages",
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