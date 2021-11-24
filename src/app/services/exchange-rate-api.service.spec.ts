import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { ExchangeRateApiService } from "src/app/services";

describe("ExchangeRateApiService", () => {
    let service: ExchangeRateApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(ExchangeRateApiService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
