import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {
  private id$ = new BehaviorSubject<any>({});
  selectedId$ = this.id$.asObservable();
  constructor() {}

  setId(id: any) {
    this.id$.next(id);
  }
}
