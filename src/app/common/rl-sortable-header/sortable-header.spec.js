describe('common.sortable-header', () => {

  let $ctrl;

  let setup = () => {
    $ctrl.state = null;
    $ctrl.sortState = {};
    $ctrl.key = 'foo';
    $ctrl.$onInit();
  };

  beforeEach(() => {
    angular.mock.module('common.sortable-header');

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      let bindings = {
        onSort: angular.noop
      };
      $ctrl = $componentController('rlSortableHeader', {}, bindings);
    });
  });

  it('throws error if `sort-state` undefined', () => {
    let init = () => {
      $ctrl.$onInit();
    };
    expect(init).toThrow(new Error('rl-sortable-header requires \"sort-state\" to be an object. It\'s currently \"undefined\".'));
  });

  it('throws error if `key` undefined', () => {
    $ctrl.sortState = {};
    let init = () => {
      $ctrl.$onInit();
    };
    expect(init).toThrow(new Error('rl-sortable-header requires \"key\" to be a string. It\'s currently \"[object Object]\".'));
  });

  it('intializes correctly', () => {
    setup();
    expect($ctrl.state).toEqual({});
  });

  it('sorts', () => {
    setup();
    $ctrl.sort();
    let expected = {
      key: 'foo',
      desc: true
    };
    expect($ctrl.state).toEqual(expected);
  });

  it('sorts twice', () => {
    setup();
    $ctrl.sort();
    $ctrl.sort();
    let expected = {
      key: 'foo',
      desc: false
    };
    expect($ctrl.state).toEqual(expected);
  });

  it('updates $onChange', () => {
    setup();
    $ctrl.$onChanges({
      sortState: {
        currentValue: {
          key: 'bar',
          desc: true
        }
      }
    });
    let expected = {
      key: 'bar',
      desc: true
    };
    expect($ctrl.state).toEqual(expected);
  });

});
