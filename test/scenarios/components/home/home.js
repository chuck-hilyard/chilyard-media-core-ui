describe('Home', () => {

  beforeEach(() => {
    browser.get('index.html');
  });

  it('should have the title `Dashboard`', () => {
    let title = element(by.css('h1'));
    expect(title.getText()).toBe('Dashboard');
  });

});
