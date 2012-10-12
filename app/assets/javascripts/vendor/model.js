define(['./type', './event_emitter', './collection'], function(Type, eventEmitter, Collection){

  function setterMethodName(attributeName){
    return 'set' + attributeName.replace(/./, function(ch){ return ch.toUpperCase() })
  }

  function copy(dest, src, keys){
    var key
    for(key in src){
      if(keys && (keys.indexOf(key) == -1)) continue
      if(src.hasOwnProperty(key)){
        dest[key] = src[key]
      }
    }
    return dest
  }

  return Type.sub('Model')

    .proto(eventEmitter)
  
    .proto({
      
      __get__: function(attr){
        return this.__attrs__[attr]
      },

      setAttrs: function(attrs){
        var key, methodName
        for(key in attrs){
          methodName = setterMethodName(key)
          if(this[methodName]){
            this[methodName](attrs[key])
          }
        }
      },

      attrs: function(){
        var keys
        if(arguments.length) keys = Array.prototype.slice.apply(arguments)
        return copy({}, this.__attrs__, keys)
      },

      __set__: function(){
        var from = this.attrs()
        // Setting using an object - set({thing: 'hello'})
        if(arguments.length == 1){
          var attrs = arguments[0]
          for(var attr in attrs){
            if(attrs.hasOwnProperty(attr)){
              this.__setOne__(attr, attrs[attr])
            }
          }
        // Setting using a key + value - set('thing', 'hello')
        } else {
          this.__setOne__(arguments[0], arguments[1])
        }
        var to = this.attrs()
        this.emit('change', {from: from, to: to})
        return this
      },

      __setOne__: function(attr, value){
        var from = this.__get__(attr)
        this.__attrs__[attr] = value
        this.emit('change:'+attr, {from: from, to: value})
      }

    })
    
    .extend({

      instances: function() {
        if(!this.__instances__) {
          this.__instances__ = new Collection()
        }

        return this.__instances__
      },

      detect: function(filter) {
        return this.instances().detect(filter)
      },

      attributes: function(){
        var i
        for(i=0; i<arguments.length; i++){
          this.createReader(arguments[i])
          this.createWriter(arguments[i])
        }
      },

      collection: function(name, options){
        var privateName = '__'+name+'__'
        options = options || {}
        var type = options.type || Collection

        // Reader
        this.prototype[name] = function(){
          if(!this[privateName]){
            this[privateName] = new type()
            if(options.orderBy){ this[privateName].orderBy(options.orderBy) }
          }
          return this[privateName]
        }

        // Writer
        this.prototype[setterMethodName(name)] = function(items){
          this[name]().set(items)
          this.emit('change:' + name)
        }
      },

      createReader: function(attr){
        this.prototype[attr] = function(){
          return this.__get__(attr)
        }
      },

      createWriter: function(attr){
        var methodName = setterMethodName(attr)
        this.prototype[methodName] = function(value){
          this.__set__(attr, value)
          return this
        }
      },

    })

    .after('init', function(attrs){
      this.constructor.instances().add(this)
      this.__attrs__ = {}
      this.setAttrs(attrs)
    })

})
