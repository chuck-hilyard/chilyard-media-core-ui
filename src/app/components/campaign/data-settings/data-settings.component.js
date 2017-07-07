import Template from './data-settings.html';

class Controller {
  constructor(DataSettingsService, $uibModal) {
    'ngInject';
    this.service = DataSettingsService;
    this.$uibModal = $uibModal;
    this.dataSettings = DataSettingsService.getSelectedSettings();
  }

  $onInit() {
    //this.updateSettingsData(this.cycles);
  }

  $onChanges(changes) {
    if (changes.cycles) {
      this.cycles = angular.copy(changes.cycles.currentValue);
      this.updateSettingsData(this.cycles);
    }
  }

  updateSettingsData(cycles) {
    this.service.setRanges(cycles);
    this.dataSettings = this.service.getSelectedSettings();
  }

  dataSettingsModal() {
    let instance = this.$uibModal.open({
      component: 'campaignDataSettingsModal',
      size: 'lg',
      resolve: {
        cycles: () => this.cycles,
        settings: () => this.service.getSelectedSettings(),
        ranges: () => this.service.ranges
      }
    });

    instance.result
      .then((response) => {
        this.service.selectRange(response.settings);
        this.dataSettings = this.service.getSelectedSettings();
      })
      .catch(() => {
        // Prevent unhandled rejection error
        angular.noop();
      });
  }
}

export default {
  template: Template,
  controller: Controller,
  bindings: {
    cycles: '<'
  }
};
