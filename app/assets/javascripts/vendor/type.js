if(typeof define!=='function'){var define=require('amdefine')(module);}

define(['./decorator'], function (decorator) {

  function copy (/* optional allow-overwrite, members */) {

    var allowOverwrite = (arguments[0] == 'allow-overwrite'),
        members        = arguments[allowOverwrite ? 1 : 0]

    for (var name in members) {
      if (members.hasOwnProperty(name)){
        if (!allowOverwrite && this.hasOwnProperty(name)) {
          throw new Error("already defined: '" + name + "'. Call with 'allow-overwrite' if this is deliberate")        
        } else {
          this[name] = members[name]
        }
      }
    }
  }

  function chainProto (child, parent) {
    function ctor() {
      this.constructor = child
    }
    ctor.prototype = parent.prototype
    child.prototype = new ctor()
  }

  function Type(){}

  Type.sub = function(name, definition) {
    if (!name.match(/^[A-Z]\w*$/)) {
      throw "invalid name '" + name + "'"
    }
    eval("var t=function " + name + "(){if(this.init)this.init.apply(this,arguments)}")
    copy.call(t, this)
    chainProto(t, this)
    if (definition) definition.call(t, t)
    return t
  }

  Type.use = function () {
    var plugin = arguments[0]
    arguments[0] = this
    plugin.apply(null, arguments)
    return this
  }

  Type.extend = function () {
    copy.apply(this, arguments)
    return this
  }

  Type.proto = function () {
    copy.apply(this.prototype, arguments)
    return this
  }

  Type.prototype.extend = function () {
    copy.apply(this, arguments)
    return this
  }

  Type.use(decorator.plugin)

  return Type
})
