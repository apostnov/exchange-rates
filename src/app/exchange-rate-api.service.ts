import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ExchangeRateApiService {

  constructor(private http: HttpClient) { }

  getRates(currencyTicker: string): Promise<any>  {
    return this.http.get(`https://api.exchangerate-api.com/v4/latest/${currencyTicker}`).toPromise();
  }
}
