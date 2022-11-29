import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import React from 'react';

export default function CodeBlock({ code, lang }) {

  return (

    <SyntaxHighlighter language={lang} style={tomorrowNightEighties} showLineNumbers="true">
      {code}
    </SyntaxHighlighter>
  )
}
