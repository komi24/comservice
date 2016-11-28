const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './main.routes';

export class MainController {
  $http;
  $interval;

  awesomeThings = [];
  newThing = '';
  obj1 = [];
  obj2 = [];
  obj3 = [];
  obj4 = [];
  count1;
  count2;
  count3;
  count4;

  idx1;
  idx2;
  idx3;
  idx4;

  /*@ngInject*/
  constructor($http, $interval) {
    this.$http = $http;
    this.obj1[0] = {
      img: "img1-1.png", 
      comment: "Mon Rondoudou !!!", 
      display:true,
      class: "fb-comments start"
    };
    this.obj2[0] = {
      img: "img2-1.png", 
      comment: "My Goerges is the pretiest !!", 
      display:true,
      class: "fb-comments start"
    };
    this.obj3[0] = {
      img: "img3-1.png", 
      comment: "Tao fofo !!!", 
      display:true,
      class: "fb-comments start"
    };
    this.obj4[0] = {
      img: "img4-1.png", 
      comment: "Votez Balou !! ;)", 
      display:true,
      class: "fb-comments start"
    };
    //1
    this.obj1[1] = {
      img: "img1-2.jpg", 
      comment: "Mon Rondoudou !!!", 
      display:false,
      class: "fb-comments start"
    };
    this.obj2[1] = {
      img: "img2-2.jpg", 
      comment: "My Goerges is the pretiest !!", 
      display:false,
      class: "fb-comments start"
    };
    this.obj3[1] = {
      img: "img3-2.jpg", 
      comment: "Tao fofo !!!", 
      display:false,
      class: "fb-comments start"
    };
    this.obj4[1] = {
      img: "img4-2.jpg", 
      comment: "Votez Balou !! ;)", 
      display:false,
      class: "fb-comments start"
    };
    //2
    this.obj1[2] = {
      img: "img1-3.jpg", 
      comment: "Mon Rondoudou !!!", 
      display:false,
      class: "fb-comments start"
    };
    this.obj2[2] = {
      img: "img2-3.jpg", 
      comment: "My Goerges is the pretiest !!", 
      display:false,
      class: "fb-comments start"
    };
    this.obj3[2] = {
      img: "img3-3.jpg", 
      comment: "Tao fofo !!!", 
      display:false,
      class: "fb-comments start"
    };
    this.obj4[2] = {
      img: "img4-3.jpg", 
      comment: "Votez Balou !! ;)", 
      display:false,
      class: "fb-comments start"
    };

    this.count1 = 0;
    this.count2 = 0;
    this.count3 = 0;
    this.count4 = 0;
    this.idx1 = 0;
    this.idx2 = 0;
    this.idx3 = 0;
    this.idx4 = 0;

    $interval((function(){
      let r = Math.random();
      if(r<0.25){
        //1
        this.obj1[this.idx1].display = false;
        this.obj1[this.idx1].class = "fb-comments";
        if (this.idx1 < this.obj1.length -1){
          this.idx1 = this.idx1 +1;
        } else {
          this.idx1 = 0;
        }
        this.obj1[this.idx1].display = true;
        this.obj1[this.idx1].class = "fb-comments animated fadeOutUp";
      }
      else if(r<0.5){
        //2
        this.obj2[this.idx2].display = false;
        this.obj2[this.idx2].class = "fb-comments";
        if (this.idx2 < this.obj2.length -1){
          this.idx2 = this.idx2 +1;
        } else {
          this.idx2 = 0;
        }
        this.obj2[this.idx2].display = true;
        this.obj2[this.idx2].class = "fb-comments animated fadeOutUp";
      }
      else if(r<0.75){
        //3
        this.obj3[this.idx3].display = false;
        this.obj3[this.idx3].class = "fb-comments";
        if (this.idx3 < this.obj3.length -1){
          this.idx3 = this.idx3 +1;
        } else {
          this.idx3 = 0;
        }
        this.obj3[this.idx3].display = true;
        this.obj3[this.idx3].class = "fb-comments animated fadeOutUp";
      }
      else {
        //4
        this.obj4[this.idx4].display = false;
        this.obj4[this.idx4].class = "fb-comments";
        if (this.idx4 < this.obj4.length -1){
          this.idx4 = this.idx4 +1;
        } else {
          this.idx4 = 0;
        }
        this.obj4[this.idx4].display = true;
        this.obj4[this.idx4].class = "fb-comments animated fadeOutUp";
      }
    }).bind(this),5000);

    $interval((function(){
      let r = Math.random();
      if(r<0.25)
        this.count1 = this.count1 + 1;
      else if(r<0.5)
        this.count2 = this.count2 + 1;
      else if(r<0.75)
        this.count3 = this.count3 + 1;
      else
        this.count4 = this.count4 + 1;
    }).bind(this),5000);

    $interval((function(){
      let r = Math.random();
      let r2 = Math.random();

      if (r2 <0.1){
        this.class1 = "fb-reaction"
        this.class2 = "fb-reaction"
        this.class3 = "fb-reaction"
        this.class4 = "fb-reaction"
      }

      if(r<0.25)
        this.class1 = "fb-reaction animated fadeOutUp"
      else if(r<0.5)
        this.class2 = "fb-reaction animated fadeOutUp"
      else if(r<0.75)
        this.class3 = "fb-reaction animated fadeOutUp"
      else
        this.class4 = "fb-reaction animated fadeOutUp"
    }).bind(this),100);

  }

  $onInit() {
    this.$http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
    });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  createLive() {
    FB.ui({
      display: 'popup',
      method: 'live_broadcast',
      phase: 'create',
    }, function(response) {
      if (!response.id) {
        alert('dialog canceled');
        return;
      }
      alert('stream url:' + response.secure_stream_url);
      FB.ui({
        display: 'popup',
        method: 'live_broadcast',
        phase: 'publish',
        broadcast_data: response,
      }, function(response) {
      alert("video status: \n" + response.status);
      });
    });
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

export default angular.module('comserviceApp.main', [
  uiRouter])
    .config(routing)
    .component('main', {
      template: require('./main.html'),
      controller: MainController
    })
    .name;
