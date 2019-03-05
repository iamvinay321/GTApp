import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CountryServiceService } from './country-service.service';
import {TranslateService} from '@ngx-translate/core';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        height: '0px',
        background:'red',
        width: '100%',
        overflow:'hidden'
        
      })),
      state('final', style({
        height: '115px',
        paddingBottom: '35px',
        background:'red',
        width: '100%',
        // overflow:'hidden',
        zIndex: 10
      })),
      transition('initial=>final', animate('500ms')),
      transition('final=>initial', animate('500ms'))
    ])]
})
export class AppComponent implements OnInit {
 

    currentState = 'initial';
    

    constructor(public translate: TranslateService) { 
      translate.addLangs(['african','albanian','english', 'french','hindi']);
      translate.setDefaultLang('english');

      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/english|french/) ? browserLang : 'english');
    }

   ngOnInit(){

   }

   changeState() {
     this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }
}
