import template from './scrolling-table.html';


export default function rlScrollingTable($window) {
  'ngInject';

  return {
    restrict: 'E',
    template: template,
    transclude: true,
    link: link
  };

  function link(scope, element) {
    const heightPercentage = 0.7;
    let container = element[0].querySelector('.rl-scrolling-table');
    let containerWidth = null;
    let originalHeader = null;
    let clonedHeader = null;


    init();
    function init() {
      // Set container height
      let height = window.innerHeight * heightPercentage;
      scope.height = `${height}px`;

      // Clone table header
      originalHeader = element[0].querySelector('table thead');
      clonedHeader = originalHeader.cloneNode(true);
      clonedHeader.className = 'fixed-header';
      clonedHeader.style.display = 'none';
      originalHeader.after(clonedHeader);

      // Set event listeners
      angular.element(container).on('scroll', setClone);
      angular.element($window).on('resize', setClone);
      angular.element($window).on('scroll', setClone);
    }

    function setClone() {
      // Place fixed header
      clonedHeader.style.display = container.scrollTop > 0 ? 'table-header-group' : 'none';
      clonedHeader.style.top = `${container.scrollTop}px`;

      // Don't update sizes if container hasn't changed
      if (!containerWidth || containerWidth !== container.clientWidth) {
        // Set cloned header width
        containerWidth = container.clientWidth;
        let originalHeaderWidth = $window.getComputedStyle(originalHeader, null).getPropertyValue('width');
        clonedHeader.style.width = parseInt(originalHeaderWidth) + 1 + 'px';  // Extra pixel is to account for border-collapse

        // Get columns from both headers
        let columns = originalHeader.querySelectorAll('tr:first-child th');
        let clonedColumns = clonedHeader.querySelectorAll('tr:first-child th');

        // Set column widths for clonedHeader
        angular.forEach(columns, (column, index) => {
          let width = $window.getComputedStyle(column, null).getPropertyValue('width');
          clonedColumns[index].style.width = width;
        });
      }
    }
  }

}
