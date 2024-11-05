import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  newCar: Car = {
    id: 0,
    brand: '',
    model: '',
    year: 0,
    services: [],
  };

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.cars = this.carService.getCars();
  }

  addCar(): void {
    this.newCar.id = new Date().getTime();
    this.carService.addCar(this.newCar);
    this.newCar = { id: 0, brand: '', model: '', year: 0, services: [] };
    this.loadCars();
  }

  removeCar(id: number): void {
    this.carService.removeCar(id);
    this.loadCars();
  }
}
