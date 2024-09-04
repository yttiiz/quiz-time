export class Fetcher {
/**
 * Returns an object fetched from 'app/api/json'.
 * @param host domain origin
 */
  public static async getData(host: string | undefined) {
    const response = await fetch(`${host}/api/json`, {
      cache: "no-cache",
    });
  
    return response.ok
      ? await response.json()
      : {
          message:
            response.statusText +
            (host ? "" : ". ERR: Domain origin is not defined."),
        };
  };
}