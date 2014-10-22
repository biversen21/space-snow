module.exports = {

    id: 0,
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

  }