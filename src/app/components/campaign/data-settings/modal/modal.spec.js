import mockLogger from '../../../../../../test/mocks/common/mock-logger';

describe('components.campaign.data-settings.modal', () => {
  let mockModalService = {
    initialize: angular.noop,
    getOptions: () => mockOptions,
    setRangeName: angular.noop,
    updateOptions: angular.noop,
    getDefaultSettings: () => mockSettings
  };
  let mockSettings = {
    breakdownType: 'days',
    start: new Date(2017, 2, 5, 0, 0, 0),
    end: new Date(2017, 3, 7, 0, 0, 0)
  };
  let mockRanges = {
    cycles: [],
    months: [],
    days: []
  };
  let mockOptions = {
    start: {
      minDate: new Date(2017, 1, 5, 0, 0, 0)
    },
    end: {
      minDate: new Date(2017, 1, 5, 0, 0, 0),
      maxDate: new Date(2017, 4, 7, 0, 0, 0)
    }
  };
  let mockResolve = {
    settings: mockSettings,
    ranges: mockRanges
  };
  let $ctrl;

  beforeEach(() => {
    angular.mock.module('campaign.data-settings.modal', ($provide) => {
      $provide.value('ModalService', mockModalService);
      $provide.value('rlLogger', mockLogger);
    });

    let bindings = {
      resolve: mockResolve
    };

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('campaignDataSettingsModal', {}, bindings);
    });
  });

  it('constructs', () => {
    expect($ctrl.service).toBeDefined();
  });

  it('$onInit', () => {
    spyOn(mockModalService, 'initialize');
    $ctrl.$onInit();
    expect($ctrl.workingSettings).toEqual(mockSettings);
    expect($ctrl.ranges).toEqual(mockRanges);
    expect(mockModalService.initialize).toHaveBeenCalled();
  });

  describe('onStartMonthClick', () => {
    describe('given the min date is 2/5/2017', () => {
      it('when the user clicks on the month Mar 2017, then the start date should be 3/1/2017', () => {
        let clickedMonth = new Date(2017, 2, 1, 0, 0, 0);
        $ctrl.$onInit();
        $ctrl.onStartMonthClick(clickedMonth);
        expect($ctrl.workingSettings.start).toEqual(clickedMonth);
      });

      it('when the user clicks on the month Feb 2017, then the start date should be 2/5/2017', () => {
        let clickedMonth = new Date(2017, 1, 1, 0, 0, 0);
        $ctrl.$onInit();
        $ctrl.onStartMonthClick(clickedMonth);
        expect($ctrl.workingSettings.start).toEqual(mockOptions.start.minDate);
      });
    });
  });

  describe('onEndMonthClick', () => {
    describe('given the min date is 2/5/2017 and max date is 5/7/2017', () => {
      it('when the user clicks on the month Mar 2017, then the end date should be 3/1/2017', () => {
        let clickedMonth = new Date(2017, 2, 1, 0, 0, 0);
        $ctrl.$onInit();
        $ctrl.onEndMonthClick(clickedMonth);
        expect($ctrl.workingSettings.end).toEqual(clickedMonth);
      });

      it('when the user clicks on the month Feb 2017, then the start date should be 2/5/2017', () => {
        let clickedMonth = new Date(2017, 1, 1, 0, 0, 0);
        $ctrl.$onInit();
        $ctrl.onEndMonthClick(clickedMonth);
        expect($ctrl.workingSettings.end).toEqual(mockOptions.end.minDate);
      });

      it('when the user clicks on the month June 2017, then the start date should be 5/7/2017', () => {
        let clickedMonth = new Date(2017, 5, 1, 0, 0, 0);
        $ctrl.$onInit();
        $ctrl.onEndMonthClick(clickedMonth);
        expect($ctrl.workingSettings.end).toEqual(mockOptions.end.maxDate);
      });
    });
  });

  describe('selectTab', () => {
    describe('given we are on the days tab', () => {
      it('when the user clicks the cycles tab, then it will get the default settings for cycles', () => {
        spyOn(mockModalService, 'getDefaultSettings');
        $ctrl.$onInit();
        $ctrl.selectTab('cycles');
        expect(mockModalService.getDefaultSettings).toHaveBeenCalledWith('cycles');
      });

      it('when the user clicks the days tab, then it will not get the default settings', () => {
        spyOn(mockModalService, 'getDefaultSettings');
        $ctrl.$onInit();
        $ctrl.selectTab('days');
        expect(mockModalService.getDefaultSettings).not.toHaveBeenCalled();
      });
    });
  });

  describe('setRange', () => {
    describe('given workingSettings of cycle 1 thru cycle 3', () => {
      it('sets the workingSettings to the given settings', () => {
        $ctrl.$onInit();
        let testSettings = {
          breakdownType: 'cycles',
          start: {
            cycleNumber: 1
          },
          end: {
            cycleNumber: 3
          }
        };
        $ctrl.setRange(testSettings);
        expect($ctrl.workingSettings.start.cycleNumber).toEqual(1);
        expect($ctrl.workingSettings.end.cycleNumber).toEqual(3);
      });
    });
  });

  describe('onWorkingSettingsChange', () => {
    describe('given workingSettings of type days, start 3/5/2017, end 4/7/2017', () => {
      it('should reset the range name for the settings', () => {
        spyOn(mockModalService, 'setRangeName');
        $ctrl.$onInit();
        $ctrl.onWorkingSettingsChange();
        expect(mockModalService.setRangeName).toHaveBeenCalled();
      });

      it('should update the options', () => {
        spyOn(mockModalService, 'updateOptions');
        $ctrl.$onInit();
        $ctrl.onWorkingSettingsChange();
        expect(mockModalService.updateOptions).toHaveBeenCalled();
      });

      it('should set working settings to a copy of the original working settings', () => {
        $ctrl.$onInit();
        let priorWorkingSettings = $ctrl.workingSettings;
        $ctrl.onWorkingSettingsChange();
        expect($ctrl.workingSettings).not.toBe(priorWorkingSettings);
        expect($ctrl.workingSettings).toEqual(priorWorkingSettings);
      });
    });

    describe('handleCycleStartSelect', () => {
      describe('given selected item of cycle 3', () => {
        it('should set working settings start to a copy of the selected item', () => {
          let selectedItem = {cycleNumber: 3};
          $ctrl.$onInit();
          $ctrl.handleCycleStartSelect(selectedItem);
          expect($ctrl.workingSettings.start).not.toBe(selectedItem);
          expect($ctrl.workingSettings.start).toEqual(selectedItem);
        });
      });
    });

    describe('handleCycleEndSelect', () => {
      describe('given selected item of cycle 3', () => {
        it('should set working settings end to a copy of the selected item', () => {
          let selectedItem = {cycleNumber: 3};
          $ctrl.$onInit();
          $ctrl.handleCycleEndSelect(selectedItem);
          expect($ctrl.workingSettings.end).not.toBe(selectedItem);
          expect($ctrl.workingSettings.end).toEqual(selectedItem);
        });
      });
    });

  });

});
