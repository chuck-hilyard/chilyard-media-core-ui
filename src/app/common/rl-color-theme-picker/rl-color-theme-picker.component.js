import template from './rl-color-theme-picker.html';

class Controller {

  constructor() {
    'ngInject';
    this.isSettingsBoxOpened = false;
    this.colorScheme = 'scheme1';
  }

  $onInit() {
  }

  openSettingsBox() {
    this.isSettingsBoxOpened = true;
  }

  closeSettingsBox() {
    this.isSettingsBoxOpened = false;
  }

  setColorScheme(colorScheme) {
    this.colorScheme = colorScheme;
    this.onThemeChange({newTheme: this.colorScheme});
  }
}

export default {
  template: template,
  controller: Controller,
  bindings: {
    onThemeChange: '&'
  }
};
