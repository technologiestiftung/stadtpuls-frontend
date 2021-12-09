import useSWR from "swr";

interface GithubUserType {
  id: number;
  node_id: string;
  name: string;
  login: string;
  public_repos: number;
}

async function fetchGithubUser(
  username: string
): Promise<GithubUserType | null> {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/vnd.github.v3+json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  const url = `https://api.github.com/users/${username}`;
  const res = await fetch(url, requestOptions);
  if (!res.ok)
    throw new Error(`The following GitHub user wasn't found: "${username}"`);
  const user = (await res.json()) as GithubUserType;

  return user;
}

export default function useGithubUser(username: string): {
  user: GithubUserType | null;
  isLoading: boolean;
  error: Error | null;
} {
  const { data: user, error } = useSWR<GithubUserType | null, Error>(
    username,
    () => fetchGithubUser(username),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  return {
    user: user || null,
    error: error || null,
    isLoading: !error && !user,
  };
}
