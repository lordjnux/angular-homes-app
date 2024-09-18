import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housing-location";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="houseLocation?.photo"
        alt="Exterior
      photo of {{ houseLocation?.name }}"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ houseLocation?.name }}</h2>
        <p class="listing-location">
          {{ houseLocation?.city }}, {{ houseLocation?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Available units: {{ houseLocation?.availableUnits }}</li>
          <li>Laundry: {{ houseLocation?.laundry }}</li>
          <li>WiFi: {{ houseLocation?.wifi }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <button class="primary" type="button">Apply now</button>
      </section>
    </article>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  housingService: HousingService = inject(HousingService);

  houseLocation: HousingLocation | undefined;

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);

    this.houseLocation =
      this.housingService.getHousingLocationById(housingLocationId);
  }
}
