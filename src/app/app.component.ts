/*********************************************************************************
 *  WEB422 – Assignment 06
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 *  assignment has been copied manually or electronically from any other source (including web sites) or
 *  distributed to other students.
 *
 *  Name: GUSTAVO MARTINEZ DE OLIVEIRA TAVARES Student ID: 167583186 Date: 04/02/2021
 *  Online Link: https://spotify-web422-rose.vercel.app/
 *
 ********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}
  public searchString: string;
  public token: any;

  handleSearch() {
    //check searchString to prevent empty search
    if (!this.searchString || this.searchString.match(/^ *$/) !== null) {
      return;
    }
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }

  title = 'web422-a6';

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
  }
}
