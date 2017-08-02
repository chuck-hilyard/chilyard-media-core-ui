export default class Sidebar {
  constructor() {
    this.links = [
      {
        translateKey: 'campaign.overview',
        state: 'campaign.detail',
        icon: 'fa-folder',
        order: 0,
        children: []
      }
      // {
      //   translateKey: 'campaign.creatives',
      //   state: 'campaign.creatives',
      //   icon: 'fa-pencil',
      //   order: 1,
      //   children: []
      // }
    ];
  }
}
