import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { CustomerService } from 'src/app/modules/shared/services/customer.service';
import { NewCustomerComponent } from '../new-customer/new-customer.component';

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

    let listCustomer = Array.isArray(resp) ? resp : [resp];

    listCustomer.forEach((element: CustomerElement) => {
      dataCustomer.push(element);
    });

    this.dataSource = new MatTableDataSource<CustomerElement>(dataCustomer);
    this.dataSource.paginator = this.paginator;
  }

  openCustomerDialog(){
    const dialogRef = this.dialog.open(NewCustomerComponent , {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {

    if( result == 1){
      this.openSnackBar("Cliente creado", "Exitosa");
      this.getCustomers();
    } else  if (result == 2) {
      this.openSnackBar("Se produjo un error al crear un cliente\n", "Error");
    }
  });
  }

  edit(customerId:number, documentType: string, documentNumber: string, name:string,email:string,mobileNumber:string){
    const dialogRef = this.dialog.open(NewCustomerComponent , {
      width: '450px',
      data: {customerId: customerId, documentType: documentType, documentNumber: documentNumber, name:name, email:email, mobileNumber:mobileNumber}
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

  delete(customerId: any){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      data: {customerId: customerId, module: "customer"}
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

  search( data: string, filter:string){
    if( data.length === 0){
      return this.getCustomers();
    }

    switch (filter) {
      case "ID":
        this.customerService.getCustomerById(data)
              .subscribe({
        next: (data: any) => {
          console.log('respuesta clientes: ', data);
          this.processCustomerResponse(data);
        },
        error: (error: any) => {
          console.log('error: ', error);
        }
      });
      break;
      case "NAME":
        this.customerService.getCustomersByName(data)
        .subscribe({
          next: (data: any) => {
            console.log('respuesta clientes: ', data);
            this.processCustomerResponse(data);
          },
          error: (error: any) => {
            console.log('error: ', error);
          }
        });
        break;
      case "EMAIL":
        console.log("fma");
        console.log(data);
        this.customerService.getCustomersByEmail(data)
        .subscribe({
          next: (data: any) => {
            console.log('respuesta clientes: ', data);
            this.processCustomerResponse(data);
          },
          error: (error: any) => {
            console.log('error: ', error);
          }
        });
        break;
      case "PHONE":
        this.customerService.getCustomersByMobileNumber(data)
      .subscribe({
        next: (data: any) => {
          console.log('respuesta clientes: ', data);
          this.processCustomerResponse(data);
        },
        error: (error: any) => {
          console.log('error: ', error);
        }
      });
      break;
      default:
        console.log('Tipo no reconocido');
    }
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['custom-snackbar']
    })
  }
}

export interface CustomerElement {
  customerId: number,
  documentType:string,
  documentNumber:string,
  name:string,
  email:string,
  mobileNumber:string
}
