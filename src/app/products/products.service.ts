import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Price } from './interfaces/products.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }

    getParams(): Observable<any> {
        const url = environment.baseUrl;
        return this.http.get(`${url}/products/getParams`)
    }

    getPrices(order: number, products: number[]) {
        let data = {
            order,
            products
        }
        const url = environment.baseUrl;
        return this.http.post(`${url}/products/getPrices`, data)
    }

    sendOrder( data: any) {
        console.log(data);
        
    }
}
