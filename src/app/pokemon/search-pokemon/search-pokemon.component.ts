import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Pokemon } from "../pokemon";
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from "rxjs";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-search-pokemon",
  templateUrl: "./search-pokemon.component.html",
})
export class SearchPokemonComponent implements OnInit {
  searchTerms = new Subject<string>(); //enregistrement des recherches ds champs de recherche {a...ab...abs...ab...abc....}
  pokemons$ : Observable<Pokemon[]>;

  constructor(private router: Router, private pokemonService: PokemonService) {}
  ngOnInit() {
    this.pokemons$ = this.searchTerms.pipe(
      // {....a.ab...abz.ab...abc....} "." == temps ....
      debounceTime(300), // tri en milliseconde, exclue les evt trop courts pour limiter les appels serveurs
      // {.....ab....ab......abc} => doublon a exclure
      distinctUntilChanged(),
      // {.....ab......abc} => doublon a exclure

      // map((term) => this.pokemonService.searchPokemonList(term)) ===> erreur car on travaille sur observable
      //on utilise options : concatMap - mergeMap ou switchMap (generalement switch qui affiche que derniere)
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    );
  }
  search(term: string) {
    this.searchTerms.next(term); // comme push mais pour un subject (flux de donnee)
    // this.pokemonService.searchPokemonList(term).subscribe((pok) =>this.pokemons$ = pok )
  }
  goToDetail(pokemon: Pokemon) {
    const link = ["/pokemon/", pokemon.id];
    this.router.navigate(link);
  }
}
