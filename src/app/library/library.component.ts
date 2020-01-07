import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';  
import { ILibrary } from './library';

@Component({ 
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  originalUsersetting : any = {
    id : null,
    name : null,
    author : null,
  };
  userSettings : any = {...this.originalUsersetting};
  constructor(private dataService : DataService,private httpService: HttpClient) { }
  books : ILibrary[] = [];
  
  ngOnInit() {
    this.httpService.get('http://localhost:50106/api/Books').subscribe(  
      data => {  
       //this.books = data as string [];
       for(let key in data){
         let value = data[key]
         this.books.push({"bookID" : value[1],"bookName" : key,"bookAuthor" : value[0]})
       }
       console.log("INIT") 
       console.log(this.books) 
      }  
    );  
  }
  
  onSubmit(form : NgForm){
    this.books=[]
    // this.dataService.postUsersetting(this.userSettings).subscribe(
    //   result =>console.log('success' ,result),
    //   error => console.log('error' , error)
    // );
    this.httpService.post<number>('http://localhost:50106/Books/POSTADD/',this.userSettings).subscribe(
      result =>console.log('success' ,result),
      error => console.log('error' , error)  
    );

    
    this.httpService.get('http://localhost:50106/api/Books').subscribe(  
      data => {  
       //this.books = data as string [];
       for(let key in data){
         let value = data[key]
         this.books.push({"bookID" : value[1],"bookName" : key,"bookAuthor" : value[0]})
       }
       this.books.push({"bookID" : this.userSettings.id,"bookName" : this.userSettings.name,"bookAuthor" : this.userSettings.author})
       console.log("Submit") 
       console.log(this.books) 
      }  
    );  
  }

  
}

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

