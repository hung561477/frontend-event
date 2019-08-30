import { Injectable } from '@angular/core';

@Injectable()
export class PeriodsService {
  getYears() {
    return [
      '1', '2', '3',
      '4', '5', '6',
      '7', '8',
    ];
  }

  getMonths() {
    return [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec',
    ];
  }

  getWeeks() {
    return [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
    ];
  }
}
