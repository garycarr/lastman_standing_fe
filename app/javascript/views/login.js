import mn from 'backbone.marionette';
import userModel from '../models/users';
import template from '../templates/login.hbs';
import $ from 'jquery';

import { LOGIN } from '../common/strings';


export default mn.View.extend({
    tagName: 'div',

    template,

    templateContext: function () {
        return {
            loginUsername: LOGIN.USERNAME,
            loginPassword: LOGIN.PASSWORD,
            loginSubmit: LOGIN.SUBMIT,
            missingUsername: LOGIN.USERNAME_MISSING,
            missingPassword: LOGIN.PASSWORD_MISSING
        };
    },

    events: {
        'click #login-submit': 'login'
    },

    login: function (ev) {
        ev.preventDefault();
        let that = this;
        let user = new userModel({
            password: this.$el.find('#password').val(),
            username: this.$el.find('#username').val()
        });
        // The wrong way to validate and clear messages
        let validationErrors = user.validate(user.attributes);

        // Remove any previous error messages
        $.each(user.attributes, function (attr) {
            that.$el.find(`label[data-error-${attr}]`).attr('hidden', true);
        });

        if (validationErrors) {
            validationErrors.forEach(function (error) {
                that.$el.find(`label[data-error-${error.name}]`).removeAttr('hidden');
            });
        } else {
            this.postLogin(user.attributes);
        }
    },

    postLogin: function (attr) {
        let user = new userModel(attr);
        user.save({ attr }, {
            success: function (model, response) {
                console.log(response); // eslint-disable-line no-console
            },
            error: function (model, response) {
                console.log(response); // eslint-disable-line no-console
            }
        });
    }


});
