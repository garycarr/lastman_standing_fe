import Marionette from 'backbone.marionette';
import Radio      from 'backbone.radio';

/**
 * This controller implements the route methods.
 * @module application/controller/app_controller
 */
export default Marionette.Object.extend({
    /**
     * Method called on instantiation and consumes the options object.
     * @param {Object} options An object of initial values.
     */
    initialize (options) {
        this.layout = options.layout;

        const channel = Radio.channel('application');

        channel.on('nav:login', this.login.bind(this));
    },

    login () {
        console.log('LOGIN ROUTE');
        // this.layout.showChildView('body', new LoginView());
    }
});
