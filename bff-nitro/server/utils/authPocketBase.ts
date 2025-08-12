import { getPocketBaseInstance } from "./pocketBaseInstance";
import { useRuntimeConfig } from "nitropack/runtime";
import PocketBase from "pocketbase";

let authPromise: Promise<void> | null = null;

export async function authPocketBase(): Promise<PocketBase> {
  const { pocketBaseEmail, pocketBasePassword } = useRuntimeConfig();
  const pbInstance = await getPocketBaseInstance();

  const isInvalid =
    !pbInstance.authStore.isValid || !pbInstance.authStore.token;

  if (isInvalid) {
    authPromise ??= pbInstance
      .collection("_superusers")
      .authWithPassword(pocketBaseEmail, pocketBasePassword)
      .then(() => {})
      .finally(() => {
        authPromise = null;
      });

    await authPromise;
  }

  return pbInstance;
}
