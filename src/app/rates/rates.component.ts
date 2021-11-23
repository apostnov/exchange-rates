import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { ExchangeRateApiService } from "../exchange-rate-api.service";
import { CurrencyTicker, IRateModel } from "../models/exchange-rate.model";

@Component({
  selector: "app-rates",
  templateUrl: "./rates.component.html",
  styleUrls: ["./rates.component.scss"]
})
export class RatesComponent implements OnInit {
  ratesSource = new MatTableDataSource<IRateModel>();
  displayedColumns: (keyof IRateModel)[] = ["ticker", "rate"];
  rates: IRateModel[] = [];
  tickers: CurrencyTicker[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: ExchangeRateApiService) {
    this.tickers = ExchangeRateApiService.tickers;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.ratesSource.paginator = this.paginator;
  }

  async getRates() {
    const response = await this.api.getRates("usd");

    if (response == null) {
      alert("error");
      return;
    }

    this.rates = Object.keys(response.rates).map((key: string) => {
      const ticker = key as CurrencyTicker;
      return {
        ticker: ticker,
        rate: response.rates[ticker]
      }
    });

    this.ratesSource.data = this.rates;
  }
}
