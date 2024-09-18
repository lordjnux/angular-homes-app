import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housing-location";
import { ReactiveFormsModule, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First name</label>
          <input type="text" id="first-name" formControlName="firstName" />
          <label for="last-name">Last name</label>
          <input type="text" id="last-name" formControlName="lastName" />
          <label for="email">email</label>
          <input type="email" id="email" formControlName="email" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  housingService: HousingService = inject(HousingService);

  houseLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);

    this.houseLocation =
      this.housingService.getHousingLocationById(housingLocationId);
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? ""
    );
  }
}
