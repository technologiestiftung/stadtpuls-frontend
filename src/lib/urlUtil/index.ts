export const normalizeURL = (url: string): string | undefined => {
  try {
    const { hostname, pathname } = new URL(url);
    return `${hostname}${pathname
      .replace(/\.(html?|aspx?)$/gi, "")
      .replace(/\/$/i, "")}`;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getAbsoluteBaseUrl = (): string => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3333}`;
};

export const getBaseUrl = (): string => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3333}`;
};
