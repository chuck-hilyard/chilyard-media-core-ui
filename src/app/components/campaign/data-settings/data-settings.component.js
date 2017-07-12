import Template from './data-settings.html';

class Controller {
  constructor(DataSettings, $uibModal, rlDateTime) {
    'ngInject';
    this.service = DataSettings;
    this.rlDateTime = rlDateTime;
    this.$uibModal = $uibModal;
    this.dataSettings = DataSettings.getSelectedSettings();
  }

  $onInit() {
    this.cycles = mapCycles(this.rlDateTime, this.campaignCycles);
  }

  $onChanges(changes) {
    if (changes.campaignCycles) {
      this.cycles = mapCycles(this.rlDateTime, changes.campaignCycles.currentValue);
      this.updateSettingsData(this.cycles);
    }
  }

  updateSettingsData(cycles) {
    this.service.setRanges(cycles, this.mcid);
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

function mapCycles(DateTime, cycles) {
  return {
    currentCycleIndex: cycles.currentCycleIndex,
    cycles: cycles.cycles.map((cycle) => {
      return angular.extend({}, cycle, {
        dateRange: getDateRange(cycle),
        startDateObj: DateTime.newDate(cycle.startDate),
        endDateObj: DateTime.newDate(cycle.endDate),
        cycleNumberStr: 'app.cycle ' + cycle.cycleNumber
      });
    })
  };
}

function getDateRange(cycle) {
  let range = cycle.startDate || '-/-/-';
  range += ' to ';
  range += cycle.endDate || '-/-/-';
  return range;
}

export default {
  template: Template,
  controller: Controller,
  bindings: {
    campaignCycles: '<',
    mcid: '<'
  }
};
