import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  results: any;

  searchQuery: any;
  sub;

  constructor(private router: ActivatedRoute, private data: MusicDataService) {}

  ngOnInit(): void {
    this.sub = this.router.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];
      //console.log(this.searchQuery);

      this.data.searchArtists(this.searchQuery).subscribe((data) => {
        this.results = data.artists.items.filter(
          (result) => result.images.length > 0
        );
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
