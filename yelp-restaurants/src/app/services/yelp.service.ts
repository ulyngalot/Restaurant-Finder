import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestaurantSearchResponse } from '../models/restaurant.model';

@Injectable({ providedIn: 'root' })
export class YelpService {
  private readonly proxyUrl = 'http://localhost:3000/api/restaurants';

  constructor(private http: HttpClient) {}

  searchRestaurants(city: string): Observable<RestaurantSearchResponse> {
    const params = new HttpParams().set('city', city);
    return this.http.get<RestaurantSearchResponse>(this.proxyUrl, { params });
  }
}
