angular.module('app.controllers', [])
  
.controller('agendaCtrl', function($scope, $ionicModal, agendaApi, $ionicLoading) {
	
	var contatos = [];
	$scope.permitirExcluir = false;
	
	function obterObterContatos(){
		contatos = agendaApi.getContatos();
		$scope.contatos = contatos;

		return contatos;
	}

	$scope.salvarContato = function(contato){
		agendaApi.addContato(contato);

		obterObterContatos();

		$scope.closeModal();
	}

	$scope.excluirContato = function (contato) {
		agendaApi.deleteContato(contato);

		obterObterContatos();
	}

	$scope.filtrarContatosFavoritos = function(){
		contatos = obterObterContatos();

		if ($scope.favorito == true){
			contatos = contatos.filter(function(contatos){
				return contatos.favorito == true;
			});

			$scope.contatos = contatos;
		}
	}
	
	$scope.exibirAguarde = function(){
		$ionicLoading.show({template: '<p class="item-icon-center"><ion-spinner icon="lines" class="spinner-calm"></ion-spinner></p>Aguarde, processando...'});
		setTimeout(fecharAguarde, 6000);
	}

	function fecharAguarde(){
		$ionicLoading.hide()
	}
	
	obterObterContatos();

	$scope.habilitarExclusao = function () {
		$scope.permitirExcluir = !$scope.permitirExcluir 
	}

	$scope.abrirTelaContato = function(){
		$scope.contato = {nome: '', telefone: '', favorito : false};
		$scope.openModal();
	}

	$scope.cancelarContato = function () {
		$scope.closeModal();
	}

	

	///modal inicio
	$ionicModal.fromTemplateUrl('contato.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});
  
  $scope.openModal = function() {
    $scope.modal.show();
  };
  
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  	///modal fim


})
   
.controller('sobreCtrl', function($scope, $ionicNavBarDelegate) {

	//Remover o botao voltar
	$ionicNavBarDelegate.showBackButton(false);

})
 