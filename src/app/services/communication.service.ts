import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private subjects: Map<string, Subject<void>> = new Map();

  getSubject(key: string): Subject<void> {
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new Subject<void>());
    }
     let newVar = this.subjects.get(key);

    if (newVar != undefined){
      return newVar;
    } else {
      return new Subject();
    }
  }

  trigger(key: string): void {
    const subject = this.getSubject(key);
    if (subject) {
      subject.next();
    }
  }

  on(key: string) {
    return this.getSubject(key).asObservable();
  }
}
