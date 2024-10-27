import { defineField, defineType } from "sanity";

export const portraits = defineType({
  name: "portraits",
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
      name: "portraitsImages",
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