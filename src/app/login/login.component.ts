import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit {
  message: string = "vous etes deconnecte.(pikachu/pikachu)";
  name: string;
  password: string;
  auth:AuthService;

  constructor(
    private authService: AuthService,
    private router: Router,
    private guard: AuthGuard
  ) {}
  ngOnInit() {
    this.auth=this.authService;
  }
  setMessage() {
    if (this.auth.isLoggedIn) {
      this.message = "vous ete sconnectes";
    } else {
      this.message = "Identification ou mot de passe incorrect.";
    }
  }
  login() {
    this.message = "connexion en cours ....";
    this.auth
      .login(this.name, this.password)
      .subscribe((isLoggedIn: Boolean) => {
        this.setMessage();
        if (isLoggedIn) {
          this.router.navigate(["/pokemons"]);
        } else {
          this.password = "";
          this.router.navigate(["/login"]);
        }
      });
  }

  logout(){
    this.auth.logout();
    this.message = 'vous avez bien etes bien deconnectes';
  }
}