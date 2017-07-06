import cycles from './cycles/cycles.module';
import overview from './overview/overview.module';
import performance from './performance/performance.module';
import ageGender from './age-gender/age-gender.module';
import device from './device/device.module';


export default angular
  .module('mocks.campaign', [
    cycles,
    overview,
    performance,
    ageGender,
    device
  ])
  .name;
