export default class Sidebar {
  constructor() {
    this.links = [{
      translateKey: 'campaign.overview',
      state: 'campaign.detail',
      icon: 'fa-folder',
      order: 0,
      children: []
    }, {
      translateKey: 'campaign.adgroups',
      state: 'external.campaign-adgroups',
      icon: 'fa-sitemap',
      order: 10,
      children: []
    }, {
      translateKey: 'campaign.creatives',
      state: 'external.campaign-creatives',
      icon: 'fa-pencil',
      order: 20,
      children: []
    }, {
      translateKey: 'campaign.keywords',
      state: 'external.campaign-keywords',
      icon: 'fa-key',
      order: 30,
      children: []
    }, {
      translateKey: 'campaign.adextensions',
      state: 'external.campaign-adextensions',
      icon: 'fa-briefcase',
      order: 40,
      children: []
    }];
  }
}
