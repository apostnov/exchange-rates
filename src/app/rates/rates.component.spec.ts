import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { of } from "rxjs";

import { RatesComponent } from "./rates.component";
import { ExchangeRateApiService } from "../exchange-rate-api.service";

const paramsMock = { ticker: "usd", date: "11.11.2020" };
const activatedRouteMock = { params: of(paramsMock) };
const routeRouteMock = { params: of({ })};

describe("RatesComponent", () => {
  let component: RatesComponent;
  let fixture: ComponentFixture<RatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatesComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        ExchangeRateApiService,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        }]
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should should have ticker provided in route", () => {
    expect(component.ticker === "USD").toBeTrue();
  });

  it("should should have datepicker value provided in route", () => {
    expect(component.ratesDate).toEqual(new Date(paramsMock.date));
  });
});


describe("RatesComponent on root route", () => {
  let component: RatesComponent;
  let fixture: ComponentFixture<RatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [RatesComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [
          ExchangeRateApiService,
          {
            provide: ActivatedRoute,
            useValue: routeRouteMock
          }]
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should should have default ticker", () => {
    expect(component.ticker === "GBP").toBeTrue();
  });

  it("should should have datepicker not empty", () => {
    expect(component.ratesDate).toBeTruthy();
  });
});
