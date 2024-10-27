import type { SchemaTypeDefinition } from "sanity";
import { projectsType } from "./projects";
import { documentation } from './documentation.ts';
import { fashion } from "./fashion.ts";
import { portraits } from "./portraits.ts";
import { random } from "./random.ts";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [projectsType, documentation, fashion, portraits, random,]
};