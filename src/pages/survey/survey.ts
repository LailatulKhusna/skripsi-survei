import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { Settings,Api,User } from '../../providers';
/**
 * Generated class for the SurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html',
})
export class SurveyPage {
  field:any={};

  importances:any=[{
  	id:1,
  	value:1,
    img:"assets/img/buruk.gif"
  },{
  	id:2,
  	value:2,
    img:"assets/img/parah.gif"
  },{
  	id:3,
  	value:3,
    img:"assets/img/cukup.gif"
  },{
  	id:4,
  	value:4,
    img:"assets/img/puas.gif"
  },{
  	id:5,
  	value:5,
    img:"assets/img/oke.gif"
  }];

  performances:any=[{
    id:1,
    value:1,
    img:"assets/img/buruk.gif"
  },{
    id:2,
    value:2,
    img:"assets/img/parah.gif"
  },{
    id:3,
    value:3,
    img:"assets/img/cukup.gif"
  },{
    id:4,
    value:4,
    img:"assets/img/puas.gif"
  },{
    id:5,
    value:5,
    img:"assets/img/oke.gif"
  }];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nativeAudio: NativeAudio,
    public user:User,
    public settings:Settings,
    public api:Api) {

    this.field = navParams.get('field');
    console.log("sek",this.field);
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyPage',this.importances);
  }

  giveImportance(question_index,question_id,importance_id,value){
  	this.field.question_lists[question_index].importance = value;
  	// console.log(this.field.question_lists);
  	let imp_image = <HTMLElement>document.querySelector("#importance"+question_id+importance_id); 
  	imp_image.style.transform = "scale(1.5)";
  	this.importances.forEach((imp,i)=>{
  		this.field.question_lists.forEach((ques,q)=>{
  			if(imp.id != importance_id && ques.id == question_id){
  				let other_imp_image = <HTMLElement>document.querySelector("#importance"+ques.id+imp.id); 
  				other_imp_image.style.transform = "scale(0)";
  			}
  		});
  	});
  	console.log(this.field,imp_image);
  }

  givePerformance(question_index,question_id,performance_id,value){
    this.field.question_lists[question_index].performance = value;
    // console.log(this.field.question_lists);
    let perf_image = <HTMLElement>document.querySelector("#performance"+question_id+performance_id); 
    perf_image.style.transform = "scale(1.5)";
    this.performances.forEach((perf,i)=>{
      this.field.question_lists.forEach((ques,q)=>{
        if(perf.id != performance_id && ques.id == question_id){
          let other_perf_image = <HTMLElement>document.querySelector("#performance"+ques.id+perf.id); 
          other_perf_image.style.transform = "scale(0)";
        }
      });
    });
    console.log(this.field,perf_image);
  }

  pushPage(page){
    this.user.fields.push(this.field);
    this.navCtrl.push(page);
  }

  finish(){
    this.settings.load().then(()=>{
      this.settings.getValue('user').then(res=>{

        let access = {
          session:{
            branch_id:res.branch_id,
            name:"Survey ke "
          },
          fields:this.user.fields
        }
        console.log("we",access);
        this.api.post("api/sessions",access).subscribe(res=>{
          console.log("hasil",res);
        },err=>{
          console.log("err",err);
        });

      });
    });
  }

}
