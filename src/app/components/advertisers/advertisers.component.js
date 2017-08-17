import template from './advertisers.html';


class Controller {

  constructor($filter) {
    'ngInject';

    this.rows = [];
    this.filters = {};
    this.searchInputs = {
      advertiser: null,
      business: null,
      category: null,
      subCategory: null
    };
    this.categories = {
      list: [{
        name: 'Home Improvement',
        id: 1
      }, {
        name: 'Auto Dealership',
        id: 2
      }],
      placeholder: $filter('translate')('advertisers.advertiserCategoryPlaceholder')
    };
    this.subCategories = {
      list: [{
        name: 'Plumber',
        id: 1
      }, {
        name: 'Electrician',
        id: 2
      }],
      placeholder: $filter('translate')('advertisers.advertiserSubCategoryPlaceholder')
    };
  }

  $onInit() {
    for (let i = 0; i < 25; i++) {
      this.rows.push(Math.random() * 10);
    }
  }

  clearFilters() {
    this.filters = {};
    angular.forEach(this.searchInputs, (value, key) => {
      this.searchInputs[key] = null;
    });
  }

  hasFilters() {
    return Object.keys(this.filters).length > 0;
  }

  setFilter(key, item) {
    this.filters[key] = item;
    this.searchInputs[key] = item;
  }

}

export default {
  template: template,
  controller: Controller
};
