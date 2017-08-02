import details from './detail/lang-en';
import dataSettings from './data-settings/lang-en';

export default Object.assign(
  {
    campaign: {
      title: 'Campaigns',
      detail: 'Detail',
      overview: 'Overview',
      creatives: 'Creatives',
      errorTitle: 'Campaign:',
      errorMessage: 'Could not retrieve information for this campaign.',
      campaign: 'Campaign',
      advertiser: 'Advertiser',
      advertiserName: 'Advertiser Name',
      masterAdvertiserId: 'Master Advertiser ID',
      currentAdvertiserId: 'Current Advertiser ID',
      businessId: 'Advertiser Business',
      masterCampaignId: 'Master Campaign ID',
      activeCampaignId: 'Current Campaign ID',
      offerName: 'Offer Name',
      offerId: 'Offer ID',
      businessCategoryName: 'Business Category',
      businessSubCategoryName: 'Business Sub Category'
    }
  },
  details,
  dataSettings
);
