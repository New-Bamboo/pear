(function($){
  
  function attrFromInputName(inputName, namespace){
    var matcher = new RegExp(namespace+'\\[(.+)\\]')
    return inputName.replace(matcher, '$1')
  }
    
  $.fn.formParams = function(namespace){
    return this.serializeArray().
                reduce(function(params, input){
                  if(namespace){
                    if(input.name.match(namespace+'\\['))
                      params[attrFromInputName(input.name, namespace)] = input.value;
                  } else {
                    params[input.name] = input.value;
                  }
                  return params;
                }, {});
  };
})(jQuery);
