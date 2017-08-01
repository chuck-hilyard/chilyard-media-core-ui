const me = 'API Service';


export default class ApiService {

  constructor($http, rlConfig, rlLogger) {
    'ngInject';
    this.$http = $http;
    this.gatewayUrl = rlConfig.gatewayUrl;
    this.Logger = rlLogger;
  }

  request(method, url, params) {
    let traceData = {
      method: method,
      gatewayUrl: this.gatewayUrl,
      url: url,
      params: params,
      responseType: 'json'
    };
    this.Logger.trace('apiRequest', traceData, me);
    return this.$http({
      method: method,
      url: `${this.gatewayUrl}${url}`,
      params: params
    })
    .catch((error) => {
      this.Logger.error('apiRequest Error', {error: error}, me);
    });
  }

}
