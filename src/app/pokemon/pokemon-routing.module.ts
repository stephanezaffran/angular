import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddPokemonComponent } from "./add-pokemon/add-pokemon.component";
import { DetailPokemonComponent } from "./detail-pokemon/detail-pokemon.component";
import { EditPokemonComponent } from "./edit-pokemon/edit-pokemon.component";
import { ListPokemonComponent } from "./list-pokemon/list-pokemon.component";
import { AuthGuard } from "../auth.guard";

const pokemonRoutes: Routes = [
  { path: "edit/pokemon/:id", component: EditPokemonComponent, canActivate:[AuthGuard] },
  { path: "pokemons", component: ListPokemonComponent , canActivate:[AuthGuard]},
  { path: "pokemon/:id", component: DetailPokemonComponent , canActivate:[AuthGuard]},
  { path: "add", component: AddPokemonComponent , canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(pokemonRoutes)],
  exports: [RouterModule],
})
export class pokemonRoutingModule {}
