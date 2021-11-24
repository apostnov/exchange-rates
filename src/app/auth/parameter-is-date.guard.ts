import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class ParameterIsDateGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return new Date(route.params["date"]).toString() !== "Invalid Date";
    }
}
