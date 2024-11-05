import { Injectable } from '@angular/core';
import { Car, Service } from '../models/car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private localStorageKey = 'cars';

  constructor() {}

  private isBrowser(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }

  // Download the list of cars from localStorage
  getCars(): Car[] {
    if (this.isBrowser()) {
      const cars = localStorage.getItem(this.localStorageKey);
      return cars ? JSON.parse(cars) : [];
    }
    return [];
  }

  // Save the list of cars to localStorage
  saveCars(cars: Car[]): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(cars));
    }
  }

  addCar(car: Car): void {
    const cars = this.getCars();
    cars.push(car);
    this.saveCars(cars);
  }

  removeCar(id: number): void {
    let cars = this.getCars();
    cars = cars.filter((car) => car.id !== id);
    this.saveCars(cars);
  }

  getCarById(id: number): Car | undefined {
    const cars = this.getCars();
    return cars.find((car) => car.id === id);
  }

  addService(carId: number, service: Service): void {
    const cars = this.getCars();
    const car = cars.find((car) => car.id === carId);
    if (car) {
      car.services.push(service);
      this.saveCars(cars);
    }
  }
}
