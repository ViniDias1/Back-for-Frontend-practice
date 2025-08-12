import { getPocketBaseInstance } from "../utils/pocketBaseInstance"; // Importe a função

export default defineEventHandler(async (event) => {
  const collectionName = "sabia_paineis";

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

    const resultList = await pb.collection(collectionName).getList(1, 7, {
      sort: "-id",
      filter: filterString,
    });

    return resultList;
  } catch (error: any) {
    if (error.message.includes("Configuração do PocketBase incompleta")) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    }
    if (error.message.includes("Erro na autenticação")) {
      throw createError({
        statusCode: 401,
        message: "Credenciais de autenticação inválidas.",
      });
    }

    throw createError({
      statusCode: 500,

      message: `Erro ao buscar registros da coleção '${collectionName}': ${error.message}`,
    });
  }
});
