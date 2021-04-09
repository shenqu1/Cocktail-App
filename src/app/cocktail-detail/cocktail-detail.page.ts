import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cocktail } from '../model/cocktail.model';
import { CocktailService } from '../service/cocktail.service';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-cocktail-detail',
  templateUrl: './cocktail-detail.page.html',
  styleUrls: ['./cocktail-detail.page.scss'],
})
export class CocktailDetailPage implements OnInit {

  cocktail: Cocktail;

  databaseReady = false;

  constructor(private route: ActivatedRoute, private cocktailService: CocktailService, private db: DbService, private alertController: AlertController) { }

  ngOnInit() {
    this.cocktail = this.cocktailService.getCocktailById(this.route.snapshot.params['id']);
    this.db.getDatabaseState().subscribe(rdy => {
      this.databaseReady = rdy;
    })
  }

  async addToMyList() {
    this.db.addCocktail(this.cocktail.strDrink,this.cocktail.strDrinkThumb, this.cocktail.strInstructions, this.cocktail.ingredients).then(async () => {
      const alert = await this.alertController.create({
        header: 'Congratulation',
        message: `Cocktail ${this.cocktail.strDrink} has been added to your list!`,
        buttons: ['OK']
      });
      await alert.present();
    })

  }

}
