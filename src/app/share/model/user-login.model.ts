export class UserLogin {
    username: string;
    password: string;
}

export class Token {
    token: string;
}

export class UserInfo {
    username: string;
    password: string;
    company: string;
    confirmPassword: string;
    first_name: string;
    last_name: string;
    phone: number;
    category: string;
}

export class CompanyModel {
    id: number;
    name: string;
    description: string;
    email: string;
    website: string;
    address: string;
    industry: string;
    image: any;
}


export class UserInterface {
    constructor(first_name: string, last_name: string, phone: number, username: string,
        password: string, company: number, category: string, image?: any) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.username = username;
        this.password = password;
        this.company = company;
        this.category = category;
        this.image = image;
    }
    first_name: string;
    last_name: string;
    phone: number;
    username: string;
    password: string;
    company: number;
    category: string;
    image: string;
}
