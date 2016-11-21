import mn from 'backbone.marionette';
import template from '../templates/footer.hbs';
import { FOOTER } from '../common/strings';

export default mn.View.extend({
    tagName: 'div',
    template,
    templateContext: function () {
        return {
            about: FOOTER.ABOUT
        };
    }
});
