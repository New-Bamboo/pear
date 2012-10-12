define(['vendor/extend', 'vendor/event_emitter'], function(extend, eventEmitter){

  function Collection(items, opts){
    opts = opts || {}
    this.push.apply(this, items)
    if(opts.orderBy) {
      this.__comparator__ = opts.orderBy
    }
    this.order()
  }

  Collection.compare = function(a, b) {
    if(a > b) {
      return 1
    } else if(a == b) {
      return 0
    } else {
      return -1
    }
  }

  Collection.prototype = []
  Collection.prototype.constructor = Collection

  extend(Collection.prototype, eventEmitter)

  extend(Collection.prototype, {
    set: function(items){
      if(items.toArray){ items = items.toArray() }
      this.splice.apply(this, [0, this.length].concat(items))
      this.order()
      this.emit('set', this.toArray())
    },

    add: function(item){
      this.push(item)
      this.order()
      var index = this.indexOf(item)
      this.emit('add', item, index)
      return index
    },

    remove: function(item) {
      var index = this.indexOf(item)
      if(index >= 0) {
        this.splice(index, 1)
        this.emit('remove', item, index)
        return true
      }

      return false
    },

    toArray: function(){
      return this.map(function(item){ return item })
    },

    orderBy: function(comparator) {
      this.__comparator__ = comparator
      this.order()
    },

    order: function(){
      if(this.__comparator__) this.sort(this.__comparator__)
    },

    isEmpty: function() {
      return this.length === 0
    },

    clone: function() {
      var clone = new Collection(this.toArray())
      clone.orderBy(this.__comparator__)
      return clone
    }
  })

  return Collection
})
