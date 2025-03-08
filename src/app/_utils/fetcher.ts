interface FetcherProps {
  apiPath: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
  token: string;
}

export const fetcher = async ({
  apiPath,
  method = "GET",
  body,
  token,
}: FetcherProps) => {
  try {
    const res = await fetch(apiPath, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!res.ok) throw new Error("APIリクエストに失敗しました。");

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
