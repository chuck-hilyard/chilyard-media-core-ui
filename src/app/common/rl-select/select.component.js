import selectTemplate from './select.html';

class SelectController {
  constructor() {
    'ngInject';

    this.list = [];
    this.selected = {};
    this.showFields = ['name'];
    this.search = '';
  }

  $onInit() {
    this.updateData(this.options);
  }

  $onChanges(changes) {
    if (changes.options) {
      this.updateData(changes.options.currentValue);
    }
  }

  selectItem(item) {
    this.selected = item;
    this.onSelect({
      item: item
    });
  }

  isSelected(item) {
    let itemSelected = true;
    this.showFields.forEach((field) => {
      if (item[field] !== this.selected[field]) {
        itemSelected = false;
      }
    });

    return itemSelected;
  }

  updateData(options) {
    if (options.selected) {
      this.selected = options.selected;
    }
    if (options.list) {
      this.list = options.list;
    }
    if (options.showFields) {
      this.showFields = options.showFields;
    }
  }
}

export default {
  template: selectTemplate,
  controller: SelectController,
  bindings: {
    options: '<',
    onSelect: '&',
  },
};
