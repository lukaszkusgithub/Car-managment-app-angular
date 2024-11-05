export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  services: Service[];
}

export interface Service {
  part: string;
  cost: number;
}
