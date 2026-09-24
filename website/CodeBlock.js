import { Highlight, themes } from 'prism-react-renderer'
import { string } from 'prop-types'
import React from 'react'

export default function CodeBlock({ code, language = 'jsx' }) {
  return (
    <Highlight code={code.trim()} language={language} theme={themes.github}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line })} key={i}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token })} key={key} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

CodeBlock.propTypes = {
  code: string,
  language: string
}
