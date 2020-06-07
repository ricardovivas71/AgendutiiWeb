import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  styleUrls: ['./confirmacion.page.scss'],
})
export class ConfirmacionPage implements OnInit {

  constructor(private modalCtrk:ModalController) { }

  ngOnInit() {
  }

  goHome()
  {
    this.modalCtrk.dismiss();
  }

}
