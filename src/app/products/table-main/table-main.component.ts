import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';


const BAG_ICON = `
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 511 511" style="enable-background:new 0 0 511 511;" xml:space="preserve">
    <path d="M445.663,469.921l-14.362-359.041C430.968,102.537,424.165,96,415.814,96H351v-0.5C351,42.841,308.159,0,255.5,0
        S160,42.841,160,95.5V96H95.187c-8.351,0-15.153,6.536-15.488,14.88L65.337,469.921c-0.434,10.842,3.468,21.122,10.985,28.946
        C83.84,506.691,93.956,511,104.806,511h301.389c10.851,0,20.966-4.309,28.484-12.133
        C442.195,491.042,446.097,480.763,445.663,469.921z M175,95.5c0-44.388,36.112-80.5,80.5-80.5S336,51.112,336,95.5V96H175V95.5z
        M423.862,488.474c-4.663,4.853-10.938,7.526-17.667,7.526H104.806c-6.73,0-13.004-2.672-17.667-7.525
        c-4.663-4.853-7.083-11.229-6.813-17.954L94.687,111.48c0.011-0.27,0.23-0.48,0.5-0.48H160v48.5c0,4.142,3.358,7.5,7.5,7.5
        s7.5-3.358,7.5-7.5V111h161v48.5c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5V111h64.814c0.269,0,0.488,0.21,0.499,0.48
        l14.362,359.041C430.944,477.245,428.524,483.621,423.862,488.474z"/>

    </svg>
`

@Component({
    selector: 'app-table-main',
    templateUrl: './table-main.component.html',
    styles: [
        `
    .btn{
        border-radius: 25px;
        background: rgb(56,153,256);
        color: white;
    }
    .header-table {
        margin: 40px 120px 0px 120px;
    }
    .back-container{
        cursor: pointer;
        margin: 0px 120px 0px 120px;
    }
  `
    ]
})
export class TableMainComponent implements OnInit {

    constructor(iconRegistry: MatIconRegistry,
                sanitizer: DomSanitizer,
                private router: Router) {

        iconRegistry.addSvgIconLiteral('bag', sanitizer.bypassSecurityTrustHtml(BAG_ICON));
    }

    ngOnInit(): void {
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/auth/login'])
    }

}
