import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from '~/styles/app.css';
import { PIPEDRIVE_STYLESHEET } from '~/constants';
import { DataContextProvider } from './contexts/data';

export const meta = () => ({
  charset: "utf-8",
  title: "Cars Service",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    {
      rel: "stylesheet",
      href: PIPEDRIVE_STYLESHEET,
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
