import { createCookie } from "@remix-run/node";

export const userPrefs = createCookie("user-prefs", {
	maxAge: 604_800, // one week
});
