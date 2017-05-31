import sortableHeaderTemplate from './sortable-header.html';

class SortableHeaderController {

  $onInit() {
    // Init validation
    if (typeof this.sortState !== 'object') {
      throw new Error(`rl-sortable-header requires "sort-state" to be an object. It\'s currently "${this.sortState}".`);
    }
    if (typeof this.key !== 'string') {
      throw new Error(`rl-sortable-header requires "key" to be a string. It\'s currently "${this.sortState}".`);
    }

    this.state = angular.copy(this.sortState);
  }

  $onChanges(changes) {
    this.state = changes.sortState.currentValue;
  }

  sort() {
    if (this.state.key !== this.key) {
      this.state.key = this.key;
      this.state.desc = true;
    } else {
      this.state.desc = !this.state.desc;
    }
    this.onSort({state: this.state});
  }
}

export default {
  template: sortableHeaderTemplate,
  controller: SortableHeaderController,
  transclude: true,
  bindings: {
    key: '<',
    sortState: '<',
    onSort: '&',
  },
};

