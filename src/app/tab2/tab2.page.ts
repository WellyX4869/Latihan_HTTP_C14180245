import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})

export class Tab2Page {

  dataPOST = [];
  loading;
  post: any = {};
  editor: any = {};

  constructor(
    private http: HttpClient,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ionViewDidEnter() {
    this.getDataPost();
  }

  async getDataPost() {
    this.loading = await this.loaderPresent();

    this.http.get("https://reqres.in/api/users?page=2").subscribe((res: any) => {
      console.log(res);

      this.dataPOST = res.data;
      if (this.loading) {
        this.loading.dismiss();
      }
    })
  }
  
  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      message: 'Do you want to delete this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked');
          }
        }
      ]
    });
    alert.present();
  }

  public async loaderPresent(): Promise<any> {
    const loading = await this.loadCtrl.create({
      message: "LOADING ...",
      backdropDismiss: true
    });
    await loading.present();

    return loading;
  }
  
  async insert() {
    this.loading = await this.loaderPresent();

    this.http.post("https://reqres.in/api/users?page=2", this.post).subscribe((res: any) => {
      console.log(res);
      this.toastCtrl.create({
        duration: 3000,
        message: "Add new user with ID " + res.id
      }).then(l => l.present())
      this.dataPOST = res.data;
      if (this.loading) {
        this.loading.dismiss();
      }
    })
  }

  async edit(){
    this.loading = await this.loaderPresent();

    this.http.put("https://reqres.in/api/users?page=2", this.editor).subscribe((res: any) => {
      console.log(res);
      this.toastCtrl.create({
        duration: 3000,
        message: "Edit new user with ID " + res.id
      }).then(l => l.present())
      if (this.loading) {
        this.loading.dismiss();
      }
    })
  }

  async delete(){
    this.presentConfirm();

    this.http.delete("https://reqres.in/api/users?page=2").subscribe((res: any) => {
      console.log(res);
      this.toastCtrl.create({
        duration: 3000,
        message: "Delete user with ID " + res.id
      }).then(l => l.present())
      if (this.loading) {
        this.loading.dismiss();
      }
    })
  }
}
