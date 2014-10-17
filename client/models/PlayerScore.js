var PlayerScore = Backbone.Model.extend({
	initialize: function(){
		this.playerResources = 0;
		this.listenTo(this, 'increaseResources', this.score);
	},
	
	score: function() {
		this.playerResources++;
	}
})