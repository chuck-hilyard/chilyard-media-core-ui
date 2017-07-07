import navbarTemplate from './navbar.html';


class NavbarController {

  constructor($state, rlConfig) {
    'ngInject';
    this.collapsed = true;
    this.featureFlags = rlConfig.featureFlags;
    this.$state = $state;
  }

  // Close menu after clicking link
  // @return void
  //
  collapse() {
    this.collapsed = true;
  }

  // Toggle menu in mobile view
  // @return void
  //
  toggle() {
    this.collapsed = !this.collapsed;
  }

  // Advertiser state checker
  // @return bool
  //
  get advertiser() {
    return this.$state.current.name.indexOf('advertiser') > -1;
  }

  // Campaign state checker
  // @return bool
  //
  get campaign() {
    return this.$state.current.name.indexOf('campaign') > -1;
  }

  // Order state checker
  // @return bool
  //
  get order() {
    return this.$state.current.name.indexOf('order') > -1;
  }

}

export default {
  template: navbarTemplate,
  controller: NavbarController
};
