import { getPocketBaseInstance } from "../utils/pocketBaseInstance";

export default defineEventHandler(async (event) => {
  const collectionName = "sabia_paineis";
  const query = getQuery(event);
  const page = query.page ? Number(query.page) : 1;
  const perPage = query.perPage ? Number(query.perPage) : 10;

  try {
    const pb = await getPocketBaseInstance();

    const query = getQuery(event);
    let filterString = "";

    if (query.internet !== undefined) {
      filterString = `internet = ${
        typeof query.internet === "boolean"
          ? query.internet
          : typeof query.internet === "string"
          ? query.internet.toLowerCase()
          : ""
      }`;
    }
    const resultList = await pb
      .collection(collectionName)
      .getList(page, perPage, {
        sort: "-id",
        filter: filterString,
      });
    return resultList;
  } catch (error) {
    console.error("Erro ao buscar registros:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Erro ao buscar registros",
    });
  }
});
