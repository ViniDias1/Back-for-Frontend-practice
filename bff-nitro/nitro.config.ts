export default defineNitroConfig({
  srcDir: "server",
  runtimeConfig: {
    pocketBaseUrl: process.env.POCKET_BASE_URL,
    pocketBaseEmail: process.env.POCKET_BASE_EMAIL,
    pocketBasePassword: process.env.POCKET_BASE_PASSWORD,
    pocketBasePaineis: process.env.POCKET_BASE_PAINEIS,
    pocketBaseAdmin: process.env.POCKET_BASE_ADMIN,
  },
});
