import Template from './data-settings.html';

class Controller {
  constructor(DataSettingsService, $uibModal) {
    'ngInject';
    this.service = DataSettingsService;
    this.$uibModal = $uibModal;
    this.dataSettings = DataSettingsService.getSelectedSettings();
  }

  $onInit() {
    this.cycles = mapCycles(this.campaignCycles);
  }

  $onChanges(changes) {
    if (changes.campaignCycles) {
      this.cycles = mapCycles(changes.campaignCycles.currentValue);
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

function getDateRange(cycle) {
  let range = cycle.startDate || '-/-/-';
  range += ' to ';
  range += cycle.endDate || '-/-/-';
  return range;
}

function mapCycles(cycles) {
  return {
    currentCycleIndex: cycles.currentCycleIndex,
    cycles: cycles.cycles.map((cycle) => {
      return angular.extend({}, cycle, {
        dateRange: getDateRange(cycle)
      });
    })
  };
}

export default {
  template: Template,
  controller: Controller,
  bindings: {
    campaignCycles: '<'
  }
};
