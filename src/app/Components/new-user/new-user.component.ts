import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/user-service.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  userForm: FormGroup;
  SuccessMessageFlag:boolean=false;
  FailureMessageFlag:boolean=false;
  
  constructor(private userService:UserServiceService,private formBuilder: FormBuilder,private route:ActivatedRoute) { }

  ngOnInit() {

      
    this.createForm()
  }
  createForm(){
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  addUser(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email')
    const token=urlParams.get('token')
  //  console.log(this.userForm.value)
 
    this.userService.addUserDetails(this.userForm.value,email,token).then((res:any)=>{
      this.SuccessMessageFlag=true;
      window.location.href="/login"
    }).catch((e)=>{
      this.FailureMessageFlag=true;
    })
   }

}
