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
    this.original = null;
    this.clone = null;
    this.scrollLeft = null;


    this.init = () => {
      // Clone table header
      this.original = element[0].querySelector('.rl-table');
      this.original.className += ' rl-table-master';
      this.clone = this.original.cloneNode(true);
      this.clone.className = 'rl-table rl-table-header';
      this.clone.querySelector('tbody').remove();
      this.original.after(this.clone);

      // Set event listeners
      this.original.addEventListener('scroll', this.scroll);
      window.addEventListener('resize', this.setHeight);

      this.setup();
    };

    this.setup = () => {
      let $link = this;
      setTimeout(function() {
        $link.setHeight();
        $link.sizeClone();
      }, 250);
    };

    this.setHeight = () => {
      this.original.style.height = window.innerHeight * this.heightPercentage + 'px';
    };

    this.scroll = () => {
      if (!this.scrollLeft || this.scrollLeft !== this.original.scrollLeft) {
        this.scrollLeft = this.original.scrollLeft;
        this.clone.style.left = (this.scrollLeft * -1) + 'px';
      }
    };

    this.sizeClone = () => {
      // Get columns from both headers
      let cells = this.original.querySelectorAll('tr:first-child th');
      let originalColumns = this.original.querySelectorAll('col');
      let clonedColumns = this.clone.querySelectorAll('col');

      if (originalColumns.length === 0) {
        throw new Error('RL-SCROLLING-TABLE REQUIRES <COLGROUP> TO BE DEFINED');
      }

      // Set widths for clonedHeader
      let totalWidth = 0;
      angular.forEach(cells, (cell, index) => {
        let width = window.getComputedStyle(cell, null).getPropertyValue('width');
        clonedColumns[index].style.width = width;
        totalWidth += parseInt(width);
      });

      // Set clones parent div dimensions
      this.clone.querySelector('.rl-table-clip').style.width = totalWidth + 'px';

      // Offset .rl-table-header from .rl-table-master scrollbar
      let scrollbarWidth = this.original.offsetWidth - this.original.clientWidth;
      if (scrollbarWidth !== 0) {
        this.clone.style.right = `${scrollbarWidth}px`;
      }
    };

    this.init();
  }

}
