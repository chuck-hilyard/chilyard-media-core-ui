/**
 * Defines Webpack globals into an Angular Service.
 *
 */

class service {

  constructor() {
    this.languages = LANGUAGES;
    this.gatewayUrl = GATEWAY_URL;
    this.featureFlags = FEATURE_FLAGS;
  }

}

export default angular
  .module('common.rlConfig', [])
  .service('rlConfig', service)
  .name;
