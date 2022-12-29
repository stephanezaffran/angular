import { Component, OnInit } from "@angular/core";
import { Pokemon } from "./pokemon";
import { POKEMONS } from "./mock-pokemon-list";

@Component({
  selector: "app-root",
  templateUrl: `app.component.html`,
})
export class AppComponent implements OnInit {
  pokemonList: Pokemon[] = [...POKEMONS];
  pokemonSelected: Pokemon | undefined;

  ngOnInit(): void {
    console.table(this.pokemonList);
  }

  selectPokemon(id: string) {
    const pokemon: Pokemon | undefined = this.pokemonList.find(
      (pok) => pok.id == +id
    );

    if (pokemon) {
      console.log(
        `vous avez clique sur le pokemon ${pokemon.name}  cp: ${pokemon.cp} hp: ${pokemon.hp}`);
        this.pokemonSelected = pokemon;
    } else {
      this.pokemonSelected = pokemon;
      console.log(`vous avez clique sur un pokemon qui n'existe pas`);
    }
  }
}
