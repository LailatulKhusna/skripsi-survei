import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Settings,Api,User } from '../../providers';

/**
 * Generated class for the FieldPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-field',
  templateUrl: 'field.html',
})
export class FieldPage {

  fields:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public settings:Settings, 
    public api:Api,
    public user:User) {

    this.api.get('api/user').subscribe((resp:any)=>{     

      this.fields = resp.branch.field_lists;

    });

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.api.get('api/user').subscribe((resp:any)=>{     

      this.fields = resp.branch.field_lists;

    });
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FieldPage',this.user.fields);
  }

  survey(id){
    this.api.get('api/fieldlists/'+id).subscribe((res:any)=>{
      console.log(res,id);
  	  this.navCtrl.push("SurveyPage",{field:res});
    });
  }

  review(){
    this.navCtrl.push("ReviewPage");
  }
  

}
