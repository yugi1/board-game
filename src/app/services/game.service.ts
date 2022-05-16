import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }
  
    searchByName(searchText: string): Observable<Game[]> {
      const alteredText = searchText.replace(/\s/g, '+');
      return this.http.get<Game[]>(`https://api.boardgameatlas.com/api/search?name=${alteredText}&client_id=${environment.boardgameAPI}`).pipe(
          map(response => response['games'])
      )
  };

  getById(gameId: string): Observable<Game> {
    return this.http.get<Game>(`https://api.boardgameatlas.com/api/search?ids=${gameId}&client_id=${environment.boardgameAPI}`).pipe(
        map(response => response['games'])
    );
}

}
