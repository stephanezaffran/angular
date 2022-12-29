import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-add-pokemon",
  templateUrl: "./add-pokemon.component.html",
})
export class AddPokemonComponent implements OnInit {
  pokemon: Pokemon;
  pokemonList:Pokemon[];

  constructor(private pokemonService:PokemonService){}

  ngOnInit() {
    this.pokemon = new Pokemon();
  }
}
