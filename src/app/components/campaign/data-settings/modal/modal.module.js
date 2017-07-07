import datepicker from 'angular-ui-bootstrap/src/datepicker';
import tabs from 'angular-ui-bootstrap/src/tabs';
import DataSettingServiceModule from '../data-settings-service/data-settings-service.module';
import component from './modal.component';
import './modal.scss';

export default angular
  .module('campaign.data-settings.modal', [
    datepicker,
    tabs,
    DataSettingServiceModule
  ])
  .component('campaignDataSettingsModal', component)
  .name;
