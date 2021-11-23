import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";


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
    HttpClientModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
  ],
  providers: [ParameterIsDateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
