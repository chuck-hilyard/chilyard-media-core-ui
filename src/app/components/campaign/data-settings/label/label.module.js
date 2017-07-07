import component from './label.component';
import './label.scss';
import DataSettingServiceModule from '../data-settings-service/data-settings-service.module';

export default angular
  .module('campaign.data-settings.label', [DataSettingServiceModule])
  .component('campaignDataSettingsLabel', component)
  .name;
