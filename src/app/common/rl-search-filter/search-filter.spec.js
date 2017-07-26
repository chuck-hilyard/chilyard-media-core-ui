import mocks from './search-filter.mocks';

describe('search-filter', () => {
  let $filter;

  beforeEach(() => {
    angular.mock.module('common.search-filter');

    angular.mock.inject((_$filter_) => {
      $filter = _$filter_;
    });
  });

  describe('given list containing flopsy, mopsy and cotton tail with name, id and email', () => {
    it('when search for "", then the result will contain all of the elements', () => {
      let list = mocks.list;
      let showFields = mocks.showFieldsNames;
      let testWord = '';
      let result = $filter('rlSearchFilter')(list, testWord, showFields);

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(3);
      expect(result[0].name).toEqual('Flopsy');
      expect(result[1].name).toEqual('Mopsy');
      expect(result[2].name).toEqual('Cotton Tail');
    });

    it('when search for "opsy" in name field, then the result will contain only the flopsy and mopsy objects', () => {
      let list = mocks.list;
      let showFields = mocks.showFieldsName;
      let testWord = 'opsy';
      let result = $filter('rlSearchFilter')(list, testWord, showFields);

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(2);
      expect(result[0].name).toEqual('Flopsy');
      expect(result[1].name).toEqual('Mopsy');
    });

    it('when search for "opsy" in id field only, then the result will be []', () => {
      let list = mocks.list;
      let showFields = mocks.showFieldsId;
      let testWord = 'opsy';
      let result = $filter('rlSearchFilter')(list, testWord, showFields);

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(0);
    });

    it('when search for "opsy" in all 3 fields, then the result will contain all of the elements', () => {
      let list = mocks.list;
      let showFields = mocks.showFieldsAll;
      let testWord = 'opsy';
      let result = $filter('rlSearchFilter')(list, testWord, showFields);

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(3);
      expect(result[0].name).toEqual('Flopsy');
      expect(result[1].name).toEqual('Mopsy');
      expect(result[2].name).toEqual('Cotton Tail');
    });

    it('when search for "Mopsy" in all 3 fields, then the result will contain mopsy and cotton tail only', () => {
      let list = mocks.list;
      let showFields = mocks.showFieldsAll;
      let testWord = 'Mopsy';
      let result = $filter('rlSearchFilter')(list, testWord, showFields);

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(2);
      expect(result[0].name).toEqual('Mopsy');
      expect(result[1].name).toEqual('Cotton Tail');
    });

    it('when search for  "125" in all 3 fields, then the result will contain cotton tail only', () => {
      let list = mocks.list;
      let showFields = mocks.showFieldsAll;
      let testWord = '125';
      let result = $filter('rlSearchFilter')(list, testWord, showFields);

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(1);
      expect(result[0].name).toEqual('Cotton Tail');
    });

    it('when search for  "125" in name and email fields, then the result will be []', () => {
      let list = mocks.list;
      let showFields = mocks.showFieldsNameEmail;
      let testWord = '125';
      let result = $filter('rlSearchFilter')(list, testWord, showFields);

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(0);
    });

    it('when search for  "Mo 5" in all fields, then the result will be cotton tail', () => {
      let list = mocks.list;
      let showFields = mocks.showFieldsAll;
      let testWord = 'Mopsy 5';
      let result = $filter('rlSearchFilter')(list, testWord, showFields);

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(1);
      expect(result[0].name).toEqual('Cotton Tail');
    });

    it('when search for  "mopsy@yahoo.com" in all fields, then the result will be cotton tail', () => {
      let list = mocks.list;
      let showFields = mocks.showFieldsAll;
      let testWord = 'mopsy@yahoo.com';
      let result = $filter('rlSearchFilter')(list, testWord, showFields);

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(1);
      expect(result[0].name).toEqual('Mopsy');
    });

  });

});
