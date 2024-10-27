import { defineField, defineType } from "sanity";

export const documentation = defineType({
  name: "documentation",
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
      name: "documentationImages",
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