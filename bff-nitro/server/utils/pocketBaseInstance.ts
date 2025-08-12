import PocketBase from "pocketbase";
import { useRuntimeConfig } from "nitropack/runtime";
import { authPocketBase } from "./authPocketBase";

let pbInstance: PocketBase | null = null;

export async function getPocketBaseInstance(): Promise<PocketBase> {
  const { pocketBaseUrl } = useRuntimeConfig();

  if (!pocketBaseUrl) throw new Error("PocketBase: URL não configurada.");

  pbInstance ??= new PocketBase(pocketBaseUrl);

  if (pbInstance.authStore.isValid) {
    console.debug("PocketBase: Token válido. Reutilizando instância.");
    return pbInstance;
  }

  console.info("PocketBase: Token ausente/inválido. Autenticando...");
  await authPocketBase();
  return pbInstance;
}
