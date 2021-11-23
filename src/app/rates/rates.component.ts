import { Component, OnInit } from "@angular/core";
import { ExchangeRateApiService } from "../exchange-rate-api.service";
import { ExchangeRate } from "../models/exchange-rate.model";

@Component({
  selector: "app-rates",
  templateUrl: "./rates.component.html",
  styleUrls: ["./rates.component.scss"]
})
export class RatesComponent implements OnInit {
  rates?: ExchangeRate[];

  constructor(private api: ExchangeRateApiService) {}

  ngOnInit(): void {
  }

  async getRates() {
    const response = await this.api.getRates("usd");

    this.rates = [...response?.rates];
    console.log(response?.rates);
  }
}
