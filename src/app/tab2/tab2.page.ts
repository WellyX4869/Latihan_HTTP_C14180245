import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})

export class Tab2Page {

  dataPOST = [];
  loading;
  post: any = {};

  constructor(
    private http: HttpClient,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
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

  public async loaderPresent(): Promise<any> {
    const loading = await this.loadCtrl.create({
      message: "LOADING ...",
      backdropDismiss: true
    });
    await loading.present();

    return loading;
  }

  delete(){
    
  }

  submit() {
    this.http.post("https://jsonplaceholder.typicode.com/posts", this.post).subscribe((res: any) => {
      console.log(res);
      this.toastCtrl.create({
        duration: 3000,
        message: "ID for new Item is " + res.id
      }).then(l => l.present())
    })
  }
}
