import FooterView from '../../views/footer';
import { FOOTER } from '../../common/strings';

describe('Backbone view test', function () {
    it('Should be found', function () {
        let footerView = new FooterView();
        footerView.render();
        expect(footerView.el.tagName.toLowerCase()).toBe('div');
        expect(footerView.$el.find('h1').text()).toBe(FOOTER.ABOUT);
    });
});
