import PocketBase from "pocketbase";
import { useRuntimeConfig } from "nitropack/runtime";

export default defineEventHandler(async (event) => {
  const { pocketBaseUrl, pocketBaseEmail, pocketBasePassword } =
    useRuntimeConfig(event);

  if (!pocketBaseUrl || !pocketBaseEmail || !pocketBasePassword) {
    throw createError({
      statusCode: 500,
      message:
        "Variáveis de ambiente do PocketBase não configuradas corretamente.",
    });
  }

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
  } catch (error: any) {
    if (
      error.status === 400 &&
      error.response?.message === "Failed to authenticate."
    ) {
      throw createError({
        statusCode: 401,
        message: "Credenciais de autenticação inválidas.",
      });
    }
    throw createError({
      statusCode: 500,
      message: `Erro ao buscar registros da coleção 'sabia_paineis': ${error.message}`,
    });
  }
});
