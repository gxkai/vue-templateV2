import { h, renderSlot, SetupContext } from "vue"
import { trim } from "lodash"
/**
 * MDX Components
 *
 * @warn do not use to create mdx components like this:
 * h(chakra('div',{ pb:"4" }), {}, slots)
 * it will look like its working but _hover, _focus etc. pseudo styling and other apis wont work.
 *
 * So create vue component which uses chakra and use the name of component here. Like this:
 * h('NewComponent', {}, slots)
 * or use c-box
 * h('c-box',{ my:'2em', borderRadius: 'sm' }, renderSlot(context.slots, 'default'))
 */

const LinkedHeading =
  (as: string, apply: string) => (props: any, context: SetupContext) => {
    return h(
      "MdxHeading",
      { ...props, as, apply },
      renderSlot(context.slots, "default")
    )
  }

const MdxChakra =
  (
    {
      as,
      apply,
      customProps,
    }: {
      as: string
      apply?: string
      customProps?: any
    } = { as: "div" }
  ) =>
  (props: any, context: SetupContext) =>
    h(
      "MdxChakra",
      { ...props, as, apply, ...customProps },
      renderSlot(context.slots, "default")
    )

export const MdxComponents = {
  h1: (props: any, context: SetupContext) => {
    return h(
      "chakra.h1",
      { apply: "mdx.h1", ...props },
      renderSlot(context.slots, "default")
    )
  },
  h2: LinkedHeading("h2", "mdx.h2"),
  h3: LinkedHeading("h3", "mdx.h3"),
  h4: LinkedHeading("h4", "mdx.h4"),
  hr: (props: any, context: SetupContext) =>
    h(
      "chakra.hr",
      { apply: "mdx.hr", ...props },
      renderSlot(context.slots, "default")
    ),
  strong: (props: any, context: SetupContext) =>
    h(
      "c-box",
      { as: "strong", fontWeight: "semibold", ...props },
      renderSlot(context.slots, "default")
    ),
  code: (props: { className: string }, context: SetupContext) => {
    return h("MdxInlineCode", props, context.slots)
  },
  pre: (props: { live?: boolean }, context: any) => {
    // props comes from remark-mdx-code-meta automatically

    // new lines `\n` doesnt work with custom components so we pass as a prop and render it with `v-html`
    const pre = context?.slots?.default?.()
    const defaultSlot = pre?.[0]?.children.default()[0] || ""
    const code = trim(defaultSlot)
    const realProps = pre?.[0]?.props

    // get language from classname eg.  language-bash => bash
    const [_, language] = realProps?.className?.split("-")

    const comp = h(
      "MdxPre",
      { ...props, ...realProps, language, code },
      // no need for slot
      { default: "" }
    )
    return comp
  },
  kbd: "CKbd",
  // todo: use <Cbr /> instead of <br reset />
  CBr: ({ reset, ...props }: { reset: Boolean }, context: SetupContext) => {
    return h("c-box", {
      ...props,
      as: "div", // failed to resolve component 'br'?
      height: reset ? undefined : "24px",
    })
  },
  table: "MdxTable",
  th: "MdxTh",
  td: "MdxTd",
  a: MdxChakra({ as: "a", apply: "mdx.a" }),
  p: MdxChakra({ as: "p", apply: "mdx.p" }),
  ul: MdxChakra({ as: "ul", apply: "mdx.ul" }),
  ol: MdxChakra({ as: "ol", apply: "mdx.ul" }),
  li: MdxChakra({ as: "li", customProps: { pb: "4px" } }),
  blockquote: "MdxBlockquote",
  CarbonAd: "CarbonAd",
  ComponentLinks: "ComponentLinks",
}
