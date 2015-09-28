import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { routes, onStateStart } from './<%= name %>.routes';

import <%= name %>Directive from './<%= name %>.directive';

export default angular.module('<%= name %>', [uiRouter])
  .config(routes)
  .run(onStateStart)
  .directive('<%= name %>', <%= name %>Directive);
