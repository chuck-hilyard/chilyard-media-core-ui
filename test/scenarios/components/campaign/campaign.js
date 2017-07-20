describe('Campaign', () => {

  beforeEach(() => {
    browser.get('/#!/campaign/1842601');
  });

  it('should have the title `Campaign: Imagix Dental - Search`', () => {
    let title = element(by.css('h1'));
    expect(title.getText()).toBe('Campaign: Imagix Dental - Search');
  });

  it('should have a charts to display', () => {
    let charts = element.all(by.css('.chartjs-hidden-iframe'));
    expect(charts.count()).toBe(4);
  });

  it('should have a performance grid', () => {
    let charts = element.all(by.css('.rl-scrolling-table table'));
    expect(charts.count()).toBe(4);
  });

});
