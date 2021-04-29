import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 changePasswordSubmitted: any;
 resetForm: FormGroup;
 submitted = false;
 

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
      this.resetForm = this.formBuilder.group({
        oldPassword: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,15}$/)]],
        confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,15}$/)]]
      }, { validator: [this.passwordMatch('password', 'confirmPassword'), this.checkPassword('password')] });
    }

    passwordMatch(passwordKey: string, confirmPassword: string) {
      return (group: FormGroup) => {
        let passwordInput = group.controls[passwordKey], confirmPasswordInput = group.controls[confirmPassword];
        if (passwordInput.value !== confirmPasswordInput.value) {
          return confirmPasswordInput.setErrors({ notEquivalent: true })
        }
      }
    }
  
    checkPassword(passwordKey) {
      return (group: FormGroup) => {
        let password = group.controls[passwordKey];
        if (!password.value.match(/.{8,}/)) {
          password.setErrors({ minChar: true });
        } else if (password.value.length > 15) {
          password.setErrors({ maxChar: true });
        } else if (!password.value.match(/(?=.*[A-Z])/)) {
          password.setErrors({ upperCaseError: true })
        } else if (!password.value.match(/(?=.*[a-z])/)) {
          password.setErrors({ lowerCaseError: true })
        } else if (!password.value.match(/(?=.*[0-9])/)) {
          password.setErrors({ numberError: true })
        }else if (!password.value.match(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,15}$/)) {
          password.setErrors({ specialChar: true });
        }
      }
    }

      submitChangePassword() {
        this.submitted = true
        // console.log('call method')
        this.changePasswordSubmitted = true;
    
    
      
        }
      }
