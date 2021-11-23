import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ParameterIsDateGuard } from "./auth/parameter-is-date.guard";
import { RatesComponent } from "./rates/rates.component";

const routes: Routes = [
  {
    path: ":ticker/:date",
    component: RatesComponent,
    canActivate: [ParameterIsDateGuard]
  },
  {
    path: "**",
    component: RatesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
