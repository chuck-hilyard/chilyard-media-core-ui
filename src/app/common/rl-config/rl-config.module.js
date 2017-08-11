/**
 * Defines Webpack globals into an Angular Service.
 *
 */

class service {

  constructor() {
    /*eslint no-undef: "off"*/
    this.languages = LANGUAGES;
    this.gatewayUrl = GATEWAY_URL;
    this.mediaGatewayUrl = MEDIA_GATEWAY_URL;
    this.featureFlags = FEATURE_FLAGS;
    this.logLevel = LOG_LEVEL;
    this.logInterval = LOG_INTERVAL;
    this.loggingUrl = LOGGING_URL;
    this.platform = PLATFORM;
    this.appName = 'Media Core UI';
    this.app = {
      madmin: MADMIN_UI,
      search: '',
      social: '',
      display: ''
    };
  }

}

export default angular
  .module('common.rlConfig', [])
  .service('rlConfig', service)
  .name;
