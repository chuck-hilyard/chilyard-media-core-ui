import isoCurrency from './iso-currency/iso-currency.filter';
import flexnumber from './flexnumber.filter';

export default angular
  .module('filters', [
    isoCurrency,
    flexnumber
  ])
  .name;
