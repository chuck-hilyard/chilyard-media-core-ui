export default class Sidebar {
  constructor() {
    this.links = [
      {
        translateKey: 'campaign.detail',
        state: 'campaign.detail',
        icon: 'fa-line-chart',
        order: 0,
        children: []
      },
      {
        translateKey: 'campaign.creatives',
        state: 'campaign.creatives',
        icon: 'fa-pencil',
        order: 1,
        children: []
      }
    ];
  }
}
