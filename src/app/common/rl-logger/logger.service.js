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

let log = [];

export default class Logger {
  constructor($interval, $log, $http, $state, $window, rlConfig) {
    'ngInject';
    this.$log = $log;
    this.$state = $state;
    this.$window = $window;
    this.logLevel = levels[rlConfig.logLevel];
    this.loggingUrl = rlConfig.loggingUrl;
    if (rlConfig.logInterval) {
      let interval = rlConfig.logInterval * 60000;
      this.sendInterval = $interval(this.checkLog.bind(null, this), interval);
    }
  }

  checkLog(service) {
    if (log.length > 0) {
      service.sendLog();
    }
  }

  sendLog() {
    this.$http({
      method: 'POST',
      url: this.loggingUrl,
      data: log
    })
      .then(() => {
        log = [];
      });
  }

  setLogLevel(level) {
    if (typeof(level) === 'string' && levels.hasOwnProperty(level)) {
      this.logLevel = levels[level];
    }
    else {
      this.$log.warn('setLogLevel invalid level string: ' + level);
    }
  }

  error(message, data, source) {
    if (this.logLevel >= levels.error) {
      let logSource = formatSource(source, this.$state);
      this.$log.error('Error: ' + message, data, logSource);
      this.addToLog('Error', message, data, logSource);
    }
  }

  warning(message, data, source) {
    if (this.logLevel >= levels.warning) {
      let logSource = formatSource(source, this.$state);
      this.$log.warn('Warning: ' + message, data, logSource);
      this.addToLog('Warning', message, data, logSource);
    }
  }

  warn(message, data, source) {
    this.warning(message, data, source);
  }

  info(message, data, source) {
    if (this.logLevel >= levels.info) {
      let logSource = formatSource(source, this.$state);
      this.$log.info('Info: ' + message, data, logSource);
      this.addToLog('Info', message, data, logSource);
    }
  }

  success(message, data, source) {
    if (this.logLevel >= levels.success) {
      this.$log.info('Success: ' + message, data, formatSource(source, this.$state));
    }
  }

  debug(message, data, source) {
    if (this.logLevel >= levels.debug) {
      this.$log.info('Debug: ' + message, data, formatSource(source, this.$state));
    }
  }

  trace(message, data, source) {
    if (this.logLevel >= levels.trace) {
      this.$log.info('Trace: ' + message, data, formatSource(source, this.$state));
    }
  }

  addToLog(level, message, data, source) {
    if (this.loggingUrl) {
      log.push({
        level: level,
        url: this.$window.document.URL,
        timestamp: Date.now(),
        message: message,
        data: (typeof data === 'string' ? data : JSON.stringify(data)),
        source: source
      });
      if (log.length > 50) {
        this.sendLog();
      }
    }
  }

}


function formatSource(source, state) {
  let msg = state.current.name;
  if (source && typeof(source) === 'string' && source.trim()) {
    msg += ' | ' + source.trim();
  }
  return '[' + msg + ']';
}
