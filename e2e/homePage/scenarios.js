describe('Protractor Demo', function() {
    it('should have a title', function(){
        browser.get('http://localhost:5000');

        expect(browser.getTitle()).toEqual('AgileThought');
    });

    it('should have a page title', function(){
        browser.get('http://localhost:5000');

        // by.binding or by.model is not yet supported for Angular 2
        expect(element(by.css('#title')).getText()).toEqual('Hello HOME');
    });
});
