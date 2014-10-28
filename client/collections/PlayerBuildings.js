var PlayerBuildings = Buildings.extend({
	
  url: '/game',
	
  // returns total size of all player buildings to determine whether new building can be added
  checkSize: function(){
    var totalSize = 0;
    for (var i = 0; i < this.models.length; i++) {
      totalSize += this.models[i].attributes.size;
    }
    return totalSize;
  }
});