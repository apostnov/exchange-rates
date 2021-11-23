import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ParameterIsDateGuard } from "./auth/parameter-is-date.guard";

const routes: Routes = [
  {
    path: ":date",
    component: AppComponent,
    canActivate: [ParameterIsDateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
