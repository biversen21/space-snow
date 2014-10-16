var AppView = Backbone.View.extend({
	initialize: function(params) {
		this.buildingsView = new BuildingsView({collection: this.model.get('buildingLibrary')});
		this.playerBuildingsView = new PlayerBuildingsView({collection: this.model.get('playerBuildings')});
	},
	
	render: function(){
		console.log('hit')
		return this.$el.html([
			this.buildingsView.$el,
			this.playerBuildingsView.$el
		]);
	}
});