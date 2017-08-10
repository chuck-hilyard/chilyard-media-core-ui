export default class CurrentCampaign {
  constructor(rlLogger) {
    'ngInject';
    this.Logger = rlLogger;
    this.mcid = '';
    this.gmcid = '';
  }

  clearCampaign() {
    this.mcid = '';
    this.gmcid = '';
    this.Logger.trace('clearCampaign', {mcid: this.mcid, gmcid: this.gmcid}, 'CurrentCampaign');
  }

  setCampaign(mcid, gmcid) {
    this.mcid = mcid || '';
    this.gmcid = gmcid || '';
    this.Logger.trace('setCampaign', {mcid: this.mcid, gmcid: this.gmcid}, 'CurrentCampaign');
  }

}
