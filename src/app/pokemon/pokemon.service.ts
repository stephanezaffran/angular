import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Observer, of, tap } from "rxjs";
import { InMemoryDataService } from "../in-memory-data.service";
import { Pokemon } from "./pokemon";

@Injectable()
// { providedIn: "root",}  on ne veut pas le service dispo dans tout le projet
export class PokemonService {
  constructor(
    private http: HttpClient,
    private inMemoryDataService: InMemoryDataService
  ) {}

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>("api/POKEMONS").pipe(
      tap((pokemonList) => this.log(pokemonList)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    //return POKEMONS.find((pok) => pok.id == pokemonId); old

    return this.http.get<Pokemon>(`api/POKEMONS/ ${pokemonId}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOption = {
      headers: new HttpHeaders({ "content-type": "application/json" }),
    };
    return this.http.put("api/POKEMONS", pokemon, httpOption).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/POKEMONS/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  addNewPokemon(pokemon:Pokemon):Observable<Pokemon>{
    const httpOption = {
      headers: new HttpHeaders({ "content-type": "application/json" }),
    };
    return this.http.post<Pokemon>("api/POKEMONS",pokemon,httpOption).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, Pokemon))
    )
  }

  searchPokemonList(term:string):Observable<Pokemon[]>{
    if(term.length <= 1){
      return of([]);
    }
    return this.http.get<Pokemon[]>(`api/POKEMONS/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    )
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
  
  getPokemonTypeList(): string[] {
    return [
      "Plante",
      "Feu",
      "Eau",
      "Insecte",
      "Normal",
      "Electrik",
      "Poisson",
      "Fée",
      "Vol",
      "Combat",
      "Psy",
    ];
  }
}
