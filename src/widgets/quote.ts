import { Nast } from '../../../types/src'

import { renderBlock, renderTitle } from '../render-utils'

function renderQuote(
  node: Nast.Quote
): string {
  let content = `\
<blockquote>
  ${renderTitle(node.text, false, '')}
</blockquote>`
  return renderBlock(node, content)
}

export default renderQuote