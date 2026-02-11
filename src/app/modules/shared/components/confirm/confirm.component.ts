import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../../services/customer.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  private customerService= inject(CustomerService);
  private accountService= inject(AccountService);
  private dialogRef= inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  onNoClick(){
    this.dialogRef.close(3)
  }

  delete(){
    if (this.data != null){
      if (this.data.module == "customer") {
     this.customerService.deleteCustomer(this.data.customerId)
      .subscribe({
        next: (data: any) => {
          this.dialogRef.close(1);
        },
        error: (error: any) => {
          this.dialogRef.close(2);
        }
      });
      } else if ( this.data.module == "account" )  {
            this.accountService.deleteAccount(this.data.accountId).
              subscribe( (data:any) =>{
                this.dialogRef.close(1);
              }, (error: any) => {
                this.dialogRef.close(2);
              })
      }
    } else {
      this.dialogRef.close(2);
    }
  }
}
