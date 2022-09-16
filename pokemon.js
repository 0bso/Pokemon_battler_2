class Pokemon{
    constructor(name, type = "normal", hitPoints, attackDamage, move = 'tackle'){
    this.name = name;
    this.type = type
    this.hitPoints = hitPoints;
    this.attackDamage = attackDamage;
    this.move = move;
}
isEffectiveAgainst(opponent) {
    if (this.type === "water" && opponent.type === "fire") {
      return true;
    }
    if (this.type === "fire" && opponent.type === "grass") {
      return true;
    }
    if (this.type === "grass" && opponent.type === "water") {
      return true;
    }
    return false;
  }
  isWeakTo(opponent) {
    if (this.type === "water" && opponent.type === "grass") {
      return true;
    }
    if (this.type === "fire" && opponent.type === "water") {
      return true;
    }
    if (this.type === "grass" && opponent.type === "fire") {
      return true;
    }
    return false;
  }
  takeDamage(damage) {
    this.hitPoints -= damage;
  }
  useMove() {
    console.log(`${this.name} used ${this.move}!!!!!`);
    return this.attackDamage;
  }
  hasFainted() {
    if (this.hitPoints <= 0) {
      return true;
    }
    return false;
  }
}

class FirePokemon extends Pokemon {
  constructor(name, hitPoints, attackDamage, move) {
    super(name, "fire", hitPoints, attackDamage, move);
  }
}

class WaterPokemon extends Pokemon {
  constructor(name, hitPoints, attackDamage, move) {
    super(name, "water", hitPoints, attackDamage, move);
  }
}

class GrassPokemon extends Pokemon {
  constructor(name, hitPoints, attackDamage, move) {
    super(name, "grass", hitPoints, attackDamage, move);
  }
}

class Charmander extends FirePokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage, "ember");
  }
}

class Squirtle extends WaterPokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage, "water gun");
  }
}

class Bulbasaur extends GrassPokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage, "vine whip");
  }
}

class Rattata extends Pokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, "normal", hitPoints, attackDamage);
  }
}

class Pokeball {
  constructor() {
    this.storage;
  }
  throw(pokemon) {
    if (pokemon === undefined) {
      if (this.storage === undefined) {
        console.log("Pokeball is empty");
      } else {
        console.log(`GO ${this.storage.name}!!!!`);
        return this.storage;
      }
    } else {
      this.storage = pokemon;
      console.log(`You caught ${pokemon.name}!!!!`);
    }
  }
  isEmpty() {
    return this.storage === undefined;
  }
  contains() {
    if (this.storage === undefined) {
      return "empty ...";
    }
    return this.storage.name;
  }
}

class Trainer {
  constructor() {
    this.pokeball1 = new Pokeball();
    this.pokeball2 = new Pokeball();
    this.pokeball3 = new Pokeball();
    this.pokeball4 = new Pokeball();
    this.pokeball5 = new Pokeball();
    this.pokeball6 = new Pokeball();

    this.belt = [this.pokeball1, this.pokeball2, this.pokeball3, this.pokeball4, this.pokeball5, this.pokeball6];
  }

  catch(pokemon) {
    let count = 0;
    for (let pokeball of this.belt) {
      if (pokeball.isEmpty()) {
        pokeball.throw(pokemon);
        break;
      }
      count++;
    }
    if (count === 6) {
      console.log("You have no empty pokeballs...");
    }
  }

  getPokemon(pokemon) {
    let count = 0;
    for (let pokeball of this.belt) {
      if (pokeball.storage.name === pokemon) {
        return pokeball.throw();
      }
      count++;
    }
    if (count === 6) {
      console.log(`You don't have a pokemon called ${pokemon}!!!!`);
    }
  }
}

class Battle {
  constructor(trainerA, trainerB, pokemonA, pokemonB) {
    this.turnCounter = 1;
    this.attackingPokemon = trainerB.getPokemon(pokemonB);
    this.defendingPokemon = trainerA.getPokemon(pokemonA);
    console.log("LET THE BATTLE BEGIN!!!!!");
    console.log(`It's ${pokemonB}'s turn!!!!`);
    this.trainerA = trainerA;
    this.trainerB = trainerB;
    this.pokemonA = pokemonA;
    this.pokemonB = pokemonB;
  }
  fight(pokemon) {
    if (pokemon.hitPoints > 0 && this.defendingPokemon.hitPoints > 0) {
      let attackDamage = pokemon.useMove();
      let criticalHit = Math.random() * 100 <= 10;
      if (criticalHit === true) {
        attackDamage *= 3;
        console.log("Critical hit!!!!!");
      }
      if (this.defendingPokemon.isWeakTo(pokemon)) {
        attackDamage *= 1.25;
        console.log(`${this.defendingPokemon.name} was hit by ${pokemon.name}'s ${pokemon.move} for ${attackDamage} damage!!!! It was super effective!!!!`);
      } else if (this.defendingPokemon.isEffectiveAgainst(pokemon)) {
        attackDamage *= 0.75;
        console.log(`${this.defendingPokemon.name} was hit by ${pokemon.name}'s ${pokemon.move} for ${attackDamage} damage! It's not very effective...`);
      } else {
        console.log(`${this.defendingPokemon.name} was hit by ${pokemon.name}'s ${pokemon.move} for ${attackDamage} damage!`);
      }
      this.defendingPokemon.takeDamage(attackDamage);
      if (this.defendingPokemon.hitPoints <= 0) {
        console.log(`${this.defendingPokemon.name} has fainted! ${pokemon.name} has won!`);
      } else {
        this.turnCounter++;
        if (this.turnCounter % 2 === 0) {
          this.attackingPokemon = this.trainerA.getPokemon(this.pokemonA);
          this.defendingPokemon = this.trainerB.getPokemon(this.pokemonB);
          console.log(`It's now ${this.pokemonA}'s turn!!!!`);
        } else {
          this.defendingPokemon = this.trainerA.getPokemon(this.pokemonA);
          this.attackingPokemon = this.trainerB.getPokemon(this.pokemonB);
          console.log(`It's now ${this.pokemonB}'s turn!!!!`);
        }
      }
    }
  }
}

module.exports = { Pokemon, FirePokemon, WaterPokemon, GrassPokemon, Charmander, Squirtle, Bulbasaur, Rattata, Pokeball, Trainer, Battle };
