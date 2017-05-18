import scrollingTable from './scrolling-table.directive';
import './scrolling-table.scss';

export default angular
  .module('common.scrolling-table', [])
  .directive('rlScrollingTable', scrollingTable)
  .name;
