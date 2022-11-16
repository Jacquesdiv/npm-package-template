// TODO import any
import { Services } from './services/services';

const services = Services.instance();
const application = services.getApplicationService();

export {
  application
}
