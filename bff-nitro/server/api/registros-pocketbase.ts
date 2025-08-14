import { getPocketBaseInstance } from "../utils/pocketBaseInstance"; // Importe a função

export default defineEventHandler(async (event) => {
  const collectionName = "sabia_paineis";
  const page = parseInt(getQuery(event).page as string);
  const perpage = parseInt(getQuery(event).perpage as string);

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
      .getList(page, perpage, {
        sort: "-id",
        filter: filterString,
      });

    return resultList;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Erro ao buscar registros da coleção '${collectionName}': ${error.message}`,
    });
  }
});
