import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = "Formulaire";

  input_identifiant:string = "";
  input_mdp:string = "";

  public formLogin : FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private userService: UserService) {
    this.formLogin = this.formBuilder.group({
      identifiant: [''],
      mdp: ['']
    });
  }

  public onSubmit() {
    // console.log('Your order has been submitted', this.formLogin.value);
    console.log("SUBMIT !!!")
  }

  public valider(){
    console.log("valider");
    let identifiant = this.formLogin.value["identifiant"]
    let mdp = this.formLogin.value["mdp"]
    this.userService.login(identifiant, mdp);
  }
  
  public reset(){

    console.log("reset");

    let input_id = document.getElementById('input_identifiant');
    let input_mdp = document.getElementById('input_mdp');

    // console.log("ID :", input_id)
    // console.log("MDP :", input_mdp)

    this.input_identifiant = "";
    this.input_mdp = "";

  }

  public ajout(){
    console.log("ajout");
    let identifiant = this.formLogin.value["identifiant"]
    let mdp = this.formLogin.value["mdp"]
    this.userService.ajout(identifiant, mdp);
  }
}
