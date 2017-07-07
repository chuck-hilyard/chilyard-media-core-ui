import Template from './label.html';

class Controller {
  constructor(DataSettingsService) {
    'ngInject';
    this.service = DataSettingsService;
    this.dataSettings = {};
  }

  $onInit() {
    this.updateDataSettings(this.settings);
  }

  $onChanges(changes) {
    if (changes.settings) {
      this.updateDataSettings(changes.settings.currentValue);
    }
  }

  updateDataSettings(settings) {
    this.dataSettings = angular.copy(settings);
    this.dataSettings.displayStart = this.service.showField(this.dataSettings, 'start');
    this.dataSettings.displayEnd = this.service.showField(this.dataSettings, 'end');
  }
}

export default {
  template: Template,
  controller: Controller,
  bindings: {
    settings: '<'
  }
};
