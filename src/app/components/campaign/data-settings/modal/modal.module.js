import datepicker from 'angular-ui-bootstrap/src/datepicker';
import tabs from 'angular-ui-bootstrap/src/tabs';
import component from './modal.component';
import './modal.scss';

export default angular
  .module('campaign.data-settings.modal', [
    datepicker,
    tabs
  ])
  .component('campaignDataSettingsModal', component)
  .name;
