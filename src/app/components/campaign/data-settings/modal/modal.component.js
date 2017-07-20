import Template from './modal.html';

const tabNumber = {
  cycles: 0,
  months: 1,
  days: 2
};

class Controller {
  constructor(ModalService) {
    'ngInject';
    this.service = ModalService;
  }

  $onInit() {
    this.workingSettings = angular.copy(this.resolve.settings);
    this.ranges = angular.copy(this.resolve.ranges);
    this.activeTab = tabNumber[this.workingSettings.breakdownType];
    this.service.initialize(this.resolve);
    this.options = this.service.getOptions(this.workingSettings);
  }

  onStartMonthClick(active) {
    if (!this.options.start.minDate || active >= this.options.start.minDate) {
      this.workingSettings.start = active;
    } else {
      this.workingSettings.start = this.options.start.minDate;
    }
    this.onWorkingSettingsChange();
  }

  onEndMonthClick(active) {
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
    if (this.workingSettings.breakdownType !== tabName) {
      this.workingSettings = this.service.getDefaultSettings(tabName);
      this.options = this.service.getOptions(this.workingSettings);
    }
  }

  setRange(workingSettings) {
    this.workingSettings = angular.copy(workingSettings);
    this.onWorkingSettingsChange();
  }

  onWorkingSettingsChange() {
    this.service.setRangeName(this.workingSettings);
    this.options = this.service.updateOptions(this.workingSettings);
    this.workingSettings = angular.copy(this.workingSettings);
  }

  handleCycleStartSelect(item) {
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
