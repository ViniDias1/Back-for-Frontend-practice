import { sendProxy } from "h3";
import { getPocketBaseInstance } from "../../utils/pocketBaseInstance";

export default defineEventHandler(async (event) => {
  const pb = await getPocketBaseInstance();
  const imagePath = event.context.params.path;

  const fullPocketBaseFileUrl = `${pb.baseURL}/api/files/${imagePath}`;

  try {
    return sendProxy(event, fullPocketBaseFileUrl);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao servir arquivo: ${
        error.message || "Erro desconhecido."
      }`,
    });
  }
});
