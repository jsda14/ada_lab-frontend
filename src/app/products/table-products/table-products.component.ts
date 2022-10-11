import { Component, OnInit } from '@angular/core';
import { Products, Price, Orders, InfoCard } from '../interfaces/products.interface';
import { ProductsService } from '../products.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
    selector: 'app-table-products',
    templateUrl: './table-products.component.html',
    styleUrls: ['./table-products.component.scss']

})
export class TableProductsComponent implements OnInit {

    infoTitles: string[] = [];
    infoTimes = [[''], ['']];
    infoFilters = [[''], ['']];
    infoInputs = [[''], ['']];

    timesPyscis: string[] = [];
    filterPyscis: string[] = [];
    inputPyscis: string[] = [];

    timesMachine: string[] = [];
    filterMachine: string[] = [];
    inputMachine: string[] = [];

    order!: number;

    orders: Orders = {
        pysics: [],
        machine: [],
    };

    price: number[] = [0, 0];
    aiModelingParams: any[] = [];
    developmentTimeParams: any[] = [];
    filterParams: any[] = [];
    inputQueryParams: any[] = [];
    orderParams: any[] = [];
    orderItemsTransform: any[] = [];
    itemIterable: any[] = [];

    totalList: any[] = [];

    mostrarPrueba: boolean = false;

    aiModel: FormControl = this.fb.control('', Validators.required);
    data: Products[] = [];
    tableForm: FormGroup = this.fb.group({
        devTime: ['', [Validators.required]],
        filters: ['', Validators.required],
        inputQuery: ['', Validators.required]
    })


    icons: string[] = ['https://cdn-icons-png.flaticon.com/512/167/167735.png',
        'https://cdn-icons-png.flaticon.com/512/56/56988.png'];


    constructor(private productsService: ProductsService,
        private fb: FormBuilder) { }

    ngOnInit(): void {
        this.productsService.getParams()
            .subscribe((resp: any) => {
                this.data = resp;
                for (let i in this.data) {
                    this.aiModelingParams = this.data[i].ai_modeling;
                    this.developmentTimeParams = this.data[i].development_time;
                    this.filterParams = this.data[i].filter;
                    this.inputQueryParams = this.data[i].input_query;
                    this.orderParams.push({ "input_query": this.data[i].input_query });
                }

                for (let i in this.data) {
                    let data_item = this.data[i]
                    this.orderItemsTransform.push({ "ai_modeling": data_item.ai_modeling[0] })
                    this.orderItemsTransform.push({ "ai_modeling": data_item.ai_modeling[1] })
                    break
                    console.log(data_item)
                }

                for (let i in this.orderItemsTransform) {
                    let item = this.orderItemsTransform[i]
                    let new_item = {
                        "ai_modeling": item.ai_modeling.value,
                        "development_time": this.data[0].development_time,
                        "filter": this.data[0].filter,
                        "input_query": this.data[0].input_query
                    }

                    this.itemIterable.push(new_item)
                }

            })

    }

    backgroundCard(value: number) {
        if (value % 2) {
            return 'table-row primer-card'
        } else {
            return 'table-row segundo-card'
        }
    }

    getValues() { }

    getProducts(event: any, id: any, order: any, value: any, type: any) {

        let isChecked = event.target.checked;
        let product;
        let productCard;
        product = Number(event.target.id);

        if (isChecked) {
            let developmentTimeSelected: any[] = [];
            let filterSelected: any[] = [];
            let inputQuerySelected: any[] = [];

            if (type === "developmentTime") {
                developmentTimeSelected.push(value)
            } else if (type === "inputQuery") {
                inputQuerySelected = [value]
            } else if (type === "filter") {
                filterSelected.push(value)
            }
            this.totalList.push(
                {
                    "order": order,
                    "product_selected": product,
                    "development_time": developmentTimeSelected,
                    "input_query": inputQuerySelected,
                    "filter": filterSelected
                }
            )


            console.log(this.totalList)
        }

        if (isChecked && order === 1) {
            productCard = event.target.value;
            this.orders.pysics.push(product);
            this.productsService.getPrices(order, this.orders.pysics)
                .subscribe((resp: any) => {
                    this.price[0] = resp[0].price
                })
        } else if (!isChecked && order === 1) {

            this.orders.pysics = this.orders.pysics.filter((product) => product !== id);
            this.productsService.getPrices(order, this.orders.pysics)
                .subscribe((resp: any) => {
                    this.price[0] = resp[0].price
                })
        }
        if (isChecked && order === 2) {
            product = Number(event.target.id);
            this.orders.machine.push(product);
            this.productsService.getPrices(order, this.orders.machine)
                .subscribe((resp: any) => {
                    this.price[1] = resp[0].price
                })
        } else if (!isChecked && order === 2) {

            this.orders.machine = this.orders.machine.filter((product) => product !== id);
            this.productsService.getPrices(order, this.orders.machine)
                .subscribe((resp: any) => {
                    this.price[1] = resp[0].price
                })
        }

        this.getInfoCard(isChecked, event, value, order);
    }

    getInfoCard(isChecked: any, event: any, value: any, order: any) {

        // console.log("isChecked", isChecked)
        // console.log("event", event)
        // console.log("value", value)
        // console.log("order", order)

        // console.log(this.aiModelingParams);
        // console.log(this.developmentTimeParams);
        // console.log(this.filterParams);
        // console.log(this.inputQueryParams);
        // console.log("this.orderParams");
        // console.log(this.orderParams);


        if (isChecked && order === 1) {
            let title = this.aiModelingParams[order - 1].value;
            !this.infoTitles.includes(title) ? this.infoTitles.splice(0, 1, title) : ""

            for (let i in this.developmentTimeParams) {
                if (this.developmentTimeParams[i].value.includes(value)) {
                    this.timesPyscis.push(value);
                    this.infoTimes[0] = this.timesPyscis;
                }
            }

            for (let i in this.filterParams) {
                if (this.filterParams[i].value.includes(value)) {
                    this.filterPyscis.push(value)
                    this.infoFilters[0] = this.filterPyscis;
                }
            }

            for (let i in this.inputQueryParams) {
                if (this.inputQueryParams[i].value.includes(value)) {
                    this.inputPyscis.push(value);
                    this.infoInputs[0] = this.inputPyscis;
                }
            }

        }
        // else if(!isChecked && order === 1){

        //     for (let i in this.developmentTimeParams) {
        //         if (this.developmentTimeParams[i].value.includes(value)) {
        //             this.timesPyscis.push(value);
        //             this.infoTimes[0] = this.timesPyscis;

        //         }
        //     }

        //     for (let i in this.filterParams) {
        //         if (this.filterParams[i].value.includes(value)) {
        //             this.filterPyscis.push(value)
        //             this.infoFilters[0] = this.filterPyscis;
        //         }
        //     }

        //     for (let i in this.inputQueryParams) {
        //         if (this.inputQueryParams[i].value.includes(value)) {
        //             this.inputPyscis.push(value);
        //             this.infoInputs[0] = this.inputPyscis;
        //         }
        //     }

        // }

        if (isChecked && order === 2) {
            let title = this.aiModelingParams[order - 1].value;
            !this.infoTitles.includes(title) ? this.infoTitles.splice(1, 2, title) : ""
            console.log(this.infoTitles.length);
            for (let i in this.developmentTimeParams) {
                if (this.developmentTimeParams[i].value.includes(value)) {

                    this.timesMachine.push(value);
                    this.infoTimes[1] = this.timesMachine;
                    console.log(this.infoTimes);
                }
            }

            for (let i in this.filterParams) {
                if (this.filterParams[i].value.includes(value)) {
                    this.filterMachine.push(value);
                    this.infoFilters[1] = this.filterMachine;
                }
            }

            for (let i in this.inputQueryParams) {
                if (this.inputQueryParams[i].value.includes(value)) {
                    this.inputMachine.push(value);
                    this.infoInputs[1] = this.inputMachine;
                }
            }
        }

    }

    sendOrder( order: any, products: any ){

        let data =  {
            order,
            products
        }
        console.log(data);


    }
}
