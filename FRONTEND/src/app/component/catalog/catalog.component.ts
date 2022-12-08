import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { catchError, debounceTime, distinctUntilChanged, fromEvent, map, Observable, of, switchMap } from 'rxjs';
import { AddProduct } from 'src/app/core/actions/ProductAction';
import { Product } from 'src/app/core/model/product';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class DisplayCatalogComponent implements OnInit {
  products: Product[];

  model: Observable<any>;
  searchField$: Observable<string>;
  @ViewChild('input', { static: true }) input: ElementRef;


  constructor(private dataService: DataService, private store: Store) {
  }

  ngOnInit(): void {
    this.dataService.getCatalogues().subscribe((data) => {
      this.products = data;
    });
  }

  getCatalogueObject() {
    this.searchField$ = fromEvent(this.input.nativeElement, 'keyup');
    this.model = this.searchField$.pipe(
      map((event: any) => event.target.value),
      debounceTime(1000),
      distinctUntilChanged(),

      switchMap((query: string) => this.dataService.getCatalogueFromTerm(query).pipe(
        catchError(() => {
          return of([]);
        })
      ))
    );
    this.model.subscribe((data) => {
      this.products = data;
    });
  }

  addToShoppingList(product: Product) {
    this.store.dispatch(new AddProduct(product));
  }

}
