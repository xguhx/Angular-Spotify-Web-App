import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  albums;
  artist;
  sub;

  id;

  constructor(private data: MusicDataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.data
        .getArtistById(this.id)
        .subscribe((data) => (this.artist = data));

      this.data.getAlbumsByArtistId(this.id).subscribe((data) => {
        this.albums = data.items.filter(
          (album, index, self) =>
            index === self.findIndex((c) => c.name === album.name)
        );
        //console.log(this.albums);
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
