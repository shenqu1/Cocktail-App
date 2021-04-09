import { Ingredient } from "./ingredient.model";

export class Cocktail {
  constructor(public strDrink: string, public strDrinkThumb: string, public strInstructions: string, public ingredients: Ingredient[], public idDrink?: string, public id?: number, public ingredientsString?: string) {}
}
