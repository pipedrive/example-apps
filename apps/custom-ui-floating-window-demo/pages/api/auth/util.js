export async function refreshAccessToken(refresh_token, user_id) {
  const res = await fetch("https://oauth.pipedrive.com/oauth/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.PIPEDRIVE_CLIENT_ID}:${process.env.PIPEDRIVE_CLIENT_SECRET}`
        ).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  const credentials = await res.json();

  await db.user.update({
    where: {
      accountId: user_id,
    },
    data: {
      accessToken: credentials.access_token,
      refreshToken: credentials.refresh_token,
      expiresAt: String(Date.now() + 59 * 60 * 1000),
    },
  });

  return credentials;
}
