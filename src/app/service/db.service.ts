import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cocktail } from '../model/cocktail.model';
import { Ingredient } from '../model/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private databaseObj: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  cocktails = new BehaviorSubject([]);

  constructor(private sqlite: SQLite, private plt: Platform) {
    this.plt.ready().then(() => {
      this.createDBAndTables();
    });
  }

  private createDBAndTables() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.databaseObj = db;
      this.databaseObj.executeSql(`CREATE TABLE IF NOT EXISTS COCKTAIL(id INTEGER PRIMARY KEY AUTOINCREMENT, strDrink VARCHAR(30), strDrinkThumb TEXT, strInstructions TEXT, ingredientsString TEXT)`, []).then(() => {
        this.loadCocktails();
        this.dbReady.next(true);
      })
      .catch(e => console.log(e));

    }).catch(e => console.log(e));
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getCocktails(): Observable<Cocktail[]> {
    return this.cocktails.asObservable();
  }

  loadCocktails() {
    return this.databaseObj.executeSql(`SELECT * FROM COCKTAIL`, []).then(res => {
      let cocktails: Cocktail[] = [];
      for(let i = 0; i < res.rows.length; i++) {
        let ingredients:Ingredient[] = JSON.parse(res.rows.item(i).ingredientsString);
        cocktails.push({
          id: res.rows.item(i).id,
          strDrink: res.rows.item(i).strDrink,
          strDrinkThumb: res.rows.item(i).strDrinkThumb,
          strInstructions: res.rows.item(i).strInstructions,
          ingredients: ingredients
        });
      }
      this.cocktails.next(cocktails);
      // console.log('From database', res);
      // console.log('After serialize', cocktails);
    }).catch(e=>console.log(e));
  }

  addCocktail(strDrink, strDrinkThumb, strInstructions, ingredients) {
    let data = [strDrink, strDrinkThumb, strInstructions, JSON.stringify(ingredients)];
    return this.databaseObj.executeSql(`INSERT INTO COCKTAIL(strDrink, strDrinkThumb, strInstructions, ingredientsString) VALUES(?, ?, ?, ?)`, data).then(res => {
      this.loadCocktails();
      // console.log('Added Cocktail', res);
      // console.log("Inserted Id", res.insertId);
      return res.insertId;
    }).catch(e=>console.log(e));
  }

  getCocktailById(id: number) {
    return this.databaseObj.executeSql(`SELECT * FROM COCKTAIL WHERE ID=?`, [id]).then(res => {
      let ingredients = JSON.parse(res.rows.item(0).ingredientsString);
      //console.log("return from database", res);
      return {
          id: res.rows.item(0).id,
          strDrink: res.rows.item(0).strDrink,
          strDrinkThumb: res.rows.item(0).strDrinkThumb,
          strInstructions: res.rows.item(0).strInstructions,
          ingredients: ingredients
      }
    }).catch(e=>console.log(e));
  }

  deleteCocktailById(id: number) {
    return this.databaseObj.executeSql(`DELETE FROM COCKTAIL WHERE ID=?`, [id]).then(res => {
      this.loadCocktails();
    }).catch(e=>console.log(e));
  }

  updateCocktail(cocktail: Cocktail) {
    let data = [cocktail.strDrink, cocktail.strDrinkThumb, cocktail.strInstructions, JSON.stringify(cocktail.ingredients), cocktail.id]
    return this.databaseObj.executeSql(`UPDATE COCKTAIL SET strDrink=?, strDrinkThumb=?, strInstructions=?, ingredientsString=? WHERE ID=?`, data).then(res => {
      this.loadCocktails();
      // console.log('updated', res);
      // console.log('After updated', this.cocktails);
    }).catch(e=> console.log(e));
  }

}
