import Marionette from 'backbone.marionette';
import LayoutView     from './views/layout.js';

export default Marionette.Application.extend({
  /**
   * Marionette callback called when start is called on the application
   * instance.
   */
    onStart () {
        this.layoutView = new LayoutView();
        this.layoutView.render();
    }
});
