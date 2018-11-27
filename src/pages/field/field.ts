import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Settings,Api } from '../../providers';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public settings:Settings, public api:Api) {

    this.api.get('api/user').subscribe(resp=>{     

      this.fields = resp.branch.field_lists;

    });

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.api.get('api/user').subscribe(resp=>{     

      this.fields = resp.branch.field_lists;

    });
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FieldPage');
  }

  survey(id){
    this.api.get('api/fieldlists/'+id).subscribe(res=>{
      console.log(res,id);
  	  this.navCtrl.push("SurveyPage",{question_lists:res.question_lists});
    });
  }

  review(){
    this.navCtrl.push("ReviewPage");
  }


  

}
