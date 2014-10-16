var PlayerBuildings = Buildings.extend({
	
	initialize: function(){
		this.listenTo(this, 'add', this.draw);
	},
	
	draw: function() {
		
	}
	
});