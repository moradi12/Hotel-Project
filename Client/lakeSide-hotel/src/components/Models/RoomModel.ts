export class RoomModel {
    [x: string]: any;
    id: number;
    name: string;
    description: string;
    title: string;
    checkInDate: Date;
    checkOutDate: Date;
    price: number;
    available: boolean;
    image: string;
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
      image: string,
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
      this.image = image;
      this.roomType = roomType;
    }
  }
  