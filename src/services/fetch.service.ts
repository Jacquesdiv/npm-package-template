export enum HttpVerb {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface FetchPayload {
  url: string;
  method: HttpVerb;
  body?: any;
  headers?: any;
}

export class FetchService {

  public static async fetch(payload: FetchPayload): Promise<any> {

    const response = await this.performFetch(payload);
    const content = await this.getContent(response);
    const status = response.status;

    if (this.isSuccessful(status)) {
      return content;
    } else {
      return this.throwError(content, status);
    }
  }

  private static async performFetch(payload: FetchPayload): Promise<Response> {
    const url = payload.url;
    const method = payload.method;
    const body = payload.body || null;

    return fetch(url, {
      method,
      headers: this.getHeaders(payload),
      body: body ? JSON.stringify(body) : null
    });
  }

  private static async getContent(response: Response): Promise<any> {
    if (!this.responseHasContent(response)) {
      return null;
    }

    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (err) {
      return text;
    }
  }

  private static responseHasContent(response: Response): boolean {
    // tslint:disable-next-line: triple-equals
    return response.headers.get('Content-Length') != '0';
  }

  private static isSuccessful(status: number): boolean {
    return status >= 200 && status <= 299;
  }

  private static throwError(content: any, status: number): Promise<void> {
    if (content && content.message) {
      throw new HttpError(content.message, status)
    }

    const err = `Something went wrong, 
    please try again or contact your system administrator`;
    throw new HttpError(err, status);
  }

  private static getHeaders(payload: FetchPayload): any {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
    return Object.assign(headers, payload.headers || {});
  }
}

// tslint:disable-next-line: max-classes-per-file
class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
