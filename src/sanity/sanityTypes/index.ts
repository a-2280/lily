import type { SchemaTypeDefinition } from "sanity";
import { projectsType } from "./projects";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [projectsType,]
};