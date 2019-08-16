import { Nast, Notion } from '../../types/src'

import { renderRoot, renderNode } from './render-control'
import { renderTitle, renderChildren, preRenderTransform } from './render-utils'

type RenderOptions = {
  /** Ignore the root node */
  contentOnly: boolean
  /** Skip bulleted list and numbered list analysis */
  bypassPreRenderTransform: boolean
}

/**
 * Generate static HTML from NAST or StyledString[].
 */
function renderToHTML(
  unknown: Nast.Block | Notion.StyledString[],
  options: RenderOptions = {
    contentOnly: false,
    bypassPreRenderTransform: false
  }
): string {
  /** Check which type of input is it */
  if (Array.isArray(unknown)) {
    /** View it as StyledString[] if it's an array */
    return renderTitle(unknown)
  } else {
    /** Otherwise, a tree */
    const tree = unknown
    const contentOnly = typeof options.contentOnly !== 'undefined'
      ? options.contentOnly : false

    /** Transform the tree if necessary so that it can be rendered */
    let newTree =
      options.bypassPreRenderTransform ? tree : preRenderTransform(tree)

    /** If contentOnly flag is set, do not render the root node */
    if (contentOnly) {
      return renderChildren(newTree.children, renderNode)
    } else {
      return renderRoot(newTree)
    }
  } // else
} // function

export {
  renderToHTML
}