'use strict';

import { Model } from 'backbone';
import { USER } from '../common/constants';
import { LOGIN } from '../common/strings';

/**
 * Model for add context member
 * @module consumer/models/context_member
 */
export default Model.extend({
    defaults: {
        username: '',
        password: ''
    },
    url: function () {
        let url = LOGIN.URL;
        if (this.id) {
            url += this.id;
        }
        return url;
    },
    validate: function (attrs) {
        let errors = [];

        if (attrs.username.length < USER.USERNAME_MIN || attrs.username.length > USER.USERNAME_MAX) {
            errors.push({ name: 'username', message: LOGIN.USERNAME_MISSING });
        }
        if (attrs.password.length < USER.PASSWORD_MIN || attrs.password.length > USER.PASSWORD_MAX) {
            errors.push({ name: 'password', message: LOGIN.PASSWORD_MISSING });
        }
        return errors.length > 0 ? errors : false;
    },
    // Probably a better way to do this, leaving in as a demo of how to override
    save: function (attrs, options) {
        this.set('username', this.get('username').toLowerCase());
        attrs.attr.username = attrs.attr.username.toLowerCase();
        Model.prototype.save.call(this, attrs, options);
    }
});
