export interface Car {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
}

export interface OptionType {
  value: string,
  label: string
}

export interface CoordinateType {
  latitude: number,
  longitude: number
}

export interface ModalEditProps {
  closeModalWindow: () => void;
  saveNewValues: (newCar: Car) => void;
  deleteCar: (id: number) => void;
  car: Car | undefined;
}

export interface CardProps {
  car: Car;
  setEditIdCar: (value: number) => void;
  setIsEdit: (value: boolean) => void;
}
