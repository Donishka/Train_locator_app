import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Flashlight } from '@ionic-native/flashlight';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  long:Number;
  lat:Number;
  language:String = "8057/58:Ruhunu Kumari" ;
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  items: Observable<any[]>;
  
  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    private db: AngularFireDatabase,
    private flashlight: Flashlight
    ) {
      this.itemRef = db.object('position');
      this.item = this.itemRef.valueChanges();
      
    }
  ionViewDidLoad(){
          let watch = this.geolocation.watchPosition();
          watch.subscribe((data) => {
          this.lat = data.coords.latitude;
          this.long = data.coords.longitude;
          console.log("Longitute: "+this.long+"\nLatitude: "+this.lat);
          this.save(this.long,this.lat,this.language);
        });
  }
  sendData(){
    this.update(this.language);
  }

  save(long: Number, lat: Number, user: String) {
    this.itemRef.set({ UserName: user, longitude: long, latitude: lat });
  }
  update(user: String) {
    this.itemRef.update({ UserName: user });
  }

  torch(){
    if(this.flashlight.isSwitchedOn()){
      this.flashlight.switchOff();
    }else{
      this.flashlight.switchOn();
    }
  }
}
