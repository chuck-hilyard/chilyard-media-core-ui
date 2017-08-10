export default class ApiService {
  constructor($http, rlConfig, rlLogger) {
    'ngInject';
    this.$http = $http;
    this.gatewayUrl = rlConfig.gatewayUrl;
    // TODO Remove mediaGatewayUrl when all api calls are ported to core
    this.mediaGatewayUrl = rlConfig.mediaGatewayUrl;
    this.Logger = rlLogger;
  }

  httpRequest(method, gateway, url, source, params) {
    let config = {
      method: method,
      url: `${gateway}${url}`,
      params: params,
      responseType: 'json'
    };
    this.Logger.trace('apiRequest', config, source);
    return this.$http(config)
      .then((response) => {
        this.Logger.debug('apiRequestResponse', response, source);
        return response;
      })
      .catch((error) => {
        this.Logger.error('API Service Request Error', {
          error: error
        }, source);
      });
  }

  request(method, url, source, params) {
    return this.httpRequest(method, this.gatewayUrl, url, source, params);
  }

  /**
   * This is a temporary method used to talk to the mediaGateway
   * Used to get the global mcid and also for api calls such as used on the dashboard
   * Eventually all of these api calls will be migrated to media-core-gateway
   * TODO Once all api calls have been merged to core, remove this method
   **/
  mediaGatewayGet(url, source, params) {
    return this.httpRequest('GET', this.mediaGatewayUrl, url, source, params);
  }

}
