import Template from './data-settings.html';

class Controller {
  constructor($uibModal) {
    'ngInject';
    this.$uibModal = $uibModal;
  }

  $onChanges(changes) {
    if (changes.currentDataSettings) {
      this.dataSettings = changes.currentDataSettings.currentValue;
    }
    if (changes.campaignCycles) {
      this.cycles = changes.campaignCycles.currentValue;
    }
  }

  dataSettingsModal() {
    let instance = this.$uibModal.open({
      component: 'campaignDataSettingsModal',
      size: 'lg',
      resolve: {
        cycles: () => this.cycles,
        settings: () => this.dataSettings.selectedSettings,
        ranges: () => this.dataSettings.ranges
      }
    });

    instance.result
      .then((response) => {
        this.onUpdateDataSettings({
          settings: response.settings
        });
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
    currentDataSettings: '<',
    campaignCycles: '<',
    onUpdateDataSettings: '&'
  }
};
