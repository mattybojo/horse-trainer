import { Injectable } from '@angular/core';
import { RouteParam } from '../models/route-param.model';

@Injectable({
  providedIn: 'root'
})
export class NavDataService {

  private _routeParams: RouteParam[];
  set routeParams(routeParams: RouteParam[]) {
    this._routeParams = routeParams;
  }

  updateRouteParam(rpKey: string, rpValue: any) {
    const index = this._routeParams.findIndex((x: RouteParam) => x.key === rpKey);
    this._routeParams[index].value = rpValue;
  }

  getRouteParamValue(rpKey: string): any {
    return this._routeParams.find((x: RouteParam) => x.key === rpKey).value;
  }

  constructor() {}
}
