describe('Campaigns', () => {

  beforeEach(() => {
    browser.get('/#!/campaigns');
  });

  it('should have the title `Campaigns`', () => {
    let title = element(by.css('h1'));
    expect(title.getText()).toBe('Campaigns');
  });

});
