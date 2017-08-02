import apiService from './api.service.js';

export default angular
  .module('common.api', [])
  .service('rlApi', apiService)
  .name;
