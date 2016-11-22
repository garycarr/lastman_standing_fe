import mn from 'backbone.marionette';
import userModel from '../models/users';
import template from '../templates/login.hbs';

import { LOGIN } from '../common/strings';


export default mn.View.extend({
    tagName: 'div',

    template,

    templateContext: function () {
        return {
            loginUsername: LOGIN.USERNAME,
            loginPassword: LOGIN.PASSWORD,
            loginSubmit: LOGIN.SUBMIT
        };
    },

    events: {
        'click #login-submit': 'login'
    },

    login: function (ev) {
        ev.preventDefault();
        let user = new userModel({
            password: this.$el.find('#password').val(),
            username: this.$el.find('#username').val()
        });

        // The wrong way to validate
        let validationErrors = user.validate(user.attributes);
        if (validationErrors) {
            console.log(validationErrors);
        } else {
            this.postLogin(user.attributes);
        }
    },

    postLogin: function (attr) {
        let user = new userModel(attr);
        user.save({ attr }, {
            success: function (model, response) {
                console.log(response);
            },
            error: function (model, response) {
                console.log(response);
            }
        });
    }


});
