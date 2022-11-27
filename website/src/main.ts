import App from "./App.vue"
import { ViteSSG } from "vite-ssg"
import ChakraUIVuePlugin, { chakra } from "@chakra-ui/vue-next"
import { domElements } from "@chakra-ui/vue-system"
import { hydrate } from "@emotion/css"
import routes from "pages-generated"

import "vue-prism-editor/dist/prismeditor.min.css"

import * as iconSet from "./utils/icons"

const { extendedIcons: extend, ...library } = iconSet

import "./styles/main.css"
import customTheme from "./assets/custom-theme"

console.log(routes)

export const createApp = ViteSSG(App, { routes }, ({ app, isClient }) => {
  if (isClient) {
    // @ts-expect-error Need to add $emotionSSRIds to global namespace
    const ssrIds = window?.$emotionSSRIds || []
    hydrate(ssrIds)
  }

  app.use(ChakraUIVuePlugin, {
    extendTheme: customTheme,
    icons: {
      library,
      extend,
    },
  })

  domElements.forEach((tag) => {
    app.component(`chakra.${tag}`, chakra(tag))
  })
})
