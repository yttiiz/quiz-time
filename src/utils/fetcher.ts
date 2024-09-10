import {
  ErrorResponseType,
  FetcherParamaterType,
  SuccessResponseType,
} from "./types";

export class Fetcher {
  public static async getData(url: string, searchParams?: string) {
    return await Fetcher.fetchData({ url, data: searchParams });
  }

  public static async postData(
    url: string,
    data: string | Record<string, string> = {},
    platform: "next" | "nuxt" | "standard" = "standard"
  ) {
    return await Fetcher.fetchData({ url, data, method: "POST", platform });
  }

  public static async putData(
    url: string,
    data: string | Record<string, string> = {},
    platform: "next" | "nuxt" | "standard" = "standard"
  ) {
    return await Fetcher.fetchData({ url, data, method: "PUT", platform });
  }

  public static async deleteData(
    url: string,
    data: string | Record<string, string> = {},
    platform: "next" | "nuxt" | "standard" = "standard"
  ) {
    return await Fetcher.fetchData({ url, data, method: "DELETE", platform });
  }

  private static async fetchData({
    url,
    data,
    method = "GET",
    contentType = "application/json",
    platform = "standard",
  }: FetcherParamaterType & {
    platform?: "next" | "nuxt" | "standard"
  }): Promise<SuccessResponseType | ErrorResponseType> {
    const opts: RequestInit = {
      method,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": contentType,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };

    let response: Response;

    try {
      if (method === "GET" || method === "HEAD") {
        data
          ? (response = await fetch(
              url + "?" + new URLSearchParams(data),
              opts,
            ))
          : (response = await fetch(url, opts));
      } else {
        // According to the platform, the body has to be convert in a FormData.
        if (platform === "next") {
          
          // Prevent TypeError (in Nextjs): Failed to parse body as FormData. 
          delete opts["headers"];
          const formData = new FormData();
          formData.append(
          	"value",
          	typeof data === "string" ? data : JSON.stringify(data),
          );
          opts["body"] = formData;

        } else {
          opts["body"] = typeof data === "string" ? data : JSON.stringify(data);
        }

        response = await fetch(url, opts);
      }

      return response.ok
        ? {
            ok: true,
            code: response.status,
            data: await response.json(),
          }
        : {
            ok: false,
            code: response.status,
            message: response.statusText,
          };
    } catch (_) {
      return {
        ok: false,
        code: 500,
        message: "This api call failed.",
      };
    }
  }
}
