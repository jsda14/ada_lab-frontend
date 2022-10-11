import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    })
    constructor(private fb: FormBuilder,
                private loginService: LoginService,
                private router: Router
        ) { }

    ngOnInit(): void {

    }

    register() {
        const isValidForm = this.registerForm.valid;
        const { name, email, password } = this.registerForm.value;
        const data = { name, email, password }

        if (isValidForm) {
            this.loginService.createUser(data)
                .subscribe( ok => {
                    if(ok){
                        Swal.fire({ icon: 'success', title: 'The user has been created successfully'})
                        this.registerForm.reset();
                    }else{
                        Swal.fire({ icon: 'error', title: 'User already exists'})
                    }
                })
        } else{
            Swal.fire({ icon: 'error', title: 'All fields are required' })
        }
    }
}
