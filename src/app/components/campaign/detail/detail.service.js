const me = 'Campaign Detail Service';


export default class Service {

  constructor(rlApi) {
    'ngInject';
    this.api = rlApi;
  }

  getAgeGenderData(mcid, breakdown, params) {
    return this.api.request('GET', `/campaigns/${mcid}/age-gender-stats-summary/${breakdown}`, me, params);
  }

  getDeviceData(mcid, breakdown, params) {
    return this.api.request('GET', `/campaigns/${mcid}/device-stats-summary/${breakdown}`, me, params);
  }

  getPerformanceData(mcid, breakdown, params) {
    return this.api.request('GET', `/campaigns/${mcid}/performance-stats/${breakdown}`, me, params);
  }

}
