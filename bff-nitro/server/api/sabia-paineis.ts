import PocketBase from "pocketbase";
import { useRuntimeConfig } from "nitropack/runtime";

export default defineEventHandler(async (event) => {
  const { pocketBaseUrl, pocketBasePaineis } = useRuntimeConfig(event);

  const query = getQuery(event);
  const page = query.page ? Number(query.page) : 1;
  const perPage = query.perPage ? Number(query.perPage) : 10;

  let filter = "";

  const pb = new PocketBase(pocketBaseUrl);

  const { internet } = getQuery(event);

  if (internet !== undefined) {
    filter = `internet = ${
      typeof internet === "boolean"
        ? internet
        : typeof internet === "string"
        ? internet.toLowerCase()
        : ""
    }`;
  }

  const paineis = await pb
    .collection(pocketBasePaineis)
    .getList(page, perPage, {
      sort: "-id",
      filter,
    });

  return paineis;
});
