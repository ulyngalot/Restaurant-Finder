import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestaurantSearchResponse } from '../models/restaurant.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class YelpService {
  private readonly proxyUrl = environment.proxyUrl;

  constructor(private http: HttpClient) {}

  searchRestaurants(city: string): Observable<RestaurantSearchResponse> {
    const params = new HttpParams().set('city', city);
    return this.http.get<RestaurantSearchResponse>(this.proxyUrl, { params });
  }
}
