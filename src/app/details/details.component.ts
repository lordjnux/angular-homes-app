import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housing-location";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule],
  template: ` <p>details works! {{ houseLocation?.id }}</p> `,
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
