import { Component, Injectable} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'colorForm',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

@Injectable()
export class FormComponent {

  colorForm : FormGroup;

  constructor(builder: FormBuilder, private http:Http, private router:Router){
    this.colorForm = builder.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'favoriteColor' : [null, Validators.required]
    });
  }

  submitForm(value){
    let serviceHandle = 'https://bunkerdev.azure-api.net/codetest/api/people/add';
    let body = JSON.stringify(value);
    let optionHeaders = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({'headers': optionHeaders});

    this.http.post(serviceHandle,body,options).map((res:Response) => {
      return [{status: res.status, json: res.json()}]
    }).catch((error: any) => {
      return Observable.throw(new Error(error.status))
    }).subscribe(res=>{
      alert("Your data was submitted.");
      this.router.navigate(['/Home']);
    }, error => {
      alert("Something went wrong when processing your data.");
      console.error(error);
    });    
  }
}
//this.router.navigate(['/Home']);