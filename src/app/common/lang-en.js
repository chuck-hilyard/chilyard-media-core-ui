/**
 * @desc Common directory 'en' translation file
 *
 * @imports all subdirectory translation files
 */

import sidebar from './rl-sidebar/lang-en';
import languageSelect from './rl-language-select/lang-en';
import colorThemePicker from './rl-color-theme-picker/lang-en';
import tableFilters from './rl-multi-filter/lang-en';

export default Object.assign(
  sidebar,
  languageSelect,
  colorThemePicker,
  tableFilters,
  {
    app: {
      start: 'Start',
      end: 'End',
      close: 'Close',
      cancel: 'Cancel',
      ok: 'Ok',
      update: 'Update',
      cycle: 'Cycle',
      to: 'to'
    }
  }
);
