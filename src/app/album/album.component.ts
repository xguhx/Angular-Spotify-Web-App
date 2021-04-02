import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  album;
  id;
  sub;

  addToFavourites(trackID) {
    this.sub = this.data.addToFavourites(trackID).subscribe(
      (success) => {
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 1500,
        });
      },
      (err) => {
        this.snackBar.open('Unable to add song to Favourites', 'Try Again', {
          duration: 1500,
        });
      }
    );
  }

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private data: MusicDataService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.data.getAlbumById(this.id).subscribe((data) => {
        this.album = data;
        // console.log(this.album);
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
