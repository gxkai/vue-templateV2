<template>
  <chakra.div
    :bg="bg"
    :color="color"
    :min-h="['auto', 'auto', '100vh']"
    w="100%"
  >
    <layout-mdx
      :frontmatter="frontmatter"
      v-if="layoutComponent === 'layout-mdx'"
    >
      <slot />
    </layout-mdx>
  </chakra.div>
</template>

<script setup lang="ts">
import { computed, defineProps, useSlots } from "vue"
import { chakra } from "@chakra-ui/vue-next"
import { useRoute } from "vue-router"
import { useHead } from "@vueuse/head"
import { useColorModeValue } from "@chakra-ui/c-color-mode"
const { path } = useRoute()

const props = defineProps<{ frontmatter: { title: string } }>()

const layoutMap = {
  blog: "layout-mdx",
  guides: "layout-mdx",
  docs: "layout-mdx",
  changelog: "layout-mdx",
  default: "page-container",
}

// convert to dynamic import? maybe.
const layoutComponent = computed(() => {
  const layout = Object.entries(layoutMap).find(([layoutPath, _component]) =>
    String(path).startsWith(`/${layoutPath}`)
  )
  if (!layout) return layoutMap.default
  return layout[1]
})
const slots = useSlots()
console.log("slots", slots?.default?.())

const bg = useColorModeValue("white", "blackAlpha.700")
const color = useColorModeValue("gray.900", "whiteAlpha.900")
useHead({
  title: props.frontmatter.title,
})
</script>
