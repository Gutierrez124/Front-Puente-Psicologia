import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  constructor() { }
  private isCollapsed = new BehaviorSubject<boolean>(false);
  isCollapsed$ = this.isCollapsed.asObservable();

  
  toggle(): boolean {
  const newValue = !this.isCollapsed.value;
  this.isCollapsed.next(newValue);
  return newValue; // <- para que el componente hijo pueda emitirlo
}

  get value(): boolean {
    return this.isCollapsed.value;
  }
}
