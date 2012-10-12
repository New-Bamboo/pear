if(typeof define!=='function'){var define=require('amdefine')(module);}

define(['./type', './handleable', './subscriber'], function(Type, handleable, subscriber){

  return Type.sub('Controller')

    .proto(subscriber)

    .after('init', function(models, opts){
      if(!opts) opts = {}

      // Models
      this.models = $.extend({}, models)
      this.__registerModels__()

      // DOM
      this.dom = opts.dom || this.createDOM()
      this.__DOMListenerEnabled__ = true
      this.__bindDOMEvents__()

      // Children
      this.children = {}
    })

    .extend({
      models: function(){
        if(!this.__requiredModels__) this.__requiredModels__ = []
        var arg
        for(var i=0; i<arguments.length; i++){
          modelName = arguments[i]
          if(this.__requiredModels__.indexOf(modelName) == -1){
            this.__requiredModels__.push(modelName)
          }
        }
      },
      
      onModelSubscriptions: function(modelName){
        if(!this.__onModelSubscriptions__) this.__onModelSubscriptions__ = {}
        if(!this.__onModelSubscriptions__[modelName]) this.__onModelSubscriptions__[modelName] = []
        return this.__onModelSubscriptions__[modelName]
      },

      onModel: function(modelName, eventName, methodName){
        this.onModelSubscriptions(modelName).push({
          eventName: eventName,
          methodName: methodName
        })
      },

      onDOM: function(selector, eventName, methodName){
        this.DOMEvents().push({
          eventName: eventName,
          selector: selector,
          methodName: methodName
        })
      },

      DOMEvents: function(){
        if(!this.__DOMEvents__) this.__DOMEvents__ = []
        return this.__DOMEvents__
      }
    })

    .proto({
      __registerModels__: function(){
        var requiredModels = this.constructor.__requiredModels__
        if(!requiredModels) return
        
        var name
        for(var i=0; i<requiredModels.length; i++){
          name = requiredModels[i]
          if(this.models[name]){
            this[name] = this.models[name]
            this.__createModelSubscriptionsFor__(name)
          } else {
            throw new Error(this.constructor.name+" missing model "+name)
          }
        }
      },
      
      destroy: function(){
        this.unsubscribeAll()
        this.destroyChildren()
        $(this.dom).remove()
      },

      newModel: function(name, model){
        this.models[name] = model
        this[name] = model
        this.__createModelSubscriptionsFor__(name)
        return model
      },

      createDOM: function(){
        return $('<div>')
      },

      find: function(selector) {
        return $(this.dom).find(selector)
      },

      appendTo: function(element){
        if(!this.dom) throw new Error("can't append because dom is not set")
        $(this.dom).appendTo(element)
        return this
      },

      disableDOMListener: function() {
        this.__DOMListenerEnabled__ = false
      },

      enableDOMListener: function() {
        this.__DOMListenerEnabled__ = true
      },

      setChild: function(id, child, models){
        this.destroyChild(id)
        if( $.isFunction(child) ) child = this.__newChild__(child, models)
        this.children[id] = child
        this.insertChild(child, id)
        return child
      },

      addChild: function(id, child, models){
        if( $.isFunction(child) ) child = this.__newChild__(child, models)
        var currentChild = this.children[id]
        if(currentChild){
          if(!Array.isArray(currentChild)){
            this.children[id] = [currentChild]
          }
        } else {
          this.children[id] = []
        }
        this.children[id].push(child)
        this.insertChild(child, id)
        return child
      },

      destroyChild: function(id){
        var child = this.children[id]
        if(child){
          if(Array.isArray(child)){
            child.forEach(function(controller){
              controller.destroy()
            })
          } else {
            child.destroy()
          }
        }
      },

      destroyChildren: function() {
        var key
        for(key in this.children) {
          this.destroyChild(key)
        }
      },

      insertChild: function(child, id){
        var container = this.find('[data-child~="'+id+'"]')
        if(container.length == 0) container = $(this.dom)
        child.appendTo(container)
      },

      __newChild__: function(ctor, models){
        var childModels = $.extend({}, this.models, models)
        return new ctor(childModels)
      },

      __createModelSubscriptionsFor__: function(modelName){
        var i, sub
        var subs = this.constructor.onModelSubscriptions(modelName)
        for(i = 0; i < subs.length; i++){
          sub = subs[i]
          if(!this[sub.methodName]) {
            throw new Error("Can't subscribe to model "+modelName+" in "+this.constructor.name+
              " because method "+sub.methodName+" doesn't exist")
          }
          this.subscribe(this.models[modelName], sub.eventName, this[sub.methodName])
        }
      },

      __bindDOMEvents__: function(){
        if(!this.dom) throw new Error("can't bind events because dom is not set")
        var $dom = $(this.dom)
        var self = this
        this.constructor.DOMEvents().forEach(function(e){
          $dom.on(e.eventName, e.selector, function(event){
            event.stopPropagation()
            event.preventDefault()

            if(self.__DOMListenerEnabled__) {
              self[e.methodName]($(event.target), event)
            }
          })
        })
      }
    })

})
