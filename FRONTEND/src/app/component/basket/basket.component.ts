import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteProduct } from 'src/app/core/actions/ProductAction';
import { Product } from 'src/app/core/model/product';
import { ProductState } from 'src/app/core/state/ProductState';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  displayedColumns: string[] = ['name', 'price', 'quantity', 'total', 'action'];

  constructor(private store: Store) { }

  @Select(ProductState.getListProducts)
  numberProduct$!: Observable<Product[]>;

  @Select(ProductState.getTotalPrice)
  totalPrice$!: Observable<number>;

  @Select(ProductState.getNbProducts)
  nbProducts$!: Observable<number>;

  removeProduct(product: Product) {
    this.store.dispatch(new DeleteProduct(product));
  }
}
