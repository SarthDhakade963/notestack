import { fetchWithToken } from "@/lib/fetchWithToken";


export const fetcher = async (url: string) => {
  const res = await fetchWithToken(url);
  return res.json();
};
