beforeEach(function(){
  
  science = new Building({
    name: 'science',
    imgUrl: 'science.png',
    size: 3,
    cost: 6,
    underConstruction: true
  });
  
  playerModel = new PlayerModel({
  
    password: 'abracadabra',
    name: 'Space Sheep',

    buildings: [
      {
        name: 'hydro',
        imgUrl: 'hydro.png',
        position: 0,
        size: 1,
        cost: 5,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        waterProduced: 3,
        waterConsumed: 0,
        mineralsProduced: 0,
        mineralsConsumed: 0,
        refiningCapacity: 0,
        scienceProduced: 0,
        underConstruction: false
      }
    ],

    resources: {
      water: 75,
      minerals: 20,
      moonitonium: 0
    },

    stats: {
      waterProducedPerTurn: 3,
      waterConsumedPerTurn: 0,
      netWaterPerTurn: 3,
    }
  });

});

describe('Player', function(){
  it('creates a new player model', function(){
    expect(playerModel).to.be.ok;
  });
  
  it('populates player building collection', function(){
    expect(playerModel.attributes.buildings.length).to.equal(1);
    expect(playerModel.attributes.buildings[0].name).to.equal('hydro');
  });
  
})
