/**
 * @ngdoc service
 * @module common.rl-logger
 * @name common.rl-logger
 * @description provides logging for the app.
 * Should be used instead of $log or console.log so we can process
 * our logs in one place for the whole app.
 * PRIMARY PURPOSE: Debugging in dev, qa and prod.
 * Currently it formats the information and logs it to the console.
 * In the future it could collect the logs and send them to the server
 * In the future it could save state to include in the logs such as
 * last correlationId.
 * @usage Logger.error(message, data, source)
 * all parameters are optional.
 * message should be a string which is the log message
 * data can be an object typically with relevant information
 * source should be a string providing additional identification for
 * the code that is logging this message.  The component for the current
 * $state will be used but non-routable sub-components might want to identify
 * themselves.
 */

const levels = {
  off: 0,
  error: 1,
  success: 1,
  warning: 2,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5
};

let logLevel = levels.info;

let counts = {
  error: 0,
  warning: 0
};

let fullLogging = false;

let startTime = Date.now();

let log = [];

export default class Logger {
  constructor($log, $state, $window) {
    'ngInject';
    this.$log = $log;
    this.$location = 4;
    this.$state = $state;
    this.$window = $window;
  }

  setLogLevel(level) {
    if (typeof(level) === 'string' && levels.hasOwnProperty(level)) {
      logLevel = levels[level];
    } else {
      this.$log.warn('setLogLevel invalid level string: ' + level);
    }
  }

  error(message, data, source) {
    counts.error++;
    if (logLevel >= levels.error) {
      this.$log.error('Error: ' + message, this.formatData(data), this.formatSource(source));
      log.push({
        type: 'Error',
        message: message,
        data: this.formatData(data),
        source: this.formatSource(source)
      });
    }
  }

  success(message, data, source) {
    if (logLevel >= levels.success) {
      this.$log.info('Success: ' + message, this.formatData(data), this.formatSource(source));
    }
  }

  warning(message, data, source) {
    counts.warning++;
    if (logLevel >= levels.warning) {
      this.$log.warn('Warning: ' + message, this.formatData(data), this.formatSource(source));
      log.push({
        type: 'Warning',
        message: message,
        data: this.formatData(data),
        source: this.formatSource(source)
      });
    }
  }

  warn(message, data, source) {
    this.warning(message, data, source);
  }

  info(message, data, source) {
    if (logLevel >= levels.info) {
      this.$log.info('Info: ' + message, this.formatData(data), this.formatSource(source));
    }
  }

  debug(message, data, source) {
    if (logLevel >= levels.debug) {
      this.$log.info('Debug: ' + message, this.formatData(data), this.formatSource(source));
    }
  }

  trace(message, data, source) {
    if (logLevel >= levels.trace) {
      this.$log.info('Trace: ' + message, this.formatData(data), this.formatSource(source));
    }
  }

  formatData(data) {
    let dataObj = {
      url: this.$window.document.URL,
      time: Date.now(),
      sessionStart: startTime,
      counts: angular.copy(counts)
    };
    if (!fullLogging) {
      dataObj = {};
    }
    if (data) {
      dataObj.data = data;
    }
    return dataObj;
  }

  formatSource(source) {
    let msg = this.$state.current.name;
    if (source && typeof(source) === 'string' && source.trim()) {
      msg += ' | ' + source.trim();
    }
    return '[' + msg + ']';
  }

}
