import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  //favouritesList: Array<any> = [];
  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          'https://api.spotify.com/v1/browse/new-releases',
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  getArtistById(id): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  getAlbumsByArtistId(id): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    const params = new HttpParams()
      .set('include_groups', 'album,single')
      .set('limit', '50');
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          //`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`,
          `https://api.spotify.com/v1/artists/${id}/albums`,
          {
            params,

            headers: { Authorization: `Bearer ${token}` },
          }
        );
      })
    );
  }

  getAlbumById(id): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
    );
  }

  searchArtists(searchString): Observable<SpotifyApi.ArtistSearchResponse> {
    const params = new HttpParams()
      .set('q', searchString)
      .set('type', 'artist')
      .set('limit', '50');
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          // `https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`,
          `https://api.spotify.com/v1/search`,
          { params, headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  addToFavourites(id): Observable<[String]> {
    return this.http.put<any>(
      `${environment.userAPIBase}/favourites/${id}`,
      id
    );
  }

  removeFromFavourites(id): Observable<any> {
    return this.http
      .delete<[String]>(`${environment.userAPIBase}/favourites/${id}`)
      .pipe(
        mergeMap((favouritesArray) => {
          if (favouritesArray.length > 0) {
            return this.spotifyToken.getBearerToken().pipe(
              mergeMap((token) => {
                return this.http.get<any>(
                  `https://api.spotify.com/v1/tracks?ids=${favouritesArray}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
              })
            );
          }
          return new Observable((o) => {
            o.next({ tracks: [] });
          });
        })
      );
  }

  getFavourites(): Observable<any> {
    return this.http
      .get<[String]>(`${environment.userAPIBase}/favourites`)
      .pipe(
        mergeMap((favouritesArray) => {
          //console.log(favouritesArray);
          if (favouritesArray.length > 0) {
            return this.spotifyToken.getBearerToken().pipe(
              mergeMap((token) => {
                return this.http.get<any>(
                  `https://api.spotify.com/v1/tracks?ids=${favouritesArray}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
              })
            );
          }
          return new Observable((o) => {
            o.next({ tracks: [] });
          });
        })
      );
  }

  ///OLDER
  // addToFavourites(id): boolean {
  //   if (!id || this.favouritesList.length >= 50) {
  //     //check here for null and undefined
  //     return false;
  //   }

  //   this.favouritesList.push(id);
  //   return true;
  // }

  // removeFromFavourites(id): Observable<any> {
  //   let position = this.favouritesList.indexOf(id);
  //   this.favouritesList.splice(position, 1);

  //   return this.getFavourites();
  // }

  // getFavourites(): Observable<any> {
  //   if (this.favouritesList.length > 0) {
  //     return this.spotifyToken.getBearerToken().pipe(
  //       mergeMap((token) => {
  //         return this.http.get<any>(
  //           `https://api.spotify.com/v1/tracks?ids=${this.favouritesList.join()}`,
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );
  //       })
  //     );
  //   }
  //   return new Observable((o) => {
  //     o.next([]);
  //   });
  // }
}
