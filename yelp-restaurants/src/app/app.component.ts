import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YelpService } from './services/yelp.service';
import { Restaurant } from './models/restaurant.model';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, RestaurantCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  restaurants: Restaurant[] = [];
  loading = false;
  error = '';
  searchedCity = '';
  total = 0;

  constructor(private yelpService: YelpService) {}

  onSearch(city: string) {
    this.loading = true;
    this.error = '';
    this.restaurants = [];
    this.searchedCity = city;

    this.yelpService.searchRestaurants(city).subscribe({
      next: (data) => {
        this.restaurants = data.restaurants;
        this.total = data.total;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Something went wrong. Please try again.';
        this.loading = false;
      }
    });
  }
}
