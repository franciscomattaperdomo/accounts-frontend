import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  /**
   * get all customers
   */
  getCustomers(){
    const endpoint = `${base_url}/customers`;
    return this.http.get(endpoint);

  }

  /**
   * create customer
   */
  createCustomer(body: any) {
    const endpoint = `${base_url}/customers`;
    return this.http.post(endpoint, body);
  }

  /**
   * update customer
   */
  updateCustomer(body: any, customerId: any){
    const endpoint = `${base_url}/customers/${customerId}`;
    return this.http.put(endpoint, body);
  }

  /**
   * delete customer
   */
  deleteCustomer(customerId: any){
    const endpoint = `${base_url}/customers/ ${customerId}`;
    return this.http.delete(endpoint);
  }

  /**
   * get customer by id
   */
  getCustomerById(customerId: any){
    const endpoint = `${base_url}/customers/ ${customerId}`;
    return this.http.get(endpoint);
  }

  /**
   * get customer by mobile number
   */
  getCustomerByMobileNumber(mobileNumber: any){
    const endpoint = `${base_url}/customers/mobileNumber/ ${mobileNumber}`;
    return this.http.get(endpoint);
  }

  /**
   * get customer by email
   */
  getCustomerByEmail(email: any){
    const endpoint = `${base_url}/customers/email/ ${email}`;
    return this.http.get(endpoint);
  }

  /**
   * export excel customers
   */
  exportCustomers(){
    const endpoint = `${base_url}/customers/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }

}
