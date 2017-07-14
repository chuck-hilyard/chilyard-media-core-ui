import details from './detail/lang-en';
import dataSettings from './data-settings/lang-en';

export default Object.assign(
  {
    campaign: {
      title: 'Campaigns',
      detail: 'Detail',
      creatives: 'Creatives',
      errorTitle: 'Campaign:',
      errorMessage: 'Could not retrieve information for this master campaign.'
    }
  },
  details,
  dataSettings
);
