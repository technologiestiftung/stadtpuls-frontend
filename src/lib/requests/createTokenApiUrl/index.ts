export const createTokenApiUrl = (params?: Record<string, string>): string => {
  const url = new URL(
    `${
      process.env.NEXT_PUBLIC_TOKEN_API_URL || "https://fake-token-api-url.com"
    }/api/v3/authtokens`
  );

  if (params) {
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });
  }

  return url.href;
};
