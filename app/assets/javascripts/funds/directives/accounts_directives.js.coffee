app.directive 'accounts', ->
  return {
    restrict: 'E'
    templateUrl: '/templates/funds/accounts.html'
    scope: { localValue: '=accounts' }
    controller: ($scope, $state) ->
      ctrl = @
      @state = $state
      if window.location.hash == ""
        @state.transitionTo("deposits.currency", {currency: Account.first().currency})
      $scope.parseFloat = parseFloat;
      $scope.accounts = Account.all()
      # Might have a better way
      # #/deposits/eur
      @selectedCurrency = window.location.hash.split('/')[2] || Account.first().currency
      @currentAction = window.location.hash.split('/')[1] || 'deposits'
      $scope.currency = @selectedCurrency
      $scope.total = @total

      @isSelected = (currency) ->
        @selectedCurrency == currency

      @isDeposit = ->
        @currentAction == 'deposits'

      @isWithdraw = ->
        @currentAction == 'withdraws'

      @deposit = (account) ->
        ctrl.state.transitionTo("deposits.currency", {currency: account.currency})
        ctrl.selectedCurrency = account.currency
        ctrl.currentAction = "deposits"

      @withdraw = (account) ->
        ctrl.state.transitionTo("withdraws.currency", {currency: account.currency})
        ctrl.selectedCurrency = account.currency
        ctrl.currentAction = "withdraws"

      @selectrow = (account)  ->
        if @selectedCurrency != account.currency
          ctrl.state.transitionTo("deposits.currency", {currency: account.currency})
        ctrl.selectedCurrency = account.currency

      $scope.getTotal = (balance,locked) ->
          len1 = balance.split('.')[1].length
          len2 = locked.split('.')[1].length
          if len1 > len2
            len = len1
          else
            len = len2
          total = (parseFloat(balance)+parseFloat(locked)).toFixed(len)
          return total
     

      do @event = ->
        Account.bind "create update destroy", ->
          $scope.$apply()

    controllerAs: 'accountsCtrl'
  }

