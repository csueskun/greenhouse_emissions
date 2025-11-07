import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmissionsService, Emission } from '../emissions.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule, Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'emissions',
  imports: [CommonModule, ReactiveFormsModule, NgxChartsModule],
  templateUrl: './emissions.html',
  styleUrl: './emissions.scss',
})
export class EmissionsComponent implements OnInit {
  emissions: Emission[] = [];
  loading = false;
  error: string | null = null;
  filterForm: FormGroup;
  chartData: any[] = [];
  colorScheme: Color = {
    name: 'emissionScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#1976d2', '#43a047', '#fbc02d', '#e64a19']
  };
  legendPosition: LegendPosition = LegendPosition.Below;


  countries: string[] = [];
  emissionTypes: string[] = [];
  activities: string[] = [];

  constructor(private fb: FormBuilder, private service: EmissionsService) {
    this.filterForm = this.fb.group({
      country: [''],
      activity: [''],
      emission_type__name: [''],
    });
  }

  ngOnInit() {
    this.fetchFilters();
    this.loadEmissions();
  }

  fetchFilters() {
    this.countries = ['United Kingdom', 'Germany', 'United States', 'Canada'];
    this.emissionTypes = ['CO2', 'N2O'];
    this.activities = ['Air travel', 'Waste', 'Agriculture'];
  }

  loadEmissions() {
    this.loading = true;
    this.error = null;

    const params = { ...this.filterForm.value };

    this.service.getEmissions(params).subscribe({
      next: data => {
        this.emissions = data;
        this.loading = false;
        this.updateChartData();
      },
      error: err => {
        this.error = 'Failed to load data';
        this.loading = false;
      }
    });
  }

  applyFilter() {
    this.loadEmissions();
  }

  private updateChartData() {
    // Extract unique countries from emissions data
    const countries = Array.from(new Set(this.emissions.map(e => e.country)));

    // Group emissions data by country and year
    const groupedData = this.emissions.reduce((acc, emission) => {
      const key = `${emission.country}-${emission.year}`;
      if (!acc[key]) {
        acc[key] = {
          country: emission.country,
          year: emission.year,
          emissions: 0
        };
      }
      acc[key].emissions += emission.emissions;
      return acc;
    }, {} as Record<string, { country: string; year: number; emissions: number }>);

    // Convert grouped data into an array
    const groupedEmissions = Object.values(groupedData);

    // Transform grouped data into chart-friendly format
    this.chartData = countries.map(country => ({
      name: country,
      series: groupedEmissions
        .filter(e => e.country === country)
        .sort((a, b) => a.year - b.year)
        .map(e => ({
          name: e.year.toString(),
          value: e.emissions
        }))
    }));
  }
}
