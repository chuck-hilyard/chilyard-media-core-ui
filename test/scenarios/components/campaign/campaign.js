describe('Campaign', () => {

  beforeEach(() => {
    browser.get('/#!/campaign/1842601');
  });

  it('should have the title `Campaign: Imagix Dental - Search`', () => {
    let title = element(by.css('h1'));
    expect(title.getText()).toBe('Campaign: Imagix Dental - Search');
  });

  describe('performance grid', () => {
    let thead = element.all(by.css('.rl-scrolling-table .header th'));

    it('should have `24` header cells', () => {
      expect(thead.count()).toBe(24);
    });

    it('should have the first cell of `Status`', () => {
      expect(thead.get(0).getText()).toBe('Status');
    });

    describe('change date breakdown', () => {
      beforeEach(() => {
        element(by.css('campaign-data-settings button')).click();
        element(by.linkText('Months')).click();
        element(by.repeater('range in ::$ctrl.ranges.month').row(0)).click();
        element(by.css('.modal-footer .btn-primary')).click();
        thead = element.all(by.css('.rl-scrolling-table .header th'));
      });

      it('should have `18` header cells', () => {
        expect(thead.count()).toBe(18);
      });

      it('should have the first cell of `Spend`', () => {
        expect(thead.get(0).getText()).toBe('Spend');
      });

    });

  });

});
