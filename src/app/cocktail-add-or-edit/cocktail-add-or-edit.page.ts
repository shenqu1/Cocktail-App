import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Cocktail } from '../model/cocktail.model';
import { Ingredient } from '../model/ingredient.model';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-cocktail-add-or-edit',
  templateUrl: './cocktail-add-or-edit.page.html',
  styleUrls: ['./cocktail-add-or-edit.page.scss'],
})
export class CocktailAddOrEditPage implements OnInit {

  cocktailForm: FormGroup;

  cocktail: Cocktail = null;

  isEditMode = false;

  title= 'New Cocktail';

  isLoading = true;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private db: DbService, private alertController: AlertController, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {

    let id = this.route.snapshot.params['id'];

    if(id) {
      this.isEditMode = true;
      this.db.getCocktailById(+id).then(cocktail => {
        if(cocktail){
          this.cocktail = cocktail;
          this.isLoading = false;
          this.createForm();
        }
      });
      this.title = 'Edit Cocktail';
    } else {
      this.isLoading = false;
      this.createForm();
    }

  }

  private createForm() {
    this.cocktailForm = this.fb.group({
      name: [this.isEditMode ? this.cocktail.strDrink : '', Validators.required],
      img: [this.isEditMode ? this.cocktail.strDrinkThumb : '', Validators.required],
      instruction: [this.isEditMode ? this.cocktail.strInstructions : '', Validators.required],
      ingredients: this.fb.array([])
    });
    if(this.isEditMode) {
      this.cocktail.ingredients.forEach(i => {
        this.ingredients.push(this.fb.group({
          ingredientName: [i.name, Validators.required],
          strMeasure: i.strMeasure,
        }));
      })
    }else {
      this.addIngredient();
    }
  }

  get ingredients(): FormArray {
    return this.cocktailForm.get('ingredients') as FormArray;
  }

  newIngredient(): FormGroup {
    return this.fb.group({
      ingredientName: ['', Validators.required],
      strMeasure: '',
    });
  }

  addIngredient() {
    this.ingredients.push(this.newIngredient());
  }

  removeIngredient(i:number) {
    this.ingredients.removeAt(i);
  }

  addOrEditCocktail() {
    let strDrink = this.cocktailForm.get('name').value;
    let strDrinkThumb = this.cocktailForm.get('img').value;
    let strInstruction = this.cocktailForm.get('instruction').value;
    let ingredients: Ingredient[] = [];
    this.ingredients.controls.forEach(i => {
      ingredients.push(new Ingredient(i.get('ingredientName').value, i.get('strMeasure').value));
    });
    if(!this.isEditMode) {
      this.addCocktail(strDrink, strDrinkThumb, strInstruction, ingredients);
    } else {
      this.updateCocktail(strDrink, strDrinkThumb, strInstruction, ingredients);
    }
  }

  private addCocktail(strDrink, strDrinkThumb, strInstruction, ingredients) {
    this.db.addCocktail(strDrink,strDrinkThumb,strInstruction,ingredients).then(id => {
      let message = `Cocktail ${strDrink} has been added to your list!`
      this.showAlert(message, id);
    });
  }

  private updateCocktail(strDrink, strDrinkThumb, strInstruction, ingredients) {
    this.cocktail.strDrink = strDrink;
    this.cocktail.strDrinkThumb = strDrinkThumb;
    this.cocktail.strInstructions = strInstruction;
    this.cocktail.ingredients = ingredients;
    this.db.updateCocktail(this.cocktail).then(() => {
      let message = `Cocktail ${strDrink} has been updated!`
      this.showAlert(message, this.cocktail.id);
    });
  }

  private async showAlert(message:string, id: number) {
    const alert = await this.alertController.create({
      header: 'Congratulation',
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop().then(() => {
              this.router.navigate(['/my-list', id]);
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async cancelAddOrEdit() {
    this.navCtrl.pop();
  }
}
