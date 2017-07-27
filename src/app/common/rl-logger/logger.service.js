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
    this.$state = $state;
    this.$window = $window;
  }

  setLogLevel(level) {
    if (typeof(level) === 'string' && levels.hasOwnProperty(level)) {
      logLevel = levels[level];
    }
    else {
      this.$log.warn('setLogLevel invalid level string: ' + level);
    }
  }

  error(message, data, source) {
    counts.error++;
    if (logLevel >= levels.error) {
      let logData = formatData(data, this.$window);
      let logSource = formatSource(source, this.$state);
      this.$log.error('Error: ' + message, logData, logSource);
      addToLog('Error', message, logData, logSource);
    }
  }

  success(message, data, source) {
    if (logLevel >= levels.success) {
      this.$log.info('Success: ' + message, formatData(data, this.$window), formatSource(source, this.$state));
    }
  }

  warning(message, data, source) {
    counts.warning++;
    if (logLevel >= levels.warning) {
      let logData = formatData(data, this.$window);
      let logSource = formatSource(source, this.$state);
      this.$log.warn('Warning: ' + message, logData, logSource);
      addToLog('Warning', message, logData, logSource);
    }
  }

  warn(message, data, source) {
    this.warning(message, data, source);
  }

  info(message, data, source) {
    if (logLevel >= levels.info) {
      this.$log.info('Info: ' + message, formatData(data, this.$window), formatSource(source, this.$state));
    }
  }

  debug(message, data, source) {
    if (logLevel >= levels.debug) {
      this.$log.info('Debug: ' + message, formatData(data, this.$window), formatSource(source, this.$state));
    }
  }

  trace(message, data, source) {
    if (logLevel >= levels.trace) {
      this.$log.info('Trace: ' + message, formatData(data, this.$window), formatSource(source, this.$state));
    }
  }

}

function formatData(data, window) {
  let dataObj = {
    url: window.document.URL,
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

function formatSource(source, state) {
  let msg = state.current.name;
  if (source && typeof(source) === 'string' && source.trim()) {
    msg += ' | ' + source.trim();
  }
  return '[' + msg + ']';
}

function addToLog(logType, message, data, source) {
  if (fullLogging) {
    log.push({
      type: logType,
      message: message,
      data: data,
      source: source
    });
  }
}
