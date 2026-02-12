import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/modules/shared/services/account.service';
import { CustomerService } from 'src/app/modules/shared/services/customer.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

export interface Customer{
  customerId: number,
  documentType:string,
  documentNumber:string,
  name:string,
  email:string,
  mobileNumber:string
}

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit{
  private fb = inject(FormBuilder);
  private customerService= inject(CustomerService);
  private dialogRef= inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  private snackBar = inject(MatSnackBar);

  private accountService = inject(AccountService);

  public accountForm!: FormGroup;

  formStatus: string = "";
  customers: Customer[]=[];

  ngOnInit(): void {

    this.getCustomers();

    this.formStatus = "Creación";
    this.accountForm = this.fb.group( {
      customerId: ['', Validators.required],
      accountType: ['', Validators.required],
      branchName: ['', Validators.required],
      accountStatus: ['', Validators.required]
    })

    if (this.data != null ){
      this.updateForm(this.data);
      this.formStatus = "Actualización";
    }
  }

  onSave(){
    let data = {
      customerId: this.accountForm.get('customerId')?.value,
      accountType: this.accountForm.get('accountType')?.value,
      branchName: this.accountForm.get('branchName')?.value,
      accountStatus: this.accountForm.get('accountStatus')?.value,
    }

    if (this.data != null){
      //update account
      this.accountService.updateAccount(data, this.data.accountId)
        .subscribe({
        next: (response: any) => {
          console.log(response);
          this.dialogRef.close(1);
        },
        error: (error: any) => {
          this.openSnackBar("Se produjo un error al crear un cliente\n\n" + JSON.stringify(error.error) , "Error");
          //this.dialogRef.close(2);
        }
      });
    } else {
      //save account
      this.accountService.createAccount(data)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            this.dialogRef.close(1);
          },
          error: (error: any) => {
            this.openSnackBar("Se produjo un error al crear un cliente\n\n" + JSON.stringify(error.error) , "Error");
            //this.dialogRef.close(2);
          }
        });
    }

  }

  onCancel(){
    this.dialogRef.close(3);
  }

  getCustomers(){
    this.customerService.getCustomers()
      .subscribe({
        next: (data: any) => {
          console.log(this.data);
          this.customers = data;
        },
        error: (error: any) => {
          console.log("error al consultar clientes");
        }
      });
  }


  updateForm(data: any){
    this.accountForm = this.fb.group( {
      customerId: [data.customerId, Validators.required],
      accountType: [data.accountType, Validators.required],
      branchName: [data.branchName, Validators.required],
      accountStatus: [data.accountStatus, Validators.required]
    })
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['custom-snackbar']
    })
  }

}
