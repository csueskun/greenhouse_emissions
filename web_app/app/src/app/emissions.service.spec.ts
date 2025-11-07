import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmissionsService, Emission } from './emissions.service';

describe('EmissionsService', () => {
  let service: EmissionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmissionsService]
    });

    service = TestBed.inject(EmissionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch emissions', () => {
    const dummyEmissions: Emission[] = [
      { year: 2020, emissions: 5, emission_type: { name: 'CO2' }, country: 'UK', activity: 'Air travel' },
      { year: 2021, emissions: 3, emission_type: { name: 'N2O' }, country: 'UK', activity: 'Waste' },
    ];

    service.getEmissions().subscribe(emissions => {
      expect(emissions).toEqual(dummyEmissions);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEmissions);
  });
});
