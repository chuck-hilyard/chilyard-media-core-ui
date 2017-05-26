import template from './scrolling-table.html';


export default function rlScrollingTable($timeout) {
  'ngInject';

  return {
    restrict: 'E',
    template: template,
    transclude: true,
    link: link,
    scope: {
      delegate: '='
    }
  };

  function link(scope, element) {
    this.borderWidth = 1;
    this.heightPercentage = 0.6;
    this.resizing;
    this.$timeout = $timeout;

    // DOM elements 
    this.container = element[0].querySelector('.rl-scrolling-table');
    this.header = element[0].querySelector('.rl-table-header');
    this.master = element[0].querySelector('.rl-table-master');
    this.staticColumn = element[0].querySelector('.rl-static-column');
    this.staticHead = element[0].querySelector('.rl-static-head');
    this.staticBody = element[0].querySelector('.rl-static-body');

    this.init = () => {
      scope.loading = true;

      // Assign delegates
      if(angular.isDefined(scope.delegate)) {
        scope.delegate.resize = this.handleResize;
      }

      // Set event listeners
      this.master.addEventListener('scroll', this.scroll);
      window.addEventListener('resize', this.handleResize);

      this.initChecker();
    };

    this.initChecker = () => {
      let masterRows = this.master.querySelectorAll('tbody tr');
      if (masterRows.length > 0) {
        this.setHeight();
        this.build();
      }
      else {
        setTimeout(this.initChecker, 250);
      }
    };

    this.handleResize = () => {
      scope.loading = true;
      this.$timeout.cancel(this.resizing);
      this.resizing = this.$timeout(this.resize, 250);
      this.setHeight();
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
      masterTable.style.width = `${this.master.clientWidth}px`;
      let staticColumnWidth = 0;
      let totalWidth = 0;
      angular.forEach(masterCells, (cell, index) => {
        let width = window.getComputedStyle(cell, null).getPropertyValue('width');
        masterColumns[index].style.width = width;
        if (index === 0) {
          staticColumnWidth = width;
        }
        else {
          totalWidth += parseInt(width);
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
      this.staticColumn.style.width = `${staticColumnWidth}`;

      // Scrollbar offsets
      let scrollbarWidth = this.master.offsetWidth - this.master.clientWidth;
      if (scrollbarWidth !== 0) {
        this.header.style.right = `${scrollbarWidth - this.borderWidth}px`;
      }

      let scrollbarHeight = this.master.offsetHeight - this.master.clientHeight;
      if (scrollbarHeight !== 0) {
        this.staticColumn.style.bottom = `${scrollbarHeight - this.borderWidth}px`;
      }

      // Static column table
      let staticTable = masterTable.cloneNode(true);
      staticTable.querySelector('colgroup').remove();
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

    this.resize = () => {
      let masterTable = this.master.querySelector('table');
      let masterCells = this.master.querySelectorAll('tr:first-child td');
      let masterColumns = this.master.querySelectorAll('col');
      let headerTable = this.header.querySelector('table');
      let headerColumns = this.header.querySelectorAll('col');

      // Put header back in master table
      masterTable.appendChild( headerTable.querySelector('thead').cloneNode(true) );

      // Set table widths to match container
      masterTable.style.width = `${this.master.clientWidth}px`;
      headerTable.style.width = `${this.master.clientWidth}px`;

      let totalWidth = 0;
      angular.forEach(masterCells, (cell, index) => {
        masterColumns[index].style.width = '';
        let width = window.getComputedStyle(cell, null).getPropertyValue('width');
        masterColumns[index].style.width = width;
        headerColumns[index].style.width = width;
        totalWidth += parseInt(width);
      });

      masterTable.style.width = `${totalWidth}px`;
      headerTable.style.width = `${totalWidth}px`;

      // Remove master thead
      this.master.querySelector('thead').remove();

      scope.loading = false;
    };

    this.init();
  }

}
