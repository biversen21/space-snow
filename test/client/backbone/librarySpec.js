beforeEach(function(){
  fakeLibrary = new Buildings([
    {
      // id: 0,
      name: 'hydro',
      imgUrl: 'hydro.png',
      size: 1,
      cost: 3,
      waterProduced: 3,
      underConstruction: false
    },
    {
      // id: 1,
      name: 'mine',
      imgUrl: 'mine.png',
      size: 2,
      cost: 3,
      waterConsumed: 4,
      mineralsProduced: 3,
      underConstruction: false
    },
    {
      // id: 2,
      name: 'refinery',
      imgUrl: 'refinery.png',
      size: 3,
      cost: 5,
      underConstruction: false
    },
    {
      // id: 3,
      name: 'science',
      imgUrl: 'science.png',
      size: 3,
      cost: 6,
      underConstruction: true
    }
  ]);
})

describe('Building Library', function(){
  it('creates a building library collection', function(){
    expect(fakeLibrary).to.be.ok;
    expect(fakeLibrary.length).to.equal(4);
  });
  
  it('creates an app model with building collection', function(){
    var app = new AppModel({buildingLibrary: fakeLibrary});
    expect(app).to.be.ok;
    expect(app.attributes.buildingLibrary.length).to.equal(4);
    expect(app.attributes.buildingLibrary.models[0].attributes.name).to.equal('hydro');
  });
  
})