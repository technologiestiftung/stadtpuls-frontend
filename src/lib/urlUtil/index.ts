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
