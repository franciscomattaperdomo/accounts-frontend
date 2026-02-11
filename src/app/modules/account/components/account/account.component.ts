import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/modules/shared/services/account.service';
import { NewAccountComponent } from '../new-account/new-account.component';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  private accountService = inject(AccountService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getAccounts();
  }

  displayedColumns: string[] = ['accountId', 'customerId', 'accountNumber', 'accountType', 'branchName', 'accountStatus', 'customerName','actions'];
  dataSource = new MatTableDataSource<AccountElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getAccounts(){
    this.accountService.getAccounts()
      .subscribe({
        next: (data: any) => {
          console.log('respuesta clientes: ', data);
          this.processAccountResponse(data);
        },
        error: (error: any) => {
          console.log('error: ', error);
        }
      });
  }

  processAccountResponse(resp: any){
    const dataAccount: AccountElement[] = [];

    let listAccount = Array.isArray(resp) ? resp : [resp];

    listAccount.forEach((element: AccountElement) => {
      dataAccount.push(element);
    });

    this.dataSource = new MatTableDataSource<AccountElement>(dataAccount);
    this.dataSource.paginator = this.paginator;
  }

  openAccountDialog(){
    const dialogRef = this.dialog.open(NewAccountComponent , {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if( result == 1){
        this.openSnackBar("Cuenta creada", "Exitosa");
        this.getAccounts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar cuenta", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  edit(accountId:number, customerId: number, accountNumber: number, accountType: string, branchName: string, accountStatus: string){
    const dialogRef = this.dialog.open(NewAccountComponent , {
      width: '450px',
      data: {accountId: accountId, customerId: customerId, accountNumber: accountNumber, accountType: accountType, branchName: branchName, accountStatus: accountStatus}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if( result == 1){
        this.openSnackBar("cuenta modificada", "Exitosa");
        this.getAccounts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al editar cuenta", "Error");
      }
    });
  }

  delete(accountId: any){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      width: '450px',
      data: {accountId: accountId, module: "account"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if( result == 1){
        this.openSnackBar("Cuenta eliminada", "Exitosa");
        this.getAccounts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar cuenta", "Error");
      }
    });
  }

  search(data: any, filter:string){
    if ( data.length === 0){
      return this.getAccounts();
    }

    switch (filter) {
      case "ID":
        this.accountService.getAccountsByCustomerId(data)
        .subscribe({
          next: (data: any) => {
            console.log('respuesta clientes: ', data);
            this.processAccountResponse(data);
          },
          error: (error: any) => {
            console.log('error: ', error);
          }
        });
      break;
      case "NAME":
        this.accountService.getAccountsByBranchName(data)
        .subscribe({
          next: (data: any) => {
            console.log('respuesta clientes: ', data);
            this.processAccountResponse(data);
          },
          error: (error: any) => {
            console.log('error: ', error);
          }
        });
        break;
      case "TYPE":
        console.log("fma");
        console.log(data);
        this.accountService.getAccountsByAccountType(data)
        .subscribe({
          next: (data: any) => {
            console.log('respuesta clientes: ', data);
            this.processAccountResponse(data);
          },
          error: (error: any) => {
            console.log('error: ', error);
          }
        });
        break;
      case "STATUS":
        this.accountService.getAccountsByAccountStatus(data)
        .subscribe({
          next: (data: any) => {
            console.log('respuesta clientes: ', data);
            this.processAccountResponse(data);
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

  exportExcel(){
    this.accountService.exportAccount()
        .subscribe( (data: any) => {
          let file = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
          let fileUrl = URL.createObjectURL(file);
          var anchor = document.createElement("a");
          anchor.download = "accounts.xlsx";
          anchor.href = fileUrl;
          anchor.click();

          this.openSnackBar("Archivo exportado correctamente", "Exitosa");
        }, (error: any) =>{
          this.openSnackBar("No se pudo exportar el archivo", "Error");
        })
  }
}

export interface AccountElement {
  accountId: number;
  customerId: number;
  accountNumber: number;
  accountType: string;
  branchName: string;
  accountStatus: string;
  customerName:string
}
