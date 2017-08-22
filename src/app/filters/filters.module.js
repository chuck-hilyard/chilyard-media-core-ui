import isoCurrency from './iso-currency/iso-currency.filter';
import flexnumber from './flexnumber.filter';
import multiFilter from './multi-filter.filter';
import sortNulls from './sortNulls.filter';
import facebookAdvertiser from './fb-advertiser.filter';
import facebookChannel from './fb-channel.filter';

export default angular
  .module('filters', [
    isoCurrency,
    flexnumber,
    multiFilter,
    sortNulls,
    facebookAdvertiser,
    facebookChannel
  ])
  .name;
