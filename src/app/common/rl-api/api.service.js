export default class ApiService {
  constructor($http, rlConfig, rlLogger) {
    'ngInject';
    this.$http = $http;
    this.gatewayUrl = rlConfig.gatewayUrl;
    this.Logger = rlLogger;
  }

  request(method, url, source, params) {
    let config = {
      method: method,
      url: `${this.gatewayUrl}${url}`,
      params: params,
      responseType: 'json'
    };
    this.Logger.trace('apiRequest', config, source);
    return this.$http(config)
      .catch((error) => {
        this.Logger.error('apiRequest Error', {error: error}, source);
      });
  }

}
