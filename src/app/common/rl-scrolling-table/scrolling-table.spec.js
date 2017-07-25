import validTemplate from './mock-data/valid.template';
import noHeaderTemplate from './mock-data/no-header.template';
import noBodyTemplate from './mock-data/no-body.template';

describe('common.scrolling-table', () => {
  let compile, scope;

  let getCompiledElement = (template) => {
    let element = angular.element(template);
    let compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
  };

  let mockLogger = {
    error: angular.noop,
    info: angular.noop,
    trace: angular.noop
  };

  beforeEach(() => {
    angular.mock.module('common.scrolling-table', ($provide) => {
      $provide.value('rlLogger', mockLogger);
    });

    angular.mock.inject(($injector) => {
      compile = $injector.get('$compile');
      scope = $injector.get('$rootScope').$new();
    });

    spyOn(mockLogger, 'error');
  });

  it('should split each table', () => {
    let directiveElem = getCompiledElement(validTemplate);
    let tables = directiveElem.find('table');
    let expected = [
      'Header 1',
      'Static 1Static 2',
      'Header 2',
      'Scrolling 1Scrolling 2'
    ];
    expect(directiveElem).toBeDefined();
    expect(tables.length).toBe(4);
    angular.forEach(tables, (table, index) => {
      expect(angular.element(table).text()).toBe(expected[index]);
    });
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  it('should log error if no `header-table`', () => {
    let directiveElem = getCompiledElement(noHeaderTemplate);
    expect(directiveElem).toBeDefined();
    expect(mockLogger.error).toHaveBeenCalledWith(
      'rlScrollingTable trancluded HTML is missing required header table elements',
      {headerTable: jasmine.anything()},
      'Scrolling Table Directive'
    );
  });

  it('should log error if no `body-table`', () => {
    let directiveElem = getCompiledElement(noBodyTemplate);
    expect(directiveElem).toBeDefined();
    expect(mockLogger.error).toHaveBeenCalledWith(
      'rlScrollingTable trancluded HTML is missing required body table elements',
      {bodyTable: jasmine.anything()},
      'Scrolling Table Directive'
    );
  });

});
