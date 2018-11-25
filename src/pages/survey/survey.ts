import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  questions:any=[{
  	id:1,
  	field_list:{
  		id:1,
  		name:"Bidang Kebersihan"
  	},
  	name:"Apakah Layanannya Bersih"
  },{
  	id:2,
  	field_list:{
  		id:1,
  		name:"Bidang Kebersihan"
  	},
  	name:"Apakah Layanannya Bersih"
  }];

  importances:any=[{
  	id:1,
  	value:1,
  },{
  	id:2,
  	value:2
  },{
  	id:3,
  	value:3
  },{
  	id:4,
  	value:4
  },{
  	id:5,
  	value:5
  }];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyPage',this.importances);
  }

  giveImportance(question_index,question_id,importance_id,value){
  	this.questions[question_index].importance = value;
  	// console.log(this.questions);
  	let imp_image = <HTMLElement>document.querySelector("#importance"+question_id+importance_id); 
  	imp_image.style.transform = "scale(1.5)";
  	this.importances.forEach((imp,i)=>{
  		this.questions.forEach((ques,q)=>{
  			if(imp.id != importance_id && ques.id == question_id){
  				let other_imp_image = <HTMLElement>document.querySelector("#importance"+ques.id+imp.id); 
  				other_imp_image.style.transform = "scale(0)";
  			}
  		});
  	});
  	console.log(this.questions,imp_image);
  }

}
