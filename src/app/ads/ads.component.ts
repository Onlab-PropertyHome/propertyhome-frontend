import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertisementService } from '../advertisement.service';
import { AmazonService } from '../amazon.service';
import { AuthService } from '../auth.service';
import { Ad } from '../models/ad';
import { User } from '../models/user';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  public ads: Ad[] = [];
  public url: string = "";
  private closeResult: string = '';
  public createAdForm: FormGroup;
  public fileChoosen: boolean = false;
  public fileToUpload: File = null;

  constructor(private service: AuthService, private adService: AdvertisementService, private modalService: NgbModal, private formBuilder: FormBuilder,private aws: AmazonService) {
    this.createAdForm = this.formBuilder.group({
      inputSize: new FormControl(),
      inputRoom: new FormControl(),
      inputPrice: new FormControl(),
      formFile: new FormControl(),
      inputDetails: new FormControl(),
      selectType: new FormControl(''),
      selectState: new FormControl('')
      
    });
  }

  public open(content, ad?: Ad) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, scrollable: true, size: "lg", backdrop: "static", keyboard: false }).result
    .then((result) => {
      if (result == 'add') {
        this.fileChoosen = false;
        this.add();
        this.createAdForm.reset();
      }

      if (result == 'yes') {
        this.delete(ad);
      }
      
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if (reason == 'Cross click') {
      this.fileChoosen = false;
      this.createAdForm.reset();
      return `with: ${reason}`;
    } else {
      return `with: ${reason}`;
    }
  }

  public onSelectFile(event) {
    if (event.target.files) {
      this.fileChoosen = true;
      this.fileToUpload = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      }
    }
  }

  ngOnInit(): void {
    this.refreshAds();
  }

  private refreshAds() {
    let id: number = +localStorage.getItem('user_id');
    this.service.getById(id)
    .subscribe(
      (user: User) => {
        this.ads = user.ads;
      },
      (err_response) => {
        alert(err_response.error.message);
      }
    )
  }

  public add() {
    
    let user_id: number = +localStorage.getItem('user_id'),
        size: number = this.createAdForm.value.inputSize,
        room: number = this.createAdForm.value.inputRoom,
        price = this.createAdForm.value.inputPrice,
        picture = this.aws.uploadFile(this.fileToUpload),
        type: string = this.createAdForm.value.selectType,
        state: string = this.createAdForm.value.selectState,
        details: string = this.createAdForm.value.inputDetails;

       
    
    this.adService.add(user_id, size, room, price, type, state, details, picture).subscribe(
      (result: Ad) => {
        this.refreshAds();
      },
      (err_response) => {
        alert(err_response.error.message);
      }
    );
  }

  public edit(ad: Ad) {
    // TODO
  }

  public delete(ad: Ad) {
    let ad_id = ad.ad_id;
    
    this.adService.delete(ad_id)
    .subscribe(
      (response) => {
        this.ads = this.ads.filter(ad => ad.ad_id !== ad_id);
      },
      (err_response) => {
        alert(err_response.error.message);
      }
    )
  }

}
