export class ContactModel {
    constructor(name: string, email: string, description: string) {
        this.name = name;
        this.email = email;
        this.description = description;
    }
    name: string;
    email: string;
    description: string;
}

export class LocationModel {
    constructor(name: string, latitude: number, longitude: number) {
        this.name = name;
        this.longtitude = longitude;
        this.latitude = latitude;
    }

    name: string;
    longtitude: number;
    latitude: number;
}