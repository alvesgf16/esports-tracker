import {
  ScrollViewStyleReset,
  useServerDocumentContext,
} from 'expo-router/html';
import type { ReactNode } from 'react';

// Web-only root HTML for server rendering. Runs in Node.js only.
export default function Root({ children }: { children: ReactNode }) {
  const document = useServerDocumentContext();

  return (
    <html lang="en" {...document.htmlAttributes}>
      <head>
        <DocumentHead headNodes={document.headNodes} />
      </head>
      <body {...document.bodyAttributes}>
        {children}
        {document.bodyNodes}
      </body>
    </html>
  );
}

function DocumentHead({ headNodes }: { headNodes: ReactNode }) {
  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <ScrollViewStyleReset />
      <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      {headNodes}
    </>
  );
}

const responsiveBackground = `
body {
  background-color: #0E1116;
  color: #F4F6F8;
}`;
