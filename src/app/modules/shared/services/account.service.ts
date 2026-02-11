import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  /**
   * get all the accounts
   */
  getAccounts(){
    const endpoint = `${ base_url}/accounts/all`;
    return this.http.get(endpoint);
  }

  /**
   * create account
   */
  createAccount(body: any){
    const endpoint = `${ base_url}/accounts`;
    return this.http.post(endpoint, body);
  }

  /**
   * update account
   */
  updateAccount (body: any, accountId: any){
    const endpoint = `${ base_url}/accounts/${accountId}`;
    return this.http.put(endpoint, body);
  }

  /**
   * delete account
   */
  deleteAccount(accountId: any){
    const endpoint = `${ base_url}/accounts/${accountId}`;
    return this.http.delete(endpoint);
  }

  /**
   * search by client id
   */
  getAccountsByCustomerId(customerId: any){
    const endpoint = `${ base_url}/accounts/customerId/${customerId}`;
    return this.http.get(endpoint);
  }

/**
   * search by Branch Name
   */
  getAccountsByBranchName(branchName: any){
    const endpoint = `${ base_url}/accounts/branchName/${branchName}`;
    return this.http.get(endpoint);
  }

/**
   * search by Account Type
   */
  getAccountsByAccountType(accountType: any){
    const endpoint = `${ base_url}/accounts/accountType/${accountType}`;
    return this.http.get(endpoint);
  }

/**
   * search by Account Status
   */
  getAccountsByAccountStatus(accountStatus: any){
    const endpoint = `${ base_url}/accounts/accountStatus/${accountStatus}`;
    return this.http.get(endpoint);
  }


  /**
   * export excel products
   */
  exportAccount(){
    const endpoint = `${base_url}/accounts/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }

}
