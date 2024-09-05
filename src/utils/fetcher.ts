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
  ) {
    return await Fetcher.fetchData({ url, data, method: "POST" });
  }

  public static async putData(
    url: string,
    data: string | Record<string, string> = {},
  ) {
    return await Fetcher.fetchData({ url, data, method: "PUT" });
  }

  public static async deleteData(
    url: string,
    data: string | Record<string, string> = {},
  ) {
    return await Fetcher.fetchData({ url, data, method: "DELETE" });
  }

  private static async fetchData({
    url,
    data,
    method = "GET",
    contentType = "application/json",
  }: FetcherParamaterType): Promise<SuccessResponseType | ErrorResponseType> {
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
        opts["body"] = JSON.stringify(data);
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
