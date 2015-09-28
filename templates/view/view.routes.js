const STATE_NAME = '<%= name %>';

routes.$inject = ['$stateProvider'];

export function routes($stateProvider) {
  $stateProvider
    .state(STATE_NAME, {
      url: '/<%= name %>',
      template: '<<%- name %>></<%- name %>>',
    });
}

onStateStart.$inject = ['$rootScope'];

export function onStateStart($rootScope) {
  $rootScope.$on('$stateChangeStart', (event, toState, toParams) => {
    if (toState.name !== STATE_NAME) return;

    // TODO lanzar aquí el comando de inicio de la vista
  });
}
