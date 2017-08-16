/**
 * Allow the user to format a number using one of these
 * 'standard' formats
 * Usage:  {{ 123 | flexnumber:percent }} becomes "123.00%"
 */
export default angular
  .module('filters.flexnumber', [])
  .filter('flexnumber', ($filter) => {
    'ngInject';

    return (input, filterName, currency) => {
      if (input === undefined || input === '' || input === null || !isFinite(input)) {
        return 'N/A';
      }
      else {
        input = parseFloat(input);
        if (currency === undefined) {
          currency = 'USD';
        }

        if (filterName === 'currency' || filterName === 'isoCurrency') {
          return $filter('isoCurrency')(input, currency);
        }

        if (filterName === 'nonZeroCurrency') {
          if (input === 0){
            return 'N/A';
          }
          return $filter('isoCurrency')(input, currency);
        }

        if (filterName === 'integer') {
          return $filter('number')(input, 0);
        }

        if (filterName === 'nonZeroInteger') {
          if (input === 0) {
            return 'N/A';
          }
          return $filter('number')(input, 0);
        }

        if (filterName === 'decimal') {
          return $filter('number')(input, 2);
        }

        if (filterName === 'percent') {
          return $filter('number')(input * 100, 2) + '%';
        }

        if (filterName == 'nonZeroPercent') {
          if (input === 0) {
            return 'N/A';
          }
          return $filter('number')(input * 100, 2) + '%';
        }

        return input;
      }
    };

  })
  .name;

