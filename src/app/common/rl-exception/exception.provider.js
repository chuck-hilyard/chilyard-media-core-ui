/**
 * @ngdoc provider
 * @module common.rl-exception
 * @name common.rl-exception
 * @description handles exceptions, replace default handler which logs to $log
 */
export default function() {
  'ngInject';
  this.config = {
    appErrorPrefix: 'Media Facebook UI'
  };

  this.$get = () => {
    return {
      config: this.config
    };
  };
}
