import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/modules/shared/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{
  private customerService = inject(CustomerService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getCustomers();
  }

  displayedColumns: string[] = ['customerId', 'documentType', 'documentNumber', 'name', 'email', 'mobileNumber','actions'];
  dataSource = new MatTableDataSource<CustomerElement>();

  @ViewChild(MatPaginator)

  paginator!: MatPaginator;

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe({
        next: (data: any) => {
          console.log('respuesta clientes: ', data);
          this.processCustomerResponse(data);
        },
        error: (error: any) => {
          console.log('error: ', error);
        }
      });
  }

  processCustomerResponse(resp: any){
    const dataCustomer: CustomerElement[] = [];

    let listCustomer = resp;

    listCustomer.forEach((element: CustomerElement) => {
      dataCustomer.push(element);
    });

    this.dataSource = new MatTableDataSource<CustomerElement>(dataCustomer);
    this.dataSource.paginator = this.paginator;
  }

  /*
  openCustomerDialog(){
    const dialogRef = this.dialog.open(NewCustomerComponent , {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {

    if( result == 1){
      this.openSnackBar("Cliente Agregado", "Exitosa");
      this.getCustomers();
    } else if (result == 2) {
      this.openSnackBar("Se produjo un error al guardar cliente", "Error");
    }
  });
  }

  edit(id:number, name: string, description: string){
    const dialogRef = this.dialog.open(NewCustomerComponent , {
      width: '450px',
      data: {id: id, name: name, description: description}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if( result == 1){
        this.openSnackBar("Cliente Actualizado", "Exitosa");
        this.getCustomers();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al actualizar cliente", "Error");
      }
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      data: {id: id, module: "customer"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if( result == 1){
        this.openSnackBar("Cliente Eliminado", "Exitosa");
        this.getCustomers();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar cliente", "Error");
      }
    });
  }

  search( term: string){
    if( term.length === 0){
      return this.getCustomers();
    }
    this.customerService.getCustomerById(term)
            .subscribe( (resp: any) => {
              this.processCustomerResponse(resp);
            })
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })

  }
  */
}

export interface CustomerElement {
  customerId: number,
  documentType:string,
  documentNumber:string,
  name:string,
  email:string,
  mobileNumber:string
  actions:string
}
