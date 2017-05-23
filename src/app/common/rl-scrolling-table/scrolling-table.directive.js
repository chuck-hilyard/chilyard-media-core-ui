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
    this.master = null;
    this.header = null;
    this.scrollLeft = null;


    this.init = () => {
      // Clone table header
      this.master = element[0].querySelector('.rl-table');
      this.master.className += ' rl-table-master';
      this.header = this.master.cloneNode(true);
      this.header.className = 'rl-table rl-table-header';
      this.header.querySelector('tbody').remove();
      this.master.after(this.header);

      // Set event listeners
      this.master.addEventListener('scroll', this.scroll);
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
      this.master.style.height = window.innerHeight * this.heightPercentage + 'px';
    };

    this.scroll = () => {
      if (!this.scrollLeft || this.scrollLeft !== this.master.scrollLeft) {
        this.scrollLeft = this.master.scrollLeft;
        this.header.style.left = `${this.scrollLeft * -1}px`;
      }
    };

    this.sizeClone = () => {
      // Get columns from both headers
      let masterCells = this.master.querySelectorAll('tr:first-child th');
      let headerColumns = this.header.querySelectorAll('col');

      if (headerColumns.length === 0) {
        throw new Error('RL-SCROLLING-TABLE REQUIRES <COLGROUP> TO BE DEFINED');
      }

      // Set widths for
      let totalWidth = 0;
      angular.forEach(masterCells, (cell, index) => {
        let width = window.getComputedStyle(cell, null).getPropertyValue('width');
        headerColumns[index].style.width = width;
        totalWidth += parseInt(width);
      });

      // Set clones parent div dimensions
      this.header.querySelector('.rl-table-clip').style.width = totalWidth + 'px';

      // Offset .rl-table-header from .rl-table-master scrollbar
      let scrollbarWidth = this.master.offsetWidth - this.master.clientWidth;
      if (scrollbarWidth !== 0) {
        this.header.style.right = `${scrollbarWidth}px`;
      }
    };

    this.init();
  }

}
