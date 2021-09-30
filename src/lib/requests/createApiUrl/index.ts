const API_VERSION = "v3";

export const createApiUrl = (
  route = "/",
  params?: Record<string, string>
): string => {
  const url = new URL(
    `${
      process.env.NEXT_PUBLIC_API_URL || "https://fake-token-api-url.com"
    }/api/${API_VERSION}${route}`
  );

  if (params) {
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });
  }

  return url.href;
};
