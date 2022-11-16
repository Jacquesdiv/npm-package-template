import { HttpService } from '.';

export class ApplicationService { // TODO rename this to the service you want to provide

  private apiBaseUrl: string;

  constructor(
    private http: HttpService,
  ) { }

  public initialize(microserviceBaseUrl: string) {
    this.apiBaseUrl = microserviceBaseUrl;
  }
   
  // this is an example api call
  public async performAction(data: any): Promise<any> { // TODO replace 'any' with valid types
    const url = this.buildUrl('/path/to/action');
    const result = await this.http.post(url, data);
    // do post fetch processing here
    return result;
  }

  private buildUrl(endpoint: string) {
    if (!this.apiBaseUrl) {
      throw new Error('Please initialize first');
    }

    const parts = [this.apiBaseUrl, endpoint];
    const separator = '/';
    const replace = new RegExp(separator + '{1,}', 'g');
    return parts.join(separator)
      .replace(replace, separator)
      .replace('http:/', 'http://')
      .replace('https:/', 'https://');
  }
}
