angular.module 'coders'
  .filter 'firstName', ->
    (input) ->
      name = input.split ' '
      name[0]
