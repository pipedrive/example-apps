import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const meta = () => ({
  charset: "utf-8",
  title: "Cars Service",
  viewport: "width=device-width,initial-scale=1",
});

import styles from '~/styles/app.css';
import { DataContextProvider } from './contexts/data';

export function links() {
  const PIPEDRIVE_CSS_HASH = '7c28814e5441007b1df1';

  return [
    {
      rel: "stylesheet",
      href: `https://cdn.eu-central-1.pipedriveassets.com/froot/froot-vendors.${PIPEDRIVE_CSS_HASH}.css`,
    },
    {
      rel: "stylesheet",
      href: styles,
    }
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <DataContextProvider>
          <Outlet />
        </DataContextProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
