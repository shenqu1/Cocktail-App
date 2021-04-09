import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cocktail } from '../model/cocktail.model';
import { map } from 'rxjs/operators';
import { Ingredient } from '../model/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  cocktails: Cocktail[] = [];

  constructor(private http:HttpClient) { }

  fetchCocktails(name: string) {
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
    return this.http.get<{[key:string]: {[key:string]: string}[]}>(url).pipe(
      map(resData => {
        let cocktails: Cocktail[] = [];
        let array = resData['drinks'];
        if(!array) return null;
        array.forEach(c => {
          let ingredients: Ingredient[] = [];
          for(let i = 0; i < 16; i++) {
            let ingredient = c[`strIngredient${i}`];
            let strMethod = c[`strMeasure${i}`];
            if(ingredient) {
              ingredients.push(new Ingredient(ingredient, strMethod));
            }
          }
          cocktails.push(new Cocktail(c['strDrink'], c['strDrinkThumb'], c['strInstructions'], ingredients, c['idDrink']));
        });
        this.cocktails = cocktails;
        return [...this.cocktails];
      })
    );
  }

  getCocktailById(id: string) {
    return this.cocktails.find(c => c.idDrink == id);
  }
}
