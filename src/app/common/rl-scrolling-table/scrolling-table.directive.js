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
    this.borderWidth = 1;
    this.container = element[0].querySelector('.rl-scrolling-table');
    this.heightPercentage = 0.6;
    this.header = element[0].querySelector('.rl-table-header');
    this.master = element[0].querySelector('.rl-table-master');
    this.staticColumn = element[0].querySelector('.rl-static-column');
    this.staticHead = element[0].querySelector('.rl-static-head');
    this.staticBody = element[0].querySelector('.rl-static-body');

    this.init = () => {
      scope.loading = true;

      // Set event listeners
      this.master.addEventListener('scroll', this.scroll);
      window.addEventListener('resize', this.setHeight);

      this.checker();
    };

    this.checker = () => {
      let masterRows = this.master.querySelectorAll('tbody tr');
      if (masterRows.length > 0) {
        this.setHeight();
        this.build();
      }
      else {
        setTimeout(this.checker, 250);
      }
    };

    this.setHeight = () => {
      this.master.style.height = window.innerHeight * this.heightPercentage + 'px';
    };

    this.scroll = () => {
      this.header.scrollLeft = this.master.scrollLeft;
      this.staticBody.scrollTop = this.master.scrollTop;
    };

    this.build = () => {
      let masterTable = this.master.querySelector('table');
      let masterCells = this.master.querySelectorAll('tr:first-child th');
      let masterColumns = this.master.querySelectorAll('col');

      if (masterColumns.length === 0) {
        throw new Error('RL-SCROLLING-TABLE REQUIRES <COLGROUP> TO BE DEFINED');
      }

      // Set widths
      let staticColumnWidth = 0;
      let totalWidth = 0;
      angular.forEach(masterCells, (cell, index) => {
        let width = window.getComputedStyle(cell, null).getPropertyValue('width');
        masterColumns[index].style.width = width;
        totalWidth += parseInt(width);
        if (index === 0) {
          staticColumnWidth = width;
        }
      });
      masterTable.style.width = `${totalWidth}px`;

      // Clone table header
      this.header.appendChild(masterTable.cloneNode(true));
      this.header.querySelector('tbody').remove();

      // Table offsets
      let headerHeight = this.header.querySelector('thead').clientHeight;
      this.master.style.marginTop = `${headerHeight - this.borderWidth}px`;
      this.master.style.marginLeft = `${staticColumnWidth}`;
      this.header.style.left = `${staticColumnWidth}`;

      // Scrollbar offsets
      let scrollbarWidth = this.master.offsetWidth - this.master.clientWidth - this.borderWidth;
      let scrollbarHeight = this.master.offsetHeight - this.master.clientHeight - this.borderWidth;
      if (scrollbarWidth !== 0) {
        this.header.className += ' rl-table-header--scrollbar';
        this.header.style.right = `${scrollbarWidth - this.borderWidth}px`;
        this.staticColumn.style.width = `${staticColumnWidth}`;
        this.staticColumn.style.bottom = `${scrollbarHeight}px`;
      }

      // Static column table
      let staticTable = masterTable.cloneNode(true);
      staticTable.style.width = '';

      // Remove non-static columns from static column table
      let staticRows = staticTable.querySelectorAll('tr');
      angular.forEach(staticRows, (row) => {
        let rowCells = row.querySelectorAll('th, td');
        angular.forEach(rowCells, (cell, index) => {
          if (index !== 0) {
            cell.remove();
          }
        });
      });

      // Create static head table
      this.staticHead.appendChild(staticTable.cloneNode(true));
      this.staticHead.querySelector('tbody').remove();

      // Create static body table
      this.staticBody.appendChild(staticTable.cloneNode(true));
      this.staticBody.querySelector('thead').remove();
      this.staticBody.style.top = window.getComputedStyle(this.staticHead, null).getPropertyValue('height');

      // Remove master thead
      this.master.querySelector('thead').remove();

      // Remove static column from other tables
      let rowSelectors = [
        '.rl-table-header tr',
        '.rl-table-header colgroup',
        '.rl-table-master tr',
        '.rl-table-master colgroup'
      ];
      let otherRows = this.container.querySelectorAll(rowSelectors.join());
      angular.forEach(otherRows, (row) => {
        let rowCells = row.querySelectorAll('col, th, td');
        angular.forEach(rowCells, (cell, index) => {
          if (index === 0) {
            cell.remove();
          }
        });
      });

      scope.loading = false;
    };

    this.init();
  }

}
