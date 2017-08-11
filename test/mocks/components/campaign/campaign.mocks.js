import cycles from './cycles/cycles.routes';
import overview from './overview/overview.routes';
import performance from './performance/performance.routes';
import ageGender from './age-gender/age-gender.routes';
import device from './device/device.routes';
import gmcid from './gmcid/gmcid.routes';


export default angular
  .module('mocks.campaign', [
    cycles,
    overview,
    performance,
    ageGender,
    device,
    gmcid
  ])
  .name;
