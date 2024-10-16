import { createClient } from '@sanity/client';
/* empty css                                */

const sanityClient = createClient(
            {"apiVersion":"2024-10-15","projectId":"uo0tfzx3","dataset":"production","useCdn":false}
          );

globalThis.sanityClient = sanityClient;

export { sanityClient as s };
