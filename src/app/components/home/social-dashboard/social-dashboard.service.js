export default class Service {
  constructor(rlApi, $q) {
    'ngInject';
    this.api = rlApi;
    this.$q = $q;
  }

  checkLogin() {
    return this.api.request('GET', '/campaigns/');
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
    return this.api.mediaGatewayGet('/facebookdashboard/specialist?platform=' + platform)
      .then((success) => success.data)
      .catch((error) => {
        return new Error(error);
      });
  }

  getFacebookOfferList(platform, businessUserId) {
    return this.api.mediaGatewayGet('/facebookdashboard/offers?platform='+platform+'&businessUserId='+businessUserId)
      .then((success) => success.data)
      .catch((error) => {
        return new Error(error);
      });
  }

  getFacebookSpecialistDmcList(platform, businessUserId, offerId) {
    let offerQueryStr = (offerId === '' || typeof offerId === 'undefined' || offerId === null) ? '' : '&offerId='+offerId;
    return this.api.mediaGatewayGet('/facebookdashboard/dmc?platform='+platform+'&businessUserId='+businessUserId+offerQueryStr)
      .then((success) => success.data)
      .catch((error) => {
        return new Error(error);
      });
  }

  getFacebookAdvertiserList(platform, businessUserId, offerId, businessId) {
    let offerQueryStr = (offerId === '' || typeof offerId === 'undefined' || offerId === null) ? '' : '&offerId='+offerId,
      dmcQueryStr = (businessId === '' || typeof businessId === 'undefined' || businessId === null) ? '' : '&businessId='+businessId;
    return this.api.mediaGatewayGet('/facebookdashboard/advertiser?platform='+platform+'&businessUserId='+businessUserId+offerQueryStr+dmcQueryStr)
      .then((success) => success.data)
      .catch((error) => {
        return new Error(error);
      });
  }

}
