import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'ahass1@ahass.com',
    password: 'password'
  };

  // Our translated text strings
  private loginErrorString: string;
  public loading;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

  }

  // Attempt to login in through our User service
  doLogin() {
    this.loading.present();
    this.user.login(this.account).subscribe((resp) => {
      this.loading.dismiss();
      this.navCtrl.push(MainPage);
    }, (err) => {
      // this.navCtrl.push(MainPage);
      // Unable to log in
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

}
