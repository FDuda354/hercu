import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menage-person',
  templateUrl: './menage-person.component.html',
  styleUrls: ['./menage-person.component.scss']
})
export class MenagePersonComponent implements OnInit{
  email!: string;
  withEndDate: boolean = false;
  amount: number = 0;
  date: Date = new Date();

  minDate!: Date;

  pl!: any;
  invalidDates!: Array<Date>

  ngOnInit() {
    this.pl = {
      firstDayOfWeek: 1,
      dayNames: ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"],
      dayNamesShort: ["pon", "wt", "śr", "czw", "pt", "sob", "niedz"],
      dayNamesMin: ["P", "W", "S", "C", "P", "S", "N"],
      monthNames: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
      monthNamesShort: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"],
      today: 'Dzisiaj',
      clear: 'Wyczyść'
    }
    let today = new Date();
    let minDate = new Date();
    minDate.setDate(today.getDate() + 1);
    this.minDate = minDate;
    let invalidDate = new Date();
    this.invalidDates = [today,invalidDate];
  }
}
