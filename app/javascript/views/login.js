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
            loginError: LOGIN.LOGIN_ERROR,
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

    postLogin: function (attr, asyncBool) {
        let that = this;
        // Use a promise?
        if (asyncBool === undefined) {
            asyncBool = true;
        }

        let user = new userModel(attr);
        user.save({ attr }, {
            async: asyncBool,
            success: function () {
                that.$el.find('label[data-error-login]').attr('hidden', true);
            },
            error: function () {
                that.$el.find('label[data-error-login]').removeAttr('hidden');
            }
        });
    }


});
