import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RatesComponent as RatesComponentComponent } from "./rates-component.component";

describe("RatesComponent", () => {
  let component: RatesComponentComponent;
  let fixture: ComponentFixture<RatesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatesComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
