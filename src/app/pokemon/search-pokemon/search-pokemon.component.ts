import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { Observable,Subject } from 'rxjs';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',  
})
export class SearchPokemonComponent implements OnInit{
searchTerms = new Subject<string>();
pokemon$: Observable<Pokemon[]>;

  constructor(private router:Router){}
  ngOnInit() {
    
  }
  search(term:string){

  }
  goToDetail(pokemon:Pokemon){
    const link =['/pokemon',pokemon.id];

  }

}
