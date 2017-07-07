import template from './scrolling-table.html';


export default function rlScrollingTable($timeout) {
  'ngInject';

  return {
    restrict: 'E',
    template: template,
    link: link,
    transclude: {
      'header': 'headerTable',
      'body': 'bodyTable'
    },
    scope: {
      delegate: '=',
      onNextPage: '&'
    }
  };

  function link(scope, element) {
    this.borderWidth = 1;
    this.heightPercentage = 0.6;
    this.resizing;
    this.$timeout = $timeout;

    // DOM elements
    this.container = element[0].querySelector('.rl-scrolling-table');
    this.header = element[0].querySelector('.header');
    this.body = element[0].querySelector('.body');
    this.staticColumn = element[0].querySelector('.static-column');
    this.staticHead = element[0].querySelector('.static-head');
    this.staticBody = element[0].querySelector('.static-body');

    this.init = () => {
      scope.loading = true;

      // Assign delegates
      if(angular.isDefined(scope.delegate)) {
        scope.delegate.resize = this.handleResize;
        scope.delegate.rebuild = this.handleRebuild;
      }

      // Set event listeners
      this.body.addEventListener('scroll', this.scroll.bind(null, scope));
      window.addEventListener('resize', this.handleResize);

      this.initChecker();
    };

    this.initChecker = () => {
      let bodyRows = this.body.querySelectorAll('tbody tr');
      if (bodyRows.length > 0) {
        this.setHeight();
        this.$timeout(this.build, 250);
      }
      else {
        this.$timeout(this.initChecker, 250);
      }
    };

    this.handleResize = () => {
      scope.loading = true;
      this.$timeout.cancel(this.resizing);
      this.resizing = this.$timeout(this.resize, 250);
      this.setHeight();
    };

    this.handleRebuild = () => {
      scope.loading = true;
      this.$timeout(this.build, 250);
    };

    this.setHeight = () => {
      let headerHeight = window.getComputedStyle(this.header, null).getPropertyValue('height');
      let bodyHeight = window.getComputedStyle(this.body, null).getPropertyValue('height');
      let maxHeight = window.innerHeight * this.heightPercentage;
      if (parseInt(headerHeight) + parseInt(bodyHeight) > maxHeight) {
        this.body.style.height = `${maxHeight}px`;
      }
    };

    this.scroll = (scope) => {
      this.header.scrollLeft = this.body.scrollLeft;
      this.staticBody.scrollTop = this.body.scrollTop;
      if (angular.isDefined(scope.onNextPage) && this.body.scrollTop >= this.body.scrollHeight * 0.75 - this.body.clientHeight) {
        scope.onNextPage();
      }
    };

    this.build = () => {
      let staticHeaderWidth = window.getComputedStyle(this.staticHead.querySelector('th:first-child'), null).getPropertyValue('width');
      let staticBodyWidth = window.getComputedStyle(this.staticBody.querySelector('td:first-child'), null).getPropertyValue('width');
      let staticWidth = `${Math.max(parseInt(staticHeaderWidth), parseInt(staticBodyWidth))}px`;

      // Table offsets
      let headerHeight = this.header.querySelector('thead').clientHeight;
      this.body.style.marginTop = `${headerHeight - this.borderWidth}px`;
      this.body.style.marginLeft = `${staticWidth}`;
      this.header.style.left = `${staticWidth}`;
      this.staticColumn.style.width = `${staticWidth}`;
      this.staticBody.style.top = `${headerHeight}px`;

      // Vertical scrollbar offset
      let scrollbarWidth = this.body.offsetWidth - this.body.clientWidth;
      if (scrollbarWidth !== 0) {
        this.header.style.right = `${scrollbarWidth - this.borderWidth}px`;
      }

      // Remove non-static columns from static column table
      let staticRows = this.staticColumn.querySelectorAll('tr');
      angular.forEach(staticRows, (row) => {
        let rowCells = row.querySelectorAll('th, td');
        angular.forEach(rowCells, (cell, index) => {
          if (index !== 0) {
            cell.remove();
          }
        });
      });

      // Set row heights and remove static columns cell from scrolling tables
      let rowSelectors = [
        '.header tr',
        '.body tr',
      ];
      let otherRows = this.container.querySelectorAll(rowSelectors.join());
      angular.forEach(otherRows, (row, index) => {
        let height = window.getComputedStyle(row, null).getPropertyValue('height');
        row.style.height = height;
        staticRows[index].style.height = height;

        let rowCells = row.querySelectorAll('col, th, td');
        angular.forEach(rowCells, (cell, index) => {
          if (index === 0) {
            cell.remove();
          }
        });
      });

      this.resize();
    };

    this.resize = () => {
      let bodyTable = this.body.querySelector('table');
      let bodyCells = this.body.querySelectorAll('tr:first-child td');
      let headerTable = this.header.querySelector('table');
      let headerCells = this.header.querySelectorAll('tr:first-child th');

      // Put temp header into body
      bodyTable.appendChild( headerTable.querySelector('thead').cloneNode(true) );

      // Set table widths to match container
      bodyTable.style.width = `${this.body.clientWidth}px`;
      headerTable.style.width = `${this.body.clientWidth}px`;

      angular.forEach(bodyCells, (cell) => {
        cell.style.width = '';
      });

      let totalWidth = 0;
      angular.forEach(bodyCells, (cell, index) => {
        let width = window.getComputedStyle(cell, null).getPropertyValue('width');
        cell.style.width = width;
        headerCells[index].style.width = width;
        totalWidth += parseInt(width);
      });

      // Make sure table always fills container
      if (this.body.clientWidth < totalWidth) {
        bodyTable.style.width = `${totalWidth}px`;
        headerTable.style.width = `${totalWidth}px`;
      }

      // Horizontal scrollbar offset
      let scrollbarHeight = this.body.offsetHeight - this.body.clientHeight;
      if (scrollbarHeight !== 0) {
        this.staticColumn.style.bottom = `${scrollbarHeight - this.borderWidth}px`;
      }

      // Remove temp header
      this.body.querySelector('thead').remove();

      scope.loading = false;
    };

    this.init();
  }

}
