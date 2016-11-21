import HeaderView from '../../javascript/views/header';
import { HEADER } from '../../javascript/common/strings';

describe('Backbone view test', function () {
    it('Should be found', function () {
        let headerView = new HeaderView();
        headerView.render();
        expect(headerView.el.tagName.toLowerCase()).toBe('div');
        expect(headerView.$el.find('h1').text()).toBe(HEADER.TITLE);
    });
});
