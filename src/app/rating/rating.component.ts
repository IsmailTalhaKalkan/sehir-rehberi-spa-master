import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RatingService } from "../services/rating.service";
import { RatingForCity } from "../models/ratingForCity";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.css"],
})
export class RatingComponent implements OnInit {
  control = new FormControl();
  ct = ["Transportation", "Food", "View", "Price"];
  currentCityID: any;
  rateGroup;
  rate: RatingForCity = new RatingForCity();
  @Input() rating: number;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private ratingService: RatingService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.currentCityID = params["cityId"];
    });
  }

  onClick(rating: number, category: string): void {
    this.rating = rating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating,
    });
    if (category == "Transportation") {
      this.rate.transportation = rating;
      console.log(this.rate.transportation);
    }
    if (category == "Food") {
      this.rate.food = rating;
    }
    if (category == "View") {
      this.rate.view = rating;
    }
    if (category == "Price") {
      this.rate.pricing = rating;
    }
    this.rate.counter = 1;
    if (Object.keys(this.rate).length == 5) {
      console.log(this.rate);
    }
  }
  submitRates(cityRate: RatingForCity) {
    this.ratingService.newRating(cityRate, this.currentCityID);
  }

  formConsole() {}
}
