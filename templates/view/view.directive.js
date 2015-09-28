import template from './<%= name %>.html';
import controller from './<%= name %>.controller';

export default ()=> {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    bindToController: {},
    restrict: 'E',
    replace: true,
  };
};
