import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Emission {
  year: number;
  emissions: number;
  emission_type: { name: string };
  country: string;
  activity: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmissionsService {
  private apiUrl = 'http://localhost:8000/api/emissions/';

  constructor(private http: HttpClient) { }

  getEmissions(filters?: any): Observable<Emission[]> {
    return this.http.get<Emission[]>(this.apiUrl, { params: filters });
  }
}