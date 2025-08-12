import { sendProxy } from "h3";
import { getPocketBaseInstance } from "../../utils/pocketBaseInstance";

export default defineEventHandler(async (event) => {
  const pb = await getPocketBaseInstance();
  const pocketbaseUrl = pb.baseUrl;
  const imagePath = event.context.params.path;

  if (!imagePath) {
    throw createError({
      statusCode: 400,
      statusMessage: "Caminho do arquivo não fornecido.",
    });
  }

  const fullPocketBaseFileUrl = `${pocketbaseUrl}/api/files/${imagePath}`;

  console.log(`BFF: Servindo arquivo via proxy: ${fullPocketBaseFileUrl}`);

  try {
    return sendProxy(event, fullPocketBaseFileUrl);
  } catch (error: any) {
    console.error(
      `Erro no BFF ao proxy arquivo ${fullPocketBaseFileUrl}:`,
      error
    );

    if (error.status === 404 || error.response?.code === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: "Arquivo não encontrado ou sem permissão.",
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: `Erro interno no servidor ao servir o arquivo: ${
        error.message || "Erro desconhecido."
      }`,
    });
  }
});
