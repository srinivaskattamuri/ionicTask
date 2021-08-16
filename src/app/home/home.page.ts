import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  today: string;
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder,
    protected commonSvc: CommonService,
    private translate: TranslateService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.today = new Date().toISOString();
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.createForm();
  }

  createForm() {
    this.registrationForm = this.fb.group({
      nameFld: new FormControl('', Validators.required),
      dobFld: new FormControl('', Validators.required),
      genderFld: new FormControl('male'),
      phoneNbrFld: new FormControl('', [Validators.required,Validators.pattern("[0-9 ]{10}")]),
      emailFld: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      passwordFld: new FormControl('', [Validators.required,Validators.minLength(6)])
    })
  }

  segmentChanged(event: any) {
    this.translate.use(event.target.value)
  }

  // getErrorMessage(controlName: string,error) {
  //   switch (controlName) {

  //   case 'nameFld':{
  //    return this.translate.get('HOME.FORM_FIELDS.GENDER')
  //   }

  //   }
  // }

  onRegFormSubmit() {
    if (this.registrationForm.valid) {
      const reqData = {
        name: this.registrationForm.value.nameFld,
        dob: this.registrationForm.value.dobFld,
        gender: this.registrationForm.value.genderFld,
        phoneNumber: this.registrationForm.value.phoneNbrFld,
        email: this.registrationForm.value.emailFld,
        password: this.registrationForm.value.passwordFld
      }
      this.commonSvc.createUser(reqData).subscribe((res: any) => {
        console.log(res);
        if (res) {
          this.presentToast(res.status);
        }
      },
        (error) => {
          this.presentToast(`Error While Creating a User .. Try after Some Time ...`)
        })
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message ,
      duration: 2000
    });
    toast.present();
  }
}
