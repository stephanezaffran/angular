import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../pokemon";
import { Router } from "@angular/router";
import { PokemonService } from "../pokemon.service";
import { EditPokemonComponent } from "../edit-pokemon/edit-pokemon.component";

@Component({
  selector: "app-list-pokemon",
  templateUrl: "./list-pokemon.component.html",
})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[];
  pokemon: Pokemon;

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService
      .getPokemonList()
      .subscribe((pokemonList) => (this.pokemonList = pokemonList));
  }

  selectPokemon(pokemon: Pokemon) {
    this.router.navigate(["/pokemon/", pokemon.id]);
  }

  addPokemon() {
    this.router.navigate(["/add"])
  }
}
