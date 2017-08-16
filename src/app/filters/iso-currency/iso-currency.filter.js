/**
 * wraps angular's currency filter with an additional layer, in case the currency symbol is not available.
 */

import common from './iso-currency.service';

export default angular
  .module('isoCurrency', [
    common
  ])
  .filter('isoCurrency', ($filter, IsoCurrencyService) => {
    'ngInject';

    return (amount, currencyCode, fraction) => {
      const currency = IsoCurrencyService.getCurrencyByCode(currencyCode);

      if (!currency) {
        return amount;
      }

      const fractionSize = (fraction === void 0) ? currency.fraction : fraction;
      return $filter('currency')(amount, currency.symbol || (currencyCode + ' '), fractionSize);
    };

  })
  .name;
