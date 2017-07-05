class Colors {
  constructor() {
    'ngInject';

    this.indicator = {
      good: '#62c375',
      neutral: '#8090aa',
      bad: '#d0021b'
    };

    this.charts = [
      {
        name: 'orange',
        shades: [
          '#f67002',
          '#f88d35',
          '#faa967',
          '#fbc69a',
          '#fde2cc'
        ]
      },
      {
        name: 'blue',
        shades: [
          '#2b97ce',
          '#55acd8',
          '#80c1e2',
          '#aad5eb',
          '#d5eaf5'
        ]
      },
      {
        name: 'green',
        shades: [
          '#bdd964',
          '#cae183',
          '#d7e8a2',
          '#e6f0c1',
          '#f2f7e0'
        ]
      },
      {
        name: 'dark blue',
        shades: [
          '#435774',
          '#697990',
          '#8e9aac',
          '#b4bcc7',
          '#d9dde3'
        ]
      },
      {
        name: 'teal',
        shades: [
          '#23a4a9',
          '#4fb6ba',
          '#7bc8cb',
          '#a7dbdd',
          '#d3edee'
        ]
      },
      {
        name: 'pink',
        shades: [
          '#d11c55',
          '#da4977',
          '#7e37799',
          '#eda4bb',
          '#f6d2dd'
        ]
      },
      {
        name: 'purple',
        shades: [
          '#a26da9',
          '#b58aba',
          '#c7a7cb',
          '#dac5dd',
          '#ece2ee'
        ]
      }
    ];

  }
}

export default angular
  .module('common.colors', [])
  .service('rlColors', Colors)
  .name;
