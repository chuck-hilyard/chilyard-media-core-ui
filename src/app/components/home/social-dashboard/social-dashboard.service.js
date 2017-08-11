const me = 'Social Dashboard Service';

export default class Service {

  constructor(rlApi, $q) {
    'ngInject';
    this.api = rlApi;
    this.$q = $q;
  }

  getChannelList(platform) {

    let platformSpecificChannelList = {
      'USA': [{'channelId': 2488, 'channelName': 'DirectLocal'}, {'channelId': 2865, 'channelName': 'National'}, {'channelId': 1, 'channelName': 'Partner'}],
      'CAN': [{'channelId': 2488, 'channelName': 'DirectLocal'}, {'channelId': 2865, 'channelName': 'National'}, {'channelId': 1, 'channelName': 'Partner'}],
      'GBR': [{'channelId': 2488, 'channelName': 'DirectLocal'}, {'channelId': 2865, 'channelName': 'National'}, {'channelId': 1, 'channelName': 'Partner'}],
      'EUR': [{'channelId': 2488, 'channelName': 'DirectLocal'}, {'channelId': 2865, 'channelName': 'National'}, {'channelId': 1, 'channelName': 'Partner'}],
      'AUS': [{'channelId': 4, 'channelName': 'DirectLocal'}, {'channelId': 2865, 'channelName': 'National'}, {'channelId': 1, 'channelName': 'Partner'}],
      'JPN': [{'channelId': 2488, 'channelName': 'DirectLocal'}, {'channelId': 2865, 'channelName': 'National'}, {'channelId': 1, 'channelName': 'Partner'}]
    };
    let response = {'data': platformSpecificChannelList[platform]};
    let deferred = this.$q.defer();
    deferred.resolve(response);

    return deferred.promise;
  }

  getFacebookSpecialistList(platform) {
    return this.api.mediaGatewayGet('/facebookdashboard/specialist', me, {platform: platform})
      .then((success) => success.data)
      .catch((error) => {
        return new Error(error);
      });
  }

  getFacebookOfferList(platform, businessUserId) {
    return this.api.mediaGatewayGet('/facebookdashboard/offers', me, {platform: platform, businessUserId: businessUserId})
      .then((success) => success.data)
      .catch((error) => {
        return new Error(error);
      });
  }

  getFacebookSpecialistDmcList(platform, businessUserId, offerId) {
    let offerQueryStr = (!offerId) ? '' : '&offerId='+offerId;
    return this.api.mediaGatewayGet('/facebookdashboard/dmc?platform='+platform+'&businessUserId='+businessUserId+offerQueryStr)
      .then((success) => success.data)
      .catch((error) => {
        return new Error(error);
      });
  }

  getFacebookAdvertiserList(platform, businessUserId, offerId, businessId) {
    let offerQueryStr = (!offerId) ? '' : '&offerId='+offerId,
      dmcQueryStr = (!businessId) ? '' : '&businessId='+businessId;
    return this.api.mediaGatewayGet('/facebookdashboard/advertiser?platform='+platform+'&businessUserId='+businessUserId+offerQueryStr+dmcQueryStr)
      .then((success) => success.data)
      .catch((error) => {
        return new Error(error);
      });
  }

}
