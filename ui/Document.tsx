import { FunctionComponent, PropsWithChildren } from "react";

export type DocumentProps = PropsWithChildren<{
  title: string;
  className?: string;
}>;

export const Document: FunctionComponent<DocumentProps> = ({
  title,
  children,
  className,
}) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <script
        src="https://unpkg.com/htmx.org@1.9.5"
        integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO"
        defer
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://unpkg.com/idiomorph/dist/idiomorph-ext.min.js"
        defer
      ></script>
    </head>
    <body className={className} hx-ext="morph">
      {children}
    </body>
  </html>
);
