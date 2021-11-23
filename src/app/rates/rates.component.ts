import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { ExchangeRateApiService } from "../exchange-rate-api.service";
import { CurrencyTicker, IRateModel } from "../models/exchange-rate.model";

@Component({
  selector: "app-rates",
  templateUrl: "./rates.component.html",
  styleUrls: ["./rates.component.scss"]
})
export class RatesComponent implements OnInit, AfterViewInit {
  ratesSource = new MatTableDataSource<IRateModel>();
  displayedColumns: (keyof IRateModel)[] = ["ticker", "rate"];
  rates: IRateModel[] = [];
  ratesDate = new Date();
  tickers: CurrencyTicker[];
  ticker: CurrencyTicker = "GBP";
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ExchangeRateApiService, private readonly route: ActivatedRoute, private readonly router: Router) {
    this.tickers = ExchangeRateApiService.tickers;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      const ticker = params["ticker"]?.toUpperCase();

      if (ticker != null && this.tickers.indexOf(ticker) !== -1) {
        this.ticker = ticker;
      }

      const ratesDate = params["date"] && new Date(params["date"]);

      if (ratesDate != null && ratesDate.toString() !== "Invalid Date") {
        this.ratesDate = ratesDate;
      }

    this.getRates();
    });
  }

  ngAfterViewInit() {
    this.ratesSource.paginator = this.paginator;
    this.ratesSource.sort = this.sort;
  }

  onInputChange() {
    this.router.navigate([this.ticker, this.ratesDate.toLocaleDateString()]);
  }

  async getRates() {
    const response = await this.api.getRates(this.ticker);

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
