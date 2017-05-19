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
    this.heightPercentage = 0.7;
    this.container = element[0].querySelector('.rl-scrolling-table');
    this.containerWidth = null;
    this.originalHeader = null;
    this.clonedHeader = null;


    this.init = () => {
      // Set container height
      let height = window.innerHeight * this.heightPercentage;
      scope.height = `${height}px`;

      // Clone table header
      this.originalHeader = element[0].querySelector('table thead');
      this.clonedHeader = this.originalHeader.cloneNode(true);
      this.clonedHeader.className = 'fixed-header';
      this.clonedHeader.style.display = 'none';
      this.originalHeader.after(this.clonedHeader);

      // Set event listeners
      this.container.addEventListener('scroll', this.setClone);
      window.addEventListener('resize', this.setClone);
    };

    this.setClone = () => {
      // Place fixed header
      this.clonedHeader.style.display = this.container.scrollTop > 0 ? 'table-header-group' : 'none';
      this.clonedHeader.style.top = `${this.container.scrollTop}px`;
      this.setWidth();
    };

    this.setWidth = () => {
      // Don't update sizes if container hasn't changed
      if (!this.containerWidth || this.containerWidth !== this.container.clientWidth) {
        console.log('sizing');
        // Set cloned header width
        this.containerWidth = this.container.clientWidth;
        let originalHeaderWidth = window.getComputedStyle(this.originalHeader, null).getPropertyValue('width');
        this.clonedHeader.style.width = parseInt(originalHeaderWidth) + 1 + 'px';  // Extra pixel is to account for border-collapse

        // Get columns from both headers
        let columns = this.originalHeader.querySelectorAll('tr:first-child th');
        let clonedColumns = this.clonedHeader.querySelectorAll('tr:first-child th');

        // Set column widths for clonedHeader
        angular.forEach(columns, (column, index) => {
          let width = window.getComputedStyle(column, null).getPropertyValue('width');
          clonedColumns[index].style.width = width;
        });
      }
    };

    this.init();
  }

}
