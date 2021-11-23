import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ParameterIsDateGuard } from "./auth/parameter-is-date.guard";
import { RatesComponent } from "./rates/rates.component";

@NgModule({
  declarations: [
    AppComponent,
    RatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ParameterIsDateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
