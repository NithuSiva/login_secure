import { Injectable, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// import * as CryptoJS from '../../node_modules/crypto-js/crypto-js';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  CryptoJS = require("../../node_modules/crypto-js/crypto-js");
  SHA256 = require("../../node_modules/crypto-js/sha256");
  data:any = [];
  url_json_data = "http://localhost:3000/users"


  constructor(private http: HttpClient) { }
  
  login(id:string, mdp:string){
    let message = ""
    this.http.get(this.url_json_data).subscribe((response) => {
      this.data = response;
      if(Object.keys(response).length >= 1){

        this.data.forEach((user: any) => {

        
          console.log("ENCRYPT :", user);
          let bytes  = this.CryptoJS.AES.decrypt(user.user, 'quatre4');
          let decryptedData = JSON.parse(bytes.toString(this.CryptoJS.enc.Utf8));
          console.log("DECRYPT :", decryptedData);
  
          message = "Erreur. Recommencé";
          
          if(id == decryptedData.id && mdp == decryptedData.mdp) {
  
            message = "Vous êtes connecté";
            return;
  
          }
  
        });
        alert(message);

      } else {
        alert("Erreur.")
      }
      
    });
    
  }

  ajout(id:string, mdp:string) {

    let mdpStrongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let mdpMediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if(mdpStrongRegex.test(mdp)) {
    } else if(mdpMediumRegex.test(mdp)) {
    } else {
      alert("Veuillez choisir un mots de passe plut fort");
      return
  }

    let isInJSON = false;

    this.http.get(this.url_json_data).subscribe((response) => {
      this.data = response;
      this.data.forEach((user: any) => {
        

        let bytes  = this.CryptoJS.AES.decrypt(user.user, 'quatre4');
        let decryptedData = JSON.parse(bytes.toString(this.CryptoJS.enc.Utf8));


        console.log("id: ", id, " == ", decryptedData.id, " : ", id == decryptedData.id)
        if(id == decryptedData.id) {
          
          isInJSON = true;
          return; 

        }
        
      });

      console.log("isInJson : ", isInJSON);
      if(!(isInJSON)){
        let user = { 'id': id, 'mdp': mdp};


        let dataEncrypt = { 'user': this.CryptoJS.AES.encrypt(JSON.stringify(user), 'quatre4').toString()};
    
    
        this.http.post(this.url_json_data, dataEncrypt).subscribe(
          data => {
            alert("Ajout réussi.");
          },
          error => {
            alert("Erreur dans l'ajout.")
            console.log("Erreur dans l'ajout.", error)
          }
        )

      } else {
        alert("Erreur dans l'ajout.")
      }

    });

    

  }
}
