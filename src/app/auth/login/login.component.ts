import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    })

    constructor(private router: Router,
        private fb: FormBuilder,
        private loginService: LoginService) { }

    ngOnInit(): void {
    }

    login() {
        const { email, password } = this.loginForm.value;

        this.loginService.login(email, password)
            .subscribe( ok => {
                if (ok === true) {
                    this.router.navigate(['/lab/products']);
                } else {
                    Swal.fire('Error', ok, 'error');
                }
            }

            )
    }
}
