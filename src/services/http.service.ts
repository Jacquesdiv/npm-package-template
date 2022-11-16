import { FetchService, HttpVerb } from './fetch.service';

export class HttpService {

  public get(url: string, headers: any = {}): Promise<any> {
    return FetchService.fetch({ url, method: HttpVerb.GET, headers });
  }

  public post(url: string, body: any, headers: any = {}): Promise<any> {
    return FetchService.fetch({ url, method: HttpVerb.POST, headers, body });
  }

  public patch(url: string, body: any, headers: any = {}): Promise<any> {
    return FetchService.fetch({ url, method: HttpVerb.PATCH, headers, body });
  }

  public put(url: string, body: any, headers: any = {}): Promise<any> {
    return FetchService.fetch({ url, method: HttpVerb.PUT, headers, body });
  }

  public delete(url: string, headers: any = {}): Promise<any> {
    return FetchService.fetch({ url, method: HttpVerb.DELETE, headers });
  }
}
