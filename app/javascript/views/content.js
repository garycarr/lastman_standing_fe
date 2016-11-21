import mn from 'backbone.marionette';
import template from '../templates/content.hbs';

export default mn.View.extend({
    tagName: 'div',
    template,
    templateContext: function () {
        return {
            // about: FOOTER.ABOUT
        };
    }
});
