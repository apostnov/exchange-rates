import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { IExchangeResponse } from "./models/exchange-rate.model";

@Injectable({
  providedIn: "root"
})
export class ExchangeRateApiService {

  constructor(private http: HttpClient) { }

  getRates(currencyTicker: string): Promise<IExchangeResponse | undefined>  {
    return this.http.get<IExchangeResponse>(`https://api.exchangerate-api.com/v4/latest/${currencyTicker}`).toPromise();
  }
}
