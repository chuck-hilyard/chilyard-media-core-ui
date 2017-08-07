/**
 * Defines Webpack globals into an Angular Service.
 *
 */

class service {

  constructor() {
    /*eslint no-undef: "off"*/
    this.languages = LANGUAGES;
    this.gatewayUrl = GATEWAY_URL;
    this.featureFlags = FEATURE_FLAGS;
    this.logLevel = LOG_LEVEL;
    this.loggingUrl = LOGGING_URL;
    this.appName = 'Media Facebook UI';
  }

}

export default angular
  .module('common.rlConfig', [])
  .service('rlConfig', service)
  .name;
