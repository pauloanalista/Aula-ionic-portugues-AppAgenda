// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function($ionicPlatform, $state, $ionicHistory, $ionicPopup) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


    //Intercepta botao voltar do device
    //Impedir do usuário voltar de tela e exibir popup se ele quer fechar o aplicativo
    $ionicPlatform.registerBackButtonAction(function (event) {
        if ($state.current.name == "agenda" || $state.current.name == "sobre") { // your check here
            $ionicPopup.confirm({
                title: 'Aviso!',
                template: 'Tem certeza que deseja sair do aplicativo?'
            }).then(function (res) {
                if (res) {
                    //Remove o token de acesso a api ao entrar na tela de login
                    ionic.Platform.exitApp();
                }
            })
        }
        else {
            $ionicHistory.goBack();
        }
    }, 100);


  });
})