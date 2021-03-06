/**
 *  This component provides a general, non-dropdown way to select
 *  an item from a list of objects
 *
 *  It allows you to configure which fields to show, including custom
 *  labels if desired.
 *
 *  options: {
 *    selected: this.selected,  // the currently selected item
 *    list: // array of objects to select from
 *          [{name: 'first', id: 32332, other: 'red'},
 *           {name: 'second', id: 32333, other: 'green'},
 *           {name: 'last', id: 32334, other: 'pink'}],
 *    showFields: // array of fields to show, include optional label and/or class
 *          [{field: 'name'},
 *           {field: 'other', label: 'Color', class: 'otherClass'}
 *          ]
 *  }
 *
 *  onSelect is the callback to select the item. (uses one-way data flow)
 */
import selectTemplate from './select.html';
const me = 'Select Controller';

class SelectController {
  constructor(rlLogger) {
    'ngInject';
    this.Logger = rlLogger;

    this.list = [];
    this.selected = {};
    this.showFields = [{
      field: 'name'
    }];
    this.search = '';
  }

  $onChanges(changes) {
    this.Logger.trace('$onChanges', changes, me);
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
    return this.showFields.every((field) => item[field.field] === this.selected[field.field]);
  }

  updateData(options) {
    try {
      if (options.selected) {
        this.selected = angular.copy(options.selected);
      }
      if (options.list) {
        this.list = options.list;
      }
      if (options.showFields) {
        this.showFields = options.showFields;
      }
    }
    catch (err) {
      this.Logger.warning('updateData - bad options', options, me);
    }
  }
}

export default {
  template: selectTemplate,
  controller: SelectController,
  bindings: {
    options: '<',
    onSelect: '&'
  }
};
