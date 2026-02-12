import { Component, Inject, inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/modules/shared/services/customer.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit{
  public customerForm!: FormGroup;
  private fb = inject(FormBuilder);
  private customerService= inject(CustomerService);
  private dialogRef= inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  formStatus: string = "";
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    console.log(this.data);
    this.formStatus = "Creación";

    this.customerForm = this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required]
    })

    if (this.data != null ){
      this.updateForm(this.data);
      this.formStatus = "Actualización";
    }
  }

  onSave(){
    let data = {
      documentType: this.customerForm.get('documentType')?.value,
      documentNumber: this.customerForm.get('documentNumber')?.value,
      name: this.customerForm.get('name')?.value,
      email: this.customerForm.get('email')?.value,
      mobileNumber: this.customerForm.get('mobileNumber')?.value,
    }

    if (this.data != null ){
      //update registry
      this.customerService.updateCustomer(data, this.data.customerId)
        .subscribe({
        next: (response: any) => {
          console.log(response);
          this.dialogRef.close(1);
        },
        error: (error: any) => {
          this.openSnackBar("Se produjo un error al crear un cliente\n\n" + JSON.stringify(error.error) , "Error");
        }
      });
    } else {
      //create new registry
     this.customerService.createCustomer(data)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.dialogRef.close(1);
        },
        error: (error: any) => {
          this.openSnackBar("Se produjo un error al crear un cliente\n\n" + JSON.stringify(error.error) , "Error");
        }
      });
    }
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data: any){
    this.customerForm = this.fb.group( {
      documentType: [data.documentType, Validators.required],
      documentNumber: [data.documentNumber, Validators.required],
      name: [data.name, Validators.required],
      email: [data.email, Validators.required],
      mobileNumber: [data.mobileNumber, Validators.required],
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['custom-snackbar']
    })
  }
}
