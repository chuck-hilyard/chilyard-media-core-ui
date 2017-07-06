import tooltip from 'angular-ui-bootstrap/src/tooltip';
import component from './performance.component';
import './performance.scss';

export default angular
  .module('campaign.detail.performance', [
    tooltip
  ])
  .config(($uibTooltipProvider) => {
    'ngInject';

    $uibTooltipProvider.options({
      appendToBody: true,
      placement: 'auto bottom'
    });
  })
  .component('campaignPerformance', component)
  .name;
