import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Settings,Api,User } from '../../providers';

/**
 * Generated class for the ReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {

  review:any={
    name:""
  };
  public loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public user:User, 
    public api:Api, 
    public settings:Settings,
    public loadingCtrl: LoadingController) {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }

  field(){
    this.user.review = this.review;
    this.navCtrl.push("FieldPage");
  }

  finish(){
    this.loading.present();
    this.user.review = this.review;
    this.settings.load().then(()=>{
      this.settings.getValue('user').then(res=>{

        let access = {
          session:{
            branch_id:res.branch_id,
            name:"Survey ke"
          },
          fields:this.user.fields,
          review:this.review
        }
        console.log(access);
        this.api.post("api/sessions",access).subscribe(result=>{
          // console.log("hasil",res);
          this.loading.dismiss();
          // reset variable fields sama review di User.ts jadi null biar kosong
          // code kembali ke halaman home sambil ngasi parameter berhasil supaya di home.ts
          this.user.fields=[];
          this.review={};
          
          this.navCtrl.push('HomePage',{message:'success'});
          // bisa memunculkan popup , jadi di cek klo ada parameter berhasil tampilkan kalo tidak ada ga usah
        },err=>{
          console.log("err",err);
          this.loading.dismiss();
          // jangan di reset lalu kembali ke halaman field.ts lalu kasi parameter gagal 
          // biar bisa muncul popup gagal terjadi kesalahan
          this.navCtrl.push('HomePage',{message:'error'});
        });

      });
    });
  }

}
