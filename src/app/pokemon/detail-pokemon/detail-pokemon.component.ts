import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { POKEMONS } from "../mock-pokemon-list";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-detail-pokemon",
  templateUrl: "./detail-pokemon.component.html",
  styles: [],
})
export class DetailPokemonComponent implements OnInit {
  pokemonList: Pokemon[];
  pokemon: Pokemon | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const pokemonId: string | null = this.route.snapshot.paramMap.get("id");
    if (pokemonId) {
      this.pokemonService
        .getPokemonById(+pokemonId)
        .subscribe((pok) => (this.pokemon = pok));
    }
  }
  goBack() {
    this.router.navigate(["/pokemons"]);
  }
  EditPokemon(pokemon: Pokemon) {
    if (this.pokemon) this.router.navigate(["/edit/pokemon/", pokemon.id]);
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService
      .deletePokemonById(pokemon.id)
      .subscribe(() => this.goBack());
  }
}
