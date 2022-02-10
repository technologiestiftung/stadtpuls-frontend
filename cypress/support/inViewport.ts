export default _chai => {
    function assertIsInViewport() {
        const subject = this._obj;


        const width = Cypress.config(`viewportWidth`);
        const bottom = Cypress.config(`viewportHeight`);
        const rect = subject[0].getBoundingClientRect();

        this.assert(
            rect.top < bottom && rect.right <= width && rect.left >= 0,
            'expected #{this} to be in the viewport',
            'expected #{this} to not be in the viewport',
            this._obj
        );
    }

    _chai.Assertion.addMethod('inViewport', assertIsInViewport);
}
