import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CountryServiceService } from '../country-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];

  constructor(private formBuilder: FormBuilder, private country: CountryServiceService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.minLength(10)], Validators.pattern('/[0-9]/')],
        address1: ['', [Validators.required]],
        city: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
        country: ['', [Validators.required]],
        state: ['', [Validators.required]],

        // Card
        cardNumber: ['', [Validators.required]],
        cvv: ['', [Validators.required]],
        cardHolder: ['', [Validators.required]],
    });
    this.getCountries();
}

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    console.log(this.registerForm);
}

getCountries() {
    this.country.allCountries().
    subscribe(
      data2 => {
        this.countryInfo = data2.Countries;
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

  onChangeCountry(countryValue) {
    this.stateInfo=this.countryInfo[countryValue].States;
    this.cityInfo=this.stateInfo[0].Cities;
    console.log(this.cityInfo);
  }

  onChangeState(stateValue) {
    this.cityInfo=this.stateInfo[stateValue].Cities;
    //console.log(this.cityInfo);
  }


  
}
