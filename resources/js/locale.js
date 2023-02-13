var translations = {"en":{"stream":{"counter":"counter"}}};

const  trans= (key) => {
    var keys = key.split(".");
    var lang = navigator.language.split("-");
    return lang.concat(keys).reduce(function(o, k){
      var next = o[k];
      if (!next) {
        console.error('No translation found for ' + key, new Error().stack);
        return {};
      }
      else {
        return next;
      }
    }, translations);
}

export default trans;