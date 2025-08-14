import { sendProxy } from "h3";
import { getPocketBaseInstance } from "../../utils/pocketBaseInstance";

export default defineEventHandler(async (event) => {
  const pb = await getPocketBaseInstance();
  const imagePath = event.context.params.path;

  const fullPocketBaseFileUrl = `${pb.buildURL}/api/files/${imagePath}`;

  try {
    return sendProxy(event, fullPocketBaseFileUrl);
  } catch (error) {
    console.error(
      `Erro no BFF ao proxy arquivo ${fullPocketBaseFileUrl}:`,
      error
    );
  }
});
