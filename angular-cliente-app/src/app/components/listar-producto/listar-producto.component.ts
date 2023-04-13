import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css'],
})
export class ListarProductoComponent implements OnInit {
  listProductos: Producto[] = [];
  constructor(
    private _productoService: ProductoService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.obtenerproductos();
  }
  obtenerproductos() {
    this._productoService.getProductos().subscribe({
      next: (data) => {
        console.log(data);
        this.listProductos = data;
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProducto(id).subscribe({
      next: (data) => {
        this.toastr.error(
          'El producto due eliminado con exito',
          'Producto  Eliminado'
        );
        this.obtenerproductos();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
