import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { ExchangeRateApiService } from "src/app/services";
import { CurrencyTicker, IRate } from "src/app/models/exchange-rate.model";

@Component({
    selector: "app-rates",
    templateUrl: "./rates.component.html",
    styleUrls: ["./rates.component.scss"]
})
export class RatesComponent implements OnInit, AfterViewInit {
    ratesSource = new MatTableDataSource<IRate>();
    displayedColumns: (keyof IRate)[] = ["ticker", "rate"];
    rates: IRate[] = [];
    ratesDate = new Date();
    tickers: CurrencyTicker[];
    ticker: CurrencyTicker = "GBP";

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private readonly api: ExchangeRateApiService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly matSnackBar: MatSnackBar) {
        this.tickers = ExchangeRateApiService.tickers;
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
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
        try {
            const response = await this.api.getRates(this.ticker);

            if (response == null) {
                throw "Empty response";
            }

            this.rates = Object.keys(response.rates).map((key: string) => {
                const ticker = key as CurrencyTicker;
                return {
                    ticker: ticker,
                    rate: response.rates[ticker]
                }
            });

            this.ratesSource.data = this.rates;
            this.matSnackBar.open("Rates received successfully.", undefined,
                {
                    duration: 1000
                });
        } catch (e: unknown) {
            const errorConfig: MatSnackBarConfig = {
                verticalPosition: "top",
                horizontalPosition: "right"
            }

            if (typeof e === "string") {
                this.matSnackBar.open(e, "OK", errorConfig);
            } else {
                this.matSnackBar.open("Inknown error", "OK", errorConfig);
            }
        }
    }
}
