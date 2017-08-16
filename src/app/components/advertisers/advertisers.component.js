import template from './advertisers.html';


class Controller {

  constructor($filter) {
    'ngInject';
    this.rows = [];
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
      disabled: true,
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

  handleCategorySelect(item) {
    this.categories.selected = item;
    this.subCategories.disabled = this.categories.selected ? false : true;
  }

}

export default {
  template: template,
  controller: Controller
};
