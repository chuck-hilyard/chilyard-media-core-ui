export default angular
  .module('filters.facebookChannelFilter', [])
  .filter('facebookChannel', () => {
    return (rows, model) => {
      model = Array.isArray(model) ? model : [model];
      return rows.filter((row) => {
        let selections = (model.length > 0 && model[0] && model[0].id === null) || (!model[0] || model[0].id === undefined) ? [] : model.map(sModel => sModel.id);
        return selections.includes(row.businessVIPId) || (!selections[0]);
      });
    };
  }).name;
