<template>
  <prism-editor
    class="code-higlighter"
    :model-value="code"
    :highlight="highlighter"
    readonly
  ></prism-editor>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue"

import { PrismEditor } from "vue-prism-editor"
import "vue-prism-editor/dist/prismeditor.min.css"

// @ts-ignore
import Prism from "prismjs"
const loadLanguages = require("prismjs/components/")
loadLanguages(["clike", "javascript", "bash", "jsx"])
// import "prismjs/components/prism-clike"
// import "prismjs/components/prism-javascript"
// import "prismjs/components/prism-bash"
// import "prismjs/components/prism-jsx"

const { highlight, language } = Prism

// @ts-ignore
// prettier-ignore
const props = defineProps<{ code: string, language: string }>()

const lang = computed(() => {
  if (props.language === "vue") {
    return "html"
  }
  return props.language
})

const highlighter = (code: string) => {
  return highlight(code.trim(), languages?.[lang.value]) // languages.<insert language> to return html with markup
}
</script>
