import PocketBase from "pocketbase";
import { useRuntimeConfig } from "nitropack/runtime";

export default defineEventHandler(async (event) => {
  const { pocketBaseUrl, pocketBaseEmail, pocketBasePassword } =
    useRuntimeConfig(event);

  const page = parseInt(getQuery(event).page as string);
  const perpage = parseInt(getQuery(event).perpage as string);

  try {
    const pb = new PocketBase(pocketBaseUrl);
    await pb
      .collection("_superusers")
      .authWithPassword(pocketBaseEmail, pocketBasePassword);

    const { internet } = getQuery(event);
    let filter = "";

    if (internet !== undefined) {
      filter = `internet = ${
        typeof internet === "boolean"
          ? internet
          : typeof internet === "string"
          ? internet.toLowerCase()
          : ""
      }`;
    }

    return await pb.collection("sabia_paineis").getList(page, perpage, {
      sort: "-id",
      filter,
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Erro ao buscar registros da coleção 'sabia_paineis': ${error.message}`,
    });
  }
});
