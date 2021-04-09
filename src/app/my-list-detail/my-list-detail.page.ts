import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Cocktail } from '../model/cocktail.model';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-my-list-detail',
  templateUrl: './my-list-detail.page.html',
  styleUrls: ['./my-list-detail.page.scss'],
})
export class MyListDetailPage implements OnInit {

  cocktail: Cocktail;
  isLoading = true;

  constructor(private route: ActivatedRoute, private db: DbService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.db.getCocktailById(+this.route.snapshot.params['id']).then(cocktail => {
      if(cocktail)
      this.cocktail = cocktail;
    }).then(() => {
      this.isLoading = false;
    });
  }

  async deleteCocktailById(id: number) {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: `Do you want to delete ${this.cocktail.strDrink} form your list?`,
      cssClass: 'buttonCss',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.db.deleteCocktailById(id).then(() => {
              this.router.navigate(['/my-list']);
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

}
