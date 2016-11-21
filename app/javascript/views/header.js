import mn from 'backbone.marionette';
import template from '../templates/header.hbs';
import { HEADER } from '../common/strings';

export default mn.View.extend({
    tagName: 'div',
    template,

    templateContext: function () {
        return {
            title: HEADER.TITLE
        };
    }
});
