export function initialize(application) {
	application.inject('route', 'browserManager', 'service:browser-manager');
	application.inject('model', 'browserManager', 'service:browser-manager');
	application.inject('controller', 'browserManager', 'service:browser-manager');
	application.inject('component', 'browserManager', 'service:browser-manager');
}

export default {
  name: 'browser-manager',
  initialize: initialize
};
