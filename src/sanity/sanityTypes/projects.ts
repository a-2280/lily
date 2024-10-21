import { defineField, defineType } from "sanity";

export const projectsType = defineType({
  name: "projects",
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
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "projectImages",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            defineField({
              name: "isFavorite",
              type: "boolean",
              title: "Favorite",
              initialValue: false,
            }),
            defineField({
              name: "isPortrait",
              type: "boolean",
              title: "Portrait",
              initialValue: false,
            }),
          ]
        }
      ],
      options: {
        layout: 'grid',
        }
    }),
  ],
});