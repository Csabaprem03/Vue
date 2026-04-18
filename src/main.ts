import { createApp } from "vue";
import "./style.css";
import "animate.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);
// létrehozza a Pinia-t
const pinia = createPinia();

app.use(pinia);
// létrehozza a routert
app.use(router);

app.mount("#app");
