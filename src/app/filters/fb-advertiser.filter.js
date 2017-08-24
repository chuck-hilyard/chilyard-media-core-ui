export default angular
  .module('filters.facebookAdvertiserFilter', [])
  .filter('facebookAdvertiser', () => {
    'ngInject';
    return (rows, model) => {
      return rows.filter((row) => {
        let selections = (model.length > 0 && model[0] && model[0].id === null) ? [] : model.map(sModel => sModel.id);
        return selections.includes(row.advertiserId) || (!selections[0]);
      });
    };
  }).name;
