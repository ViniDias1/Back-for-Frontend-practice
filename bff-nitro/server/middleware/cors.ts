export default defineEventHandler((event) => {
  handleCors(event, {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["*"],
  });
});
