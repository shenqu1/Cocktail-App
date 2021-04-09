import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../model/cocktail.model';
import { CocktailService } from '../service/cocktail.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cocktails: Cocktail[] = [];

  searchValue: string = '';

  isLoading = false;

  initializeReady = false;

  constructor(private cocktailService: CocktailService) {}

  ngOnInit():void {
  }

  onInput() {
    this.isLoading = true;
    if(this.searchValue == '')  {
      this.cocktails = [];
      this.isLoading = false;
      return;
    };
    this.cocktailService.fetchCocktails(this.searchValue).subscribe(c => {
      this.cocktails = c;
      this.isLoading = false;
    });
  }
}
