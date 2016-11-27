const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './main.routes';

export class MainController {
  $http;
  $interval;

  awesomeThings = [];
  newThing = '';
  img1;
  img2;
  img3;
  img4;
  count1;
  count2;
  count3;
  count4;

  /*@ngInject*/
  constructor($http, $interval) {
    this.$http = $http;
    this.img1 = "img1-1.png";
    this.img2 = "img2-1.png";
    this.img3 = "img3-1.png";
    this.img4 = "img4-1.png";
    this.count1 = 0;
    this.count2 = 0;
    this.count3 = 0;
    this.count4 = 0;
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
