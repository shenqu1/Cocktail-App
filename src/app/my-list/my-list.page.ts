import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cocktail } from '../model/cocktail.model';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.page.html',
  styleUrls: ['./my-list.page.scss'],
})
export class MyListPage implements OnInit {

  cocktails: Cocktail[] = [];
  constructor(private db: DbService, private route: Router) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if(rdy) {
        this.db.getCocktails().subscribe(cocktails => {
          this.cocktails = cocktails;
        })
      }
    })
  }
  navigateToEditPage(id: number) {
    this.route.navigate(['/cocktail-add-or-edit', id])
  }
}
