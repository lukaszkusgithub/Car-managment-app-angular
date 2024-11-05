import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../services/car.service';
import { Car, Service } from '../models/car.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  car: Car | undefined;
  newService: Service = { part: '', cost: 0 };

  constructor(private route: ActivatedRoute, private carService: CarService) {}

  ngOnInit(): void {
    const carId = Number(this.route.snapshot.paramMap.get('id'));
    this.car = this.carService.getCarById(carId);
  }

  addService(): void {
    if (this.car) {
      this.carService.addService(this.car.id, this.newService);
      this.newService = { part: '', cost: 0 };
    }
  }
}
