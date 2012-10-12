define ['vendor/controller', 'vendor/template!room_app'], (Controller, template) ->
  
  class RoomAppController extends Controller

    createDOM: -> super.addClass('room-app-controller')

    @after 'init', ->
      @render()

    render: ->
      $(@dom).html template(greeting: 'Hello!')
