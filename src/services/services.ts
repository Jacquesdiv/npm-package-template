import { HttpService, ApplicationService } from '.';

export class Services {
  private static _instance: Services;

  private applicationService: ApplicationService;
  private httpService: HttpService;

  public static instance(): Services {
    if (!this._instance) { this._instance = new this(); }
    return this._instance;
  }

  private constructor() {
    this.httpService = new HttpService();
    this.applicationService = new ApplicationService(this.httpService);
  }

  public getApplicationService(): ApplicationService {
    return this.applicationService;
  }
}
