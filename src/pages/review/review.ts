import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public user:User, public api:Api, public settings:Settings) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }

  field(){
    this.user.review = this.review;
    this.navCtrl.push("FieldPage");
  }

  finish(){
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
        this.api.post("api/sessions",access).subscribe(res=>{
          console.log("hasil",res);
        },err=>{
          console.log("err",err);
        });

      });
    });
  }

}
