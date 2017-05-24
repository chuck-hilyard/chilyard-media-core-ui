import template from './scrolling-table.html';


export default function rlScrollingTable() {
  'ngInject';

  return {
    restrict: 'E',
    template: template,
    transclude: true,
    link: link
  };

  function link(scope, element) {
    this.container = element[0].querySelector('.rl-scrolling-table');
    this.heightPercentage = 0.6;
    this.header = null;
    this.master = null;


    this.init = () => {
      scope.loading = true;
      // Clone table header
      this.master = element[0].querySelector('.rl-table-master');
      this.header = this.master.cloneNode(true);
      this.header.className = 'rl-table-header';
      this.header.querySelector('tbody').remove();
      this.master.before(this.header);

      // Set event listeners
      this.master.addEventListener('scroll', this.scroll);
      window.addEventListener('resize', this.setHeight);

      this.setup();
    };

    this.setup = () => {
      let masterRows = this.master.querySelectorAll('tbody tr');
      if (masterRows.length > 0) {
        this.setHeight();
        this.sizeElements();
      }
      else {
        setTimeout(this.setup, 250);
      }
    };

    this.setHeight = () => {
      this.master.style.height = window.innerHeight * this.heightPercentage + 'px';
    };

    this.scroll = () => {
      this.header.scrollLeft = this.master.scrollLeft;
    };

    this.sizeElements = () => {
      // Get columns from both headers
      let masterCells = this.master.querySelectorAll('tr:first-child th');
      let masterColumns = this.master.querySelectorAll('col');
      let headerColumns = this.header.querySelectorAll('col');

      if (headerColumns.length === 0) {
        throw new Error('RL-SCROLLING-TABLE REQUIRES <COLGROUP> TO BE DEFINED');
      }

      // Set column widths
      let totalWidth = 0;
      angular.forEach(masterCells, (cell, index) => {
        let width = window.getComputedStyle(cell, null).getPropertyValue('width');
        masterColumns[index].style.width = width;
        headerColumns[index].style.width = width;
        totalWidth += parseInt(width);
      });

      // Set table widths
      this.master.querySelector('table').style.width = `${totalWidth}px`;
      this.header.querySelector('table').style.width = `${totalWidth}px`;

      // Remove master table header
      this.master.querySelector('thead').remove();

      // Set top margin for master table
      let headerHeight = this.header.querySelector('thead').clientHeight;
      this.master.style.marginTop = `${headerHeight - 1}px`;

      // Offset .rl-table-header from .rl-table-master scrollbar
      let scrollbarWidth = this.master.offsetWidth - this.master.clientWidth - 1; // Account for border-width
      if (scrollbarWidth !== 0) {
        this.header.className += ' rl-table-header--scrollbar';
        this.header.style.right = `${scrollbarWidth}px`;
      }
      scope.loading = false;
    };

    this.init();
  }

}
