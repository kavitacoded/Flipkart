import { Component, OnInit } from '@angular/core';
import { productContract } from '../productContract';

@Component({
  selector: 'app-flipkart-template',
  templateUrl: './flipkart-template.component.html',
  styleUrls: ['./flipkart-template.component.css']
})
export class FlipkartTemplateComponent implements OnInit {
  public categories:string[]=[];
  public products:productContract[]=[];
  public cartItems:productContract[]=[];
  public cartItemcounts:number=0;
  public isCartVisible:boolean=false;
  constructor() { }

  ngOnInit(): void {
    this.LoadCategories();
    this.LoadProducts('https://fakestoreapi.com/products');
    this.GetCartsCount();
  }
  public LoadCategories():void{
    fetch('https://fakestoreapi.com/products/categories')
    .then(response => response.json())
    .then(data => {
      data.unshift('all')
      this.categories=data;
    })
  }
  public LoadProducts(url:string):void{
    fetch(url)
    .then(response => response.json())
    .then(data => {
    this.products=data;
    })
  }
  public categoriesChanged(categoryName:string){
    if(categoryName=='all'){
    this.LoadProducts('https://fakestoreapi.com/products');
    }else{
      this.LoadProducts('https://fakestoreapi.com/products/category/'+ categoryName);
    }
  }
  public addToCart(id:number){
      fetch('https://fakestoreapi.com/products/'+id)
      .then(response => response.json())
      .then(data => {
        this.cartItems.push(data);
        this.GetCartsCount();
        alert(`${data.title} \n Added to cart`)
      })
  }
 public GetCartsCount():void{
  this.cartItemcounts=this.cartItems.length;
 }
 public ToggleCart(){
  this.isCartVisible=(this.isCartVisible==false) ?true:false;
 }
 public RemoveClick(index:number){
  var flag=confirm("Are you sure you want to delete ?");
  if(flag ==true){
    this.cartItems.splice(index,1);
    this.GetCartsCount(); 
  }
 }

}
