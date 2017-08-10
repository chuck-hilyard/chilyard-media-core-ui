import uiRouter from 'angular-ui-router';

export default angular
  .module('common.route-helper', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('external', {
        externalUrl: {
          app: '',
          url: () => '/error'
        }
      })
      .state('external.campaign-adgroups', {
        externalUrl: {
          app: 'madmin',
          url: (gmcid) => `/#/campaign/${gmcid}/adgroups`
        }
      })
      .state('external.campaign-creatives', {
        externalUrl: {
          app: 'madmin',
          url: (gmcid) => `/#/campaign/${gmcid}/creatives`
        }
      })
      .state('external.campaign-keywords', {
        externalUrl: {
          app: 'madmin',
          url: (gmcid) => `/#/campaign/${gmcid}/keywords`
        }
      })
      .state('external.campaign-adextensions', {
        externalUrl: {
          app: 'madmin',
          url: (gmcid) => `/#/campaign/${gmcid}/callouts`
        }
      });
  })
  .run(($rootScope, $transitions, $window, $log, rlConfig, rlCurrentCampaign) => {
    'ngInject';
    $transitions.onStart({}, function(trans) {
      let toState = trans.to();
      if (toState.externalUrl) {
        try {
          let url = toState.externalUrl.url(rlCurrentCampaign.gmcid);
          $window.open(rlConfig.app[toState.externalUrl.app] + url, '_self');
          return false;
        }
        catch (err) {
          $log.error(err);
        }
      }
      return true;
    });
  })
  .name;
