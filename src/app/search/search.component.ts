import {Component, Input, OnInit} from '@angular/core';
import {ServiceService} from "../service.service";
import {distinctUntilChanged, map, switchMap, takeUntil, tap, throttleTime} from "rxjs/operators";
import {INews} from "../inews";
import {interval, Observable, ReplaySubject, Subject} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  /*destroy: ReplaySubject<any> = new ReplaySubject<any>(1);*/
  news?: INews["items"];
  formGroup: FormGroup;

  constructor(private readonly httpService: ServiceService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      inputText: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.formGroup.get("inputText")?.valueChanges
      .pipe(
      throttleTime(1000),
      switchMap((val) => {
        console.log(val);
        return this.httpService.getUser(val);
      }),
      tap(item => {
        this.news = item.items;
      })
    ).subscribe()
  }

  /*addCards(writeWord: string){
      this.httpServise
        .getUser(writeWord)
        .pipe(takeUntil(this.destroy))
        .pipe(
          tap(item => {
            this.news = item.items;
          })
        ).subscribe()
    }
    ngOnDestroy(){
      this.destroy.next(null);
      this.destroy.complete();
      console.log('unsubscribe');
    }

    get f(){return this.formGroup.controls};*/
}
