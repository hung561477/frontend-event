export class Events {
    code: number;
    message: string;
    data: any[];
}

export class Event {
    name: string;
    location: string;
    description: string;
    amenities: string;
    edition: number;
    view: number;
    venue: string;
    url: string;
    social_link: string;
    household_income: string;
    education: string;
    active: string;
    event_amenities: string;
    status: string;
    career: string;
    tag: string;
    size: number;
    budget: number;
    age_from: number;
    age_to: number;
    gender_male: number;
    gender_female: number;
    civil_single: number;
    civil_married: number;
    sponsor_deadline: string;
    created_date: string;
    date_from: string;
    date_to: string;
}


export class Age {
    status: boolean;
    from: number;
    to: number;
}

export class Invent {
    name: string;
    tag: string;
    budget_from: number;
    budget_to: number;
    kind_sponsorship: any = [];
    description: string;
    sponsorship_deadline: string;
    size: number;
    activities: string;
}