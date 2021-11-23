import { Component, OnInit } from "@angular/core";
import { ExchangeRateApiService } from "../exchange-rate-api.service";

@Component({
  selector: "app-rates",
  templateUrl: "./rates.component.html",
  styleUrls: ["./rates.component.scss"]
})
export class RatesComponent implements OnInit {

  constructor(private api: ExchangeRateApiService) {}

  ngOnInit(): void {
  }

  async getRates() {
    const rates = await this.api.getRates("usd");
    console.log(rates);
  }
}
