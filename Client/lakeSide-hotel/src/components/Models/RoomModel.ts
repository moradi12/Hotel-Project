export class RoomModel {
  id: number;
  name: string;
  description: string;
  title: string;
  checkInDate: Date;
  checkOutDate: Date;
  price: number;
  available: boolean;
  photo?: string; // Use 'photo' to align with the backend field name
  roomType: string;

  constructor(
    id: number,
    name: string,
    description: string,
    title: string,
    checkInDate: Date,
    checkOutDate: Date,
    price: number,
    available: boolean,
    photo: string, // Renamed to 'photo' to match backend
    roomType: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.title = title;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.price = price;
    this.available = available;
    this.photo = photo;
    this.roomType = roomType;
  }
}
