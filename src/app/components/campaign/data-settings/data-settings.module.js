import bootstrapModal from 'angular-ui-bootstrap/src/modal';
import component from './data-settings.component';
import DataSettingsModalModule from './modal/modal.module';
import DataSettingsLabelModule from './label/label.module';

export default angular
  .module('campaign.data-settings', [
    bootstrapModal,
    DataSettingsLabelModule,
    DataSettingsModalModule
  ])
  .component('campaignDataSettings', component)
  .name;
