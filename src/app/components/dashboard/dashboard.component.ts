import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { category } from 'src/app/models/Icategory';
import { Iorder } from 'src/app/models/Iorder';
import { Iproduct } from 'src/app/models/Iproduct';
import { CategoryService } from 'src/app/services/category.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  linechart: any;
  piechart: any;
  productsCount: number;
  usersCount: number;
  totalRev: number = 0;
  orderDelivered: Iorder[];
  orderList: Iorder[];
  catList: category[];
  productList: Iproduct[];
  chartData: any[];
  label: string[];
  labelValues: any[];
  constructor(
    private productsService: ProductsService,
    private catService: CategoryService,
    private userService: UsersService,
    private orderService: OrderService,
  ) {

    this.productsCount = 0;
    this.usersCount = 0;
    this.orderDelivered = [];
    this.productList = []
    this.catList = [];
    this.chartData = [];
    this.label = [];
    this.labelValues = [];
    this.orderList= []

  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(order => {
      this.orderList =order ;
    })
    this.productsService.getProductsCount().subscribe(count => {
      this.productsCount = count.productCount;
    })
    this.userService.getUsersCount().subscribe(count => {
      this.usersCount = count.userCount

    })
    this.calcReveue();
    // data of the first section ///////////////////////////////////////////////////////////////////////////////

    this.catService.getAllCategories().subscribe(categories => {
      this.catList = categories
    })

    this.productsService.getProducts().subscribe(products => {
      this.productList = products
      this.productList=this.productList.reverse()
      this.getChartData()

      this.chartData.map(data => {
        this.label.push(Object.keys(data)[0])
        this.labelValues.push(Object.values(data)[0])
      })

      console.log(this.label)
      console.log(this.labelValues)
      this.loadLineChart()
    })

  }



  calcReveue() {
    this.orderService.getOrders().subscribe(data => {
      this.orderDelivered = data.filter(order => {
        return order.status == "2"
      })
      // console.log(this.orderList)

      this.orderDelivered.map(order => {
        this.totalRev += order.totalPrice;
      })

    })

  }

  getChartData() {
    this.catList.map(cat => {
      var count = 0
      var obj: any;
      this.productList.map(prod => {
        if (cat._id == prod.category?._id) {
          obj = {};
          count++;
          obj[cat.name] = count
        }
      })
      if (obj) {

        this.chartData.push(obj);
      }
    })

  }



  ngAfterViewInit(): void {


    this.linechart = document.getElementById("lineChart")
    this.piechart = document.getElementById("pieChart")
    Chart.register(...registerables);
  }
  loadLineChart() {
    new Chart(this.linechart, {
      type: "bar",
      data: {
        datasets: [{
          data: this.labelValues,
          label: "highest category",
          backgroundColor: ["#34b5a5", "#45def4", "#858f47", "#858589", "#8c4f58", "#85e4a7"],
          // borderColor: "#f4523a",
          // tension: 0.1
        }],
        labels: this.label
      },
      options: {
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'categories analysis'
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            grid: {
              borderDash: [1, 0.5],
              // borderColor:"#124a26",
              display: false,
            },
            beginAtZero: true,
          },
          x: {
            grid: {
              // borderDash:[1],
              // borderWidth:1,
              display: false

            }
          }
        },

      }

    });

  }

}
