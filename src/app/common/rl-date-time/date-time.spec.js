describe('common.date-time', () => {

  let rlDateTimeService;

  beforeEach(() => {
    angular.mock.module('common.date-time');
    angular.mock.inject(function(rlDateTime) {
      rlDateTimeService = rlDateTime;
    });
  });

  it('exists', () => {
    expect(rlDateTimeService).toBeDefined();
  });

  describe('dateToString() tests', () => {
    describe('given a date value and an optional filter string', () => {
      it('when the date is 2/27/2017 and no filter string is given, then it will return \'Feb 27, 2017\'', () => {
        let testDate = new Date(2017, 1, 27, 0, 0, 0);
        expect(rlDateTimeService.dateToString(testDate)).toEqual('Feb 27, 2017');
      });

      it('when the date is 2/27/2017 and the filter is \'MMM yyyy\', then it will return \'Feb 2017\'', () => {
        let testDate = new Date(2017, 1, 27, 0, 0, 0);
        expect(rlDateTimeService.dateToString(testDate, 'MMM yyyy')).toEqual('Feb 2017');
      });
    });
  });

  describe('dayOnly() tests', () => {
    describe('given a date value', () => {
      it('when the date has hours, then it will return same date but hours are zero', () => {
        let docBrown = new Date(1955, 10, 5, 3, 24, 0);
        let docBrownDay = new Date(1955, 10, 5, 0, 0, 0);
        expect(rlDateTimeService.dayOnly(docBrown)).toEqual(docBrownDay);
      });

      it('when the date is an empty string, then it will return an invalid date', () => {
        expect(isNaN(rlDateTimeService.dayOnly('').getDate())).toBeTruthy();
      });

      it('when the date is null, then it will return null', () => {
        expect(rlDateTimeService.dayOnly(null)).toBeNull();
      });
    });
  });

  describe('equals() tests', () => {
    describe('given two date values date1 and date2', () => {
      it('when date1 is 5/30/2016 and date2 is 5/30/2017, then it will return false', () => {
        let date1 = new Date(2016, 4, 30, 0, 0, 0);
        let date2 = new Date(2017, 4, 30, 0, 0, 0);
        expect(rlDateTimeService.equals(date1, date2)).toEqual(false);
      });
      it('when date1 is 5/30/2016 and date2 is 5/31/2016, then it will return false', () => {
        let date1 = new Date(2016, 4, 30, 0, 0, 0);
        let date2 = new Date(2016, 4, 31, 0, 0, 0);
        expect(rlDateTimeService.equals(date1, date2)).toEqual(false);
      });
      it('when date1 is 5/30/2016 and date2 is 5/30/2016, then it will return true', () => {
        let date1 = new Date(2016, 4, 30, 0, 0, 0);
        let date2 = new Date(2016, 4, 30, 0, 0, 0);
        expect(rlDateTimeService.equals(date1, date2)).toEqual(true);
      });
      it('when date1 and date2 are the same date object, then it will return true', () => {
        let date1 = new Date(2016, 4, 30, 0, 0, 0);
        expect(rlDateTimeService.equals(date1, date1)).toEqual(true);
      });
    });
  });

});
