/**
 *  This component wraps the angular ui-select directive in a general way
 *  which can be used with any array of objects.
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
 *    customClass: 'unique-global-classname' // Dropdown is on the body if you
 *                                              want to customize the styling
 *                                              include a unique class name
 *  }
 *  The first field in the showFields list is treated as the "main" field that
 *  shows when the dropdown is closed.
 *
 *  onSelect is the callback to select the item. (uses one-way data flow)
 */

import dropdownTemplate from './dropdown.html';
const me = 'Dropdown Controller';

class DropdownController {
  constructor(rlLogger) {
    'ngInject';
    this.Logger = rlLogger;
    this.list = [];
    this.selected = null;
    this.customClass = '';
    this.showFields = [{
      field: 'name'
    }];
    this.mainField = 'name';
    this.placeholder = 'Search...';
    this.search = '';
    this.disabled = false;
  }

  $onChanges(changes) {
    this.Logger.trace('$onChanges', changes, me);
    if (changes.options) {
      this.updateData(changes.options.currentValue);
    }
  }

  selectItem() {
    this.Logger.trace('selectItem', this.selected, me);
    this.onSelect({
      item: this.selected
    });
  }

  isSelected(item) {
    return this.showFields.every((field) => item[field.field] === this.selected[field.field]);
  }

  updateData(options) {
    try {
      if (options.list) {
        this.list = options.list;
      }
      if (options.showFields) {
        this.showFields = options.showFields;
      }
      if (options.customClass) {
        this.customClass = options.customClass;
      }
      if (options.placeholder) {
        this.placeholder = options.placeholder;
      }
      this.mainField = this.showFields[0].field;
    }
    catch (err) {
      this.Logger.warning('updateData - bad options', options, me);
    }
  }

}

export default {
  template: dropdownTemplate,
  controller: DropdownController,
  bindings: {
    disabled: '<',
    options: '<',
    selected: '<',
    onSelect: '&'
  }
};
