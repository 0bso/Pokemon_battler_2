const { Pokemon, FirePokemon, WaterPokemon, GrassPokemon, Charmander, Squirtle, Bulbasaur, Rattata, Pokeball, Trainer, Battle } = require('./pokemon')

describe('Pokemon class', () => {
    describe('newPokemon', () => {
        test('should return an object', () => {
            const result = new Pokemon()
            expect(typeof result).toBe('object')
        });
    });
    describe('Properties', () => {
        test("Should have a name property", () => {
            const result = new Pokemon("Bewear");
            expect(typeof result.name).toBe("string");
          });
          test("name propertry can be passed as an argument", () => {
            const fave = new Pokemon("Bewear");
            expect(fave.name).toBe("Bewear");
          });
          test("has a type property which initializes as normal", () => {
            const pokemonType = new Pokemon();
            expect(pokemonType.type).toBe("normal");
          });
          test("type propertry can be passed as an argument", () => {
            const squirtle = new Pokemon("squirtle", "water");
            expect(squirtle.type).toBe("water");
          });
          test("hitPoints propertry can be passed as an argument", () => {
            const squirtle = new Pokemon("squirtle", "water", 20);
            expect(squirtle.hitPoints).toBe(20);
          });
          test("hitPoints are a type of number", () => {
            const squirtle = new Pokemon("squirtle", "water", 20);
            expect(typeof squirtle.hitPoints).toBe("number");
          });
          test("attackDamage propertry can be passed as an argument", () => {
            const squirtle = new Pokemon("squirtle", "water", 20, 10);
            expect(squirtle.attackDamage).toBe(10);
          });
          test("attackDamage are a type of number", () => {
            const squirtle = new Pokemon("squirtle", "water", 20, 10);
            expect(typeof squirtle.attackDamage).toBe("number");
          });
          test("has a move property which initializes as tackle", () => {
            const pokemonType = new Pokemon();
            expect(pokemonType.move).toBe("tackle");
          });
          test("move propertry can be passed as an argument", () => {
            const squirtle = new Pokemon("squirtle", "water", 20, 10, "water gun");
            expect(squirtle.move).toBe("water gun");
          });
    });
});
describe("Type advantages", () => {
  describe("isEffectiveAgainst", () => {
    test("Should returns a boolean", () => {
      const bewear = new Pokemon("ratatta", "normal", 100, 20, "bite");
      const squirtle = new Pokemon("squirtle", "water", 200, 10, "water gun");
      const effectiveBoolean = bewear.isEffectiveAgainst(squirtle);
      expect(typeof effectiveBoolean).toBe("boolean");
    });
    test("Should return false if the pokemon is a normal type", () => {
      const bewear = new Pokemon("ratatta", "normal", 100, 20, "bite");
      const squirtle = new Pokemon("squirtle", "water", 200, 10, "water gun");
      const effectiveBoolean = bewear.isEffectiveAgainst(squirtle);
      expect(effectiveBoolean).toBe(false);
    });
    test("Should return correct boolean for types", () => {
      const squirtle = new Pokemon("squirtle", "water", 200, 10, "water gun");
      const charmander = new Pokemon("charmander", "fire", 200, 10, "ember");
      const bulbasaur = new Pokemon("bulbasaur", "grass", 200, 10, "vine whip");
      expect(squirtle.isEffectiveAgainst(charmander)).toBe(true);
      expect(squirtle.isEffectiveAgainst(bulbasaur)).toBe(false);
      expect(charmander.isEffectiveAgainst(squirtle)).toBe(false);
      expect(charmander.isEffectiveAgainst(bulbasaur)).toBe(true);
      expect(bulbasaur.isEffectiveAgainst(squirtle)).toBe(true);
      expect(bulbasaur.isEffectiveAgainst(charmander)).toBe(false);
    });
  });
  describe("isWeakTo", () => {
    test("Should return a boolean", () => {
      const bewear = new Pokemon("ratatta", "normal", 100, 20, "bite");
      const squirtle = new Pokemon("squirtle", "water", 200, 10, "water gun");
      const weakBoolean = bewear.isWeakTo(squirtle);
      expect(typeof weakBoolean).toBe("boolean");
    });
    test(" Should return false if the pokemon is a normal type", () => {
      const bewear = new Pokemon("ratatta", "normal", 100, 20, "bite");
      const squirtle = new Pokemon("squirtle", "water", 200, 10, "water gun");
      const weakBoolean = bewear.isWeakTo(squirtle);
      expect(weakBoolean).toBe(false);
    });
    test("Should return correct boolean for types", () => {
      const squirtle = new Pokemon("squirtle", "water", 200, 10, "water gun");
      const charmander = new Pokemon("charmander", "fire", 200, 10, "ember");
      const bulbasaur = new Pokemon("bulbasaur", "grass", 200, 10, "vine whip");
      expect(squirtle.isWeakTo(charmander)).toBe(false);
      expect(squirtle.isWeakTo(bulbasaur)).toBe(true);
      expect(charmander.isWeakTo(squirtle)).toBe(true);
      expect(charmander.isWeakTo(bulbasaur)).toBe(false);
      expect(bulbasaur.isWeakTo(squirtle)).toBe(false);
      expect(bulbasaur.isWeakTo(charmander)).toBe(true);
    });
  });
});
describe("takeDamage", () => {
  test("should reduce health by the number given", () => {
    const bewear = new Pokemon("Bewear", "normal", 100, 20, "power-up punch");
    bewear.takeDamage(10);
    expect(bewear.hitPoints).toBe(90);
  });
});
describe("useMove", () => {
  test("returns the attackDamage", () => {
    const bewear = new Pokemon("Bewear", "normal", 100, 20, "power-up punch");
    const returnedDamage = bewear.useMove();
    expect(returnedDamage).toBe(20);
  });
});
describe("hasFainted", () => {
  test("returns a boolean", () => {
    const bewear = new Pokemon("Bewear", "normal", 100, 20, "power-up punch");
    expect(typeof bewear.hasFainted()).toBe("boolean");
  });
  test("returns true when health reaches 0", () => {
    const bewear = new Pokemon("Bewear", "normal", 100, 20, "power-up punch");
    bewear.takeDamage(100);
    expect(bewear.hasFainted()).toBe(true);
    const squirtle = new Pokemon("squirtle", "water", 20, 10, "water gun");
    squirtle.takeDamage(35);
    expect(squirtle.hasFainted()).toBe(true);
  });
  test("returns false when health is above 0", () => {
    const bewear = new Pokemon("Bewear", "normal", 100, 20, "power-up punch");
    bewear.takeDamage(90);
    expect(bewear.hasFainted()).toBe(false);
  });
});

describe("subClass", () => {
describe("FirePokemon", () => {
  test("methods are inherited from parent", () => {
    const charmander = new FirePokemon("charmander", 20, 10, "ember");
    expect(charmander.hasFainted()).toBe(false);
  });
  test("child perameter is updated on the parent", () => {
    const charmander = new FirePokemon("charmander", 20, 10, "ember");
    expect(charmander.name).toBe("charmander");
  });
});
describe("WaterPokemon", () => {
  test("methods are inherited from parent", () => {
    const squirtle = new WaterPokemon("squirtle", 20, 10, "water gun");
    expect(squirtle.hasFainted()).toBe(false);
  });
  test("child perameter is updated on the parent", () => {
    const squirtle = new WaterPokemon("squirtle", 20, 10, "water gun");
    expect(squirtle.name).toBe("squirtle");
  });
});
describe("GrassPokemon", () => {
  test("methods are inherited from parent", () => {
    const bulbasaur = new GrassPokemon("bulbasaur", 20, 10, "vine whip");
    expect(bulbasaur.hasFainted()).toBe(false);
  });
  test("child perameter is updated on the parent", () => {
    const bulbasaur = new GrassPokemon("bulbasaur", 20, 10, "vine whip");
    expect(bulbasaur.name).toBe("bulbasaur");
  });
});
describe("Species", () => {
  test("charmander, squirtle, and bulbasaur are all correct objects", () => {
    const charmander = new Charmander("charmander", 20, 10);
    const squirtle = new Squirtle("squirtle", 20, 10);
    const bulbasaur = new Bulbasaur("bulbasaur", 20, 10);
    expect(charmander).toEqual({ name: "charmander", type: "fire", hitPoints: 20, attackDamage: 10, move: "ember" });
    expect(squirtle).toEqual({ name: "squirtle", type: "water", hitPoints: 20, attackDamage: 10, move: "water gun" });
    expect(bulbasaur).toEqual({ name: "bulbasaur", type: "grass", hitPoints: 20, attackDamage: 10, move: "vine whip" });
  });
  test("rattata recieves correct data from parent class", () => {
    const ratty = new Rattata("rattata", 20, 10);
    expect(ratty).toEqual({ name: "rattata", type: "normal", hitPoints: 20, attackDamage: 10, move: "tackle" });
  });
});
});


describe("Pokeballs", () => {
test("has a storage property that initialises as undefined", () => {
const pokeballA = new Pokeball();
expect(pokeballA.storage).toBe(undefined);
});
describe("throw", () => {
test("stores a pokemon in storage when it undefined", () => {
  const pokeballA = new Pokeball();
  const fireboy = new Charmander("fireboy", 20, 10);
  pokeballA.throw(fireboy);
  expect(pokeballA.storage).toEqual(fireboy);
});
test("can only hold a single pokemon", () => {
  const pokeballA = new Pokeball();
  const char = new Charmander("char", 20, 10);
  pokeballA.throw(char);
  pokeballA.throw(char);
  expect(pokeballA.storage).toEqual(char);
});
test("returns the stored pokemon when invoked with no argument", () => {
  const pokeballA = new Pokeball();
  pokeballA.throw();
  const char = new Charmander("char", 20, 10);
  pokeballA.throw(char);
  expect(pokeballA.throw()).toEqual(char);
});
});
describe("isEmpty", () => {
test("returns a boolean", () => {
  const pokeballA = new Pokeball();
  expect(typeof pokeballA.isEmpty()).toBe("boolean");
});
test("returns true when no pokemon is in storage", () => {
  const pokeballA = new Pokeball();
  expect(pokeballA.isEmpty()).toBe(true);
});
test("returns false when a pokemon is in storage", () => {
  const pokeballA = new Pokeball();
  const fireboy = new Charmander("fireboy", 20, 10);
  pokeballA.throw(fireboy);
  expect(pokeballA.isEmpty()).toBe(false);
});
});
describe("contains", () => {
test("returns a string", () => {
  const pokeballA = new Pokeball();
  expect(typeof pokeballA.contains()).toBe("string");
});
test("returns the name of the stored pokemon", () => {
  const pokeballA = new Pokeball();
  const fireboy = new Charmander("fireboy", 20, 10);
  pokeballA.throw(fireboy);
  expect(pokeballA.contains()).toBe("fireboy");
});
test("returns empty... when no pokemon is stored", () => {
  const pokeballA = new Pokeball();
  expect(pokeballA.contains()).toBe("empty ...");
});
});
});

describe("Trainer", () => {
test("has a belt property that is an array", () => {
const trainer = new Trainer();
expect(Array.isArray(trainer.belt)).toBe(true);
});
test("array has a length of six", () => {
const trainer = new Trainer();
expect(trainer.belt.length).toBe(6);
});
test("trainer belt initializes as a list of 6 empty objects", () => {
const trainer = new Trainer();
expect(trainer.belt).toEqual([{}, {}, {}, {}, {}, {}]);
});
test("trainer pokeballs can be thrown by invoking catch", () => {
const trainer = new Trainer();
const fireboy = new Charmander("fireboy", 20, 10);
trainer.catch(fireboy);
expect(trainer.belt[0].storage).toEqual({ name: "fireboy", type: "fire", hitPoints: 20, attackDamage: 10, move: "ember" });
});
test("trainer can catch 6 pokemon", () => {
const trainer = new Trainer();
const fireboy = new Charmander("fireboy", 20, 10);
const firegirl = new Charmander("firegirl", 20, 10);
const fireman = new Charmander("fireman", 20, 10);
const firewoman = new Charmander("firewoman", 20, 10);
const firechild = new Charmander("firechild", 20, 10);
const firebaby = new Charmander("firebaby", 20, 10);
const firefetus = new Charmander("firefetus", 20, 10);
trainer.catch(fireboy);
trainer.catch(firegirl);
trainer.catch(fireman);
trainer.catch(firewoman);
trainer.catch(firechild);
trainer.catch(firebaby);
trainer.catch(firefetus);
const output = [
  { storage: { name: "fireboy", type: "fire", hitPoints: 20, attackDamage: 10, move: "ember" } },
  { storage: { name: "firegirl", type: "fire", hitPoints: 20, attackDamage: 10, move: "ember" } },
  { storage: { name: "fireman", type: "fire", hitPoints: 20, attackDamage: 10, move: "ember" } },
  { storage: { name: "firewoman", type: "fire", hitPoints: 20, attackDamage: 10, move: "ember" } },
  { storage: { name: "firechild", type: "fire", hitPoints: 20, attackDamage: 10, move: "ember" } },
  { storage: { name: "firebaby", type: "fire", hitPoints: 20, attackDamage: 10, move: "ember" } },
];
expect(trainer.belt).toEqual(output);
});
test("getPokemon will return pokemon passed as an argument", () => {
const trainer = new Trainer();
const one = new Charmander("1", 20, 10);
const two = new Charmander("2", 20, 10);
const three = new Charmander("3", 20, 10);
const four = new Charmander("4", 20, 10);
const five = new Charmander("5", 20, 10);
const six = new Charmander("6", 20, 10);
const seven = new Charmander("7", 20, 10);
trainer.catch(one);
trainer.catch(two);
trainer.catch(three);
trainer.catch(four);
trainer.catch(five);
trainer.catch(six);
trainer.catch(seven);
expect(trainer.getPokemon("7")).toBe(undefined);
expect(trainer.getPokemon("4")).toEqual({ name: "4", type: "fire", hitPoints: 20, attackDamage: 10, move: "ember" });
});
describe("battle", () => {
// test("attacking pokemon deals correct damage to defending pokemon", () => {
//   const ash = new Trainer();
//   const gary = new Trainer();
//   const rattyboi = new Rattata("rattyboi", 20, 4);
//   const wetlad = new Squirtle("wetlad", 20, 4);
//   ash.catch(rattyboi);
//   gary.catch(wetlad);
//   const ashVSgary = new Battle(ash, gary, "rattyboi", "wetlad");
//   ashVSgary.fight(wetlad);
//   expect(rattyboi.hitPoints).toBe(16);
//   ashVSgary.fight(rattyboi);
//   expect(wetlad.hitPoints).toBe(16);
// });
// Test above works when critical hits arent taken into account
test("we get to see a full fight", () => {
  const ash = new Trainer();
  const gary = new Trainer();
  const fireboy = new Charmander("fireboy", 20, 4);
  const wetlad = new Squirtle("wetlad", 20, 4);
  ash.catch(fireboy);
  gary.catch(wetlad);
  const ashVSgary = new Battle(ash, gary, "fireboy", "wetlad");
  ashVSgary.fight(wetlad);
  ashVSgary.fight(fireboy);
  ashVSgary.fight(wetlad);
  ashVSgary.fight(fireboy);
  ashVSgary.fight(wetlad);
  ashVSgary.fight(fireboy);
  ashVSgary.fight(wetlad);
  ashVSgary.fight(fireboy);
  ashVSgary.fight(wetlad);
  ashVSgary.fight(fireboy);
  ashVSgary.fight(wetlad);
  ashVSgary.fight(fireboy);
});
});
});
