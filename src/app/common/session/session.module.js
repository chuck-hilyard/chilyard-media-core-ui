import Session from './session.service.js';

export default angular
  .module('common.session', [])
  .service('Session', Session)
  .name;
