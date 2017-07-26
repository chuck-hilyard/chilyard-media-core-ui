import Template from './modal.html';
const me = 'Modal Component';

const tabNumber = {
  cycles: 0,
  months: 1,
  days: 2
};

class Controller {
  constructor(ModalService, rlLogger) {
    'ngInject';
    this.service = ModalService;
    this.Logger = rlLogger;
  }

  $onInit() {
    this.Logger.trace('$onInit', this.resolve, me);
    this.workingSettings = angular.copy(this.resolve.settings);
    this.ranges = angular.copy(this.resolve.ranges);
    this.activeTab = tabNumber[this.workingSettings.breakdownType];
    this.service.initialize(this.resolve);
    this.options = this.service.getOptions(this.workingSettings);
  }

  onStartMonthClick(active) {
    this.Logger.trace('onStartMonthClick', active, me);
    if (!this.options.start.minDate || active >= this.options.start.minDate) {
      this.workingSettings.start = active;
    }
    else {
      this.workingSettings.start = this.options.start.minDate;
    }
    this.onWorkingSettingsChange();
  }

  onEndMonthClick(active) {
    this.Logger.trace('onEndMonthClick', active, me);
    this.workingSettings.end = active;
    if (active < this.options.end.minDate) {
      this.workingSettings.end = this.options.end.minDate;
    }
    if (active > this.options.end.maxDate) {
      this.workingSettings.end = this.options.end.maxDate;
    }
    this.onWorkingSettingsChange();
  }

  cancel() {
    this.dismiss();
  }

  selectTab(tabName) {
    this.Logger.trace('selectTab', tabName, me);
    if (this.workingSettings.breakdownType !== tabName) {
      this.workingSettings = this.service.getDefaultSettings(tabName);
      this.options = this.service.getOptions(this.workingSettings);
    }
  }

  setRange(workingSettings) {
    this.Logger.trace('setRange', workingSettings, me);
    this.workingSettings = angular.copy(workingSettings);
    this.onWorkingSettingsChange();
  }

  onWorkingSettingsChange() {
    this.Logger.trace('onWorkingSettingsChange', this.workingSettings, me);
    this.service.setRangeName(this.workingSettings);
    this.options = this.service.updateOptions(this.workingSettings);
    this.workingSettings = angular.copy(this.workingSettings);
  }

  handleCycleStartSelect(item) {
    this.Logger.trace('handleCycleStartSelect', item, me);
    this.workingSettings.start = angular.copy(item);
    this.onWorkingSettingsChange();
  }

  handleCycleEndSelect(item) {
    this.workingSettings.end = angular.copy(item);
    this.onWorkingSettingsChange();
  }

  update() {
    this.close({
      $value: {
        settings: this.workingSettings
      }
    });
  }

}

export default {
  template: Template,
  controller: Controller,
  bindings: {
    close: '&',
    dismiss: '&',
    resolve: '<'
  }
};
