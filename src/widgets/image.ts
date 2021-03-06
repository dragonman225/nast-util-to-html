import { renderBlock, renderTitle } from "../render-utils"

function renderImage(
  node: NAST.Image
): string {
  let width = node.fullWidth ? "100%" : `${node.width}px`
  let source = node.source

  /** 
   * Some images are hosted by Notion.so so the urls doesn"t start with 
   * http / https, we need to convert them.
   */
  let re = /^http/
  if (!re.test(source)) {
    source = `https://www.notion.so${source}`
  }

  let content = `\
<div style="width: ${width}; margin: 0.5em auto; max-width: 100%;">
  <figure>
    <img src="${source}" data-src="${source}" style="width: 100%; object-fit: cover;">
    ${node.caption ? `<figcaption>${renderTitle(node.caption)}</figcaption>` : ""}
  </figure>
</div>`

  return renderBlock(node, content)
}

export default renderImage