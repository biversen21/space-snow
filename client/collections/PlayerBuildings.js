var PlayerBuildings = Buildings.extend({
	
  url: '/game',
	
  checkSize: function(){
    var totalSize = 0;
    for (var i = 0; i < this.models.length; i++) {
      totalSize += this.models[i].attributes.size;
    }
    return totalSize;
  }
});