import { createApp } from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"
import BaseButton from "./components/UI/BaseButton.vue"
import BaseDialog from "./components/UI/BaseDialog.vue"

const app = createApp(App).use(router).use(store)

app.component("base-button", BaseButton)
app.component("base-dialog", BaseDialog)

router.isReady().then(() => {
  app.mount("#app")
})
