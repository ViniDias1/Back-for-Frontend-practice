import PocketBase from "pocketbase";
import { useRuntimeConfig } from "nitropack/runtime";

export default defineEventHandler(async (event) => {
  const { pocketBaseUrl, pocketBaseEmail, pocketBasePassword } =
    useRuntimeConfig(event);

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

    return await pb.collection("sabia_paineis").getList(1, 10, {
      sort: "-id",
      filter,
    });
  } catch (error) {
    console.error("Erro ao buscar registros:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erro ao buscar registros",
    });
  }
});
