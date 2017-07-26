import sso from './rl-sso/sso.module';
import config from './rl-config/rl-config.module';
import datepicker from './rl-datepicker/datepicker.module';
import dateTime from './rl-date-time/date-time.module';
import navbar from './rl-navbar/navbar.module';
import sidebar from './rl-sidebar/sidebar.module';
import footer from './rl-footer/footer.module';
import exception from './rl-exception/exception.module';
import expandingHeader from './rl-expanding-header/expanding-header.module';
import chart from './rl-chart/chart.module';
import scrollingTable from './rl-scrolling-table/scrolling-table.module';
import select from './rl-select/select.module';
import dropdown from './rl-dropdown/dropdown.module';
import searchFilter from './rl-search-filter/search-filter.module';
import languageSelect from './rl-language-select/language-select.module';
import logger from './rl-logger/logger.module';
import sortableHeader from './rl-sortable-header/sortable-header.module';
import session from './session/session.module';
import colors from './rl-colors/colors.module';

export default angular
  .module('common', [
    sso,
    config,
    dateTime,
    datepicker,
    navbar,
    sidebar,
    footer,
    exception,
    expandingHeader,
    chart,
    scrollingTable,
    languageSelect,
    logger,
    sortableHeader,
    session,
    select,
    dropdown,
    searchFilter,
    colors
  ])
  .name;
