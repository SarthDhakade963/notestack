import { getSession, signOut } from "next-auth/react";

export async function fetchWithToken(
  input: string,
  init?: RequestInit
): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  try {
    const session = await getSession();

    if (!session?.accessToken) {
      console.warn("⚠️ No valid session found. Signing out...");
      // Redirect the user to the auth page after sign out
      await signOut({ redirect: true, callbackUrl: "/" });
      throw new Error("No access token found. Please sign in again.");
    }

    const accessToken = session.accessToken as string;
    const headers = new Headers(init?.headers ?? {});

    if (!headers.has("Content-Type"))
      headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${accessToken}`);

    const url = input.startsWith("http")
      ? input
      : `${baseUrl.replace(/\/$/, "")}/${input.replace(/^\//, "")}`;

    const response = await fetch(url, { ...init, headers });

    if (response.status === 401) {
      console.warn("🔒 Token expired or unauthorized. Signing out...");
      // Token likely expired — sign the user out and redirect to auth
      await signOut({ redirect: true, callbackUrl: "/auth" });
      throw new Error("Session expired. Please log in again.");
    }

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      const errorText = contentType?.includes("application/json")
        ? JSON.stringify(await response.json(), null, 2)
        : await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    return response;
  } catch (error) {
    console.error("🚨 fetchWithToken error:", error);
    throw error;
  }
}
