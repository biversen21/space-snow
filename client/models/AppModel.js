var AppModel = Backbone.Model.extend({
	initialize: function(params) {
		this.set('playerBuildings', new PlayerBuildings());
		
		params.buildingLibrary.on('addToBoard', function(building) {
			this.get('playerBuildings').add(building);
		}, this);
	}
});