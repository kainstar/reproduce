import { createApp } from "vue";
import App from "./app.vue";

(async function main() {
  const app = createApp(App);

  app.mount("#app");
})();
