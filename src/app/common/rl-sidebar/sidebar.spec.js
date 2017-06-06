import mocks from './sidebar.mocks';


describe('common.sidebar', () => {

  let $ctrl;
  let $cookies;
  let mockEvent = {
    preventDefault: angular.noop,
    stopImmediatePropagation: angular.noop
  };

  beforeEach(() => {
    angular.mock.module('common.sidebar');

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $cookies = $injector.get('$cookies');
      let locals = {
        $cookies: $cookies,
        $state: mocks.state
      };
      let bindings = {
        links: mocks.links,
        onToggle: angular.noop
      };
      $ctrl = $componentController('rlSidebar', locals, bindings);
    });
  });

  it('constructs', () => {
    spyOn($cookies, 'get');
    $ctrl.$onInit();
    expect($ctrl.accordion).toEqual([false, true]);
    expect($ctrl.collapsed).toBeFalsy();
    expect($cookies.get).toHaveBeenCalledWith('sidebar');
  });

  it('toggle menu accordion', () => {
    $ctrl.accordionToggle(mockEvent, 0);
    expect($ctrl.accordion[0]).toBeTruthy();
  });

  it('toggle sidebar collapse', () => {
    spyOn($cookies, 'put');
    $ctrl.sidebarToggle();
    expect($ctrl.collapsed).toBeTruthy();
    $ctrl.sidebarToggle();
    expect($ctrl.collapsed).toBeFalsy();
    expect($cookies.put).toHaveBeenCalledTimes(2);
  });

});
