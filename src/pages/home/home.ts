import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Settings, Api } from '../../providers';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  message:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public settings: Settings,
    public api:Api,
    public alertCtrl: AlertController) {

    this.message = this.navParams.get('message');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    if(this.message=='success'){
      console.log('yey');
      this.showAlert('Sukses','Terimakasih sudah kuisioner');
      setTimeout(()=>{
        location.reload();
      },2000);

    }else if(this.message=='error'){
      console.log('gagal');
      this.showAlert('Eror','Terjadi kesalahan');
    }

  }

  // survey(){
  // 	this.navCtrl.push("SurveyPage");
  // }

  field(){

    this.navCtrl.push("FieldPage");
  
  }

  showAlert(title,message) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
