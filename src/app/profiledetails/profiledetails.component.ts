import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AmazonService } from '../services/amazon.service';
import { AuthService } from '../services/auth.service';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { InfoModalComponent } from '../modals/info-modal/info-modal.component';
import { User } from '../models/user';
import { AdSearch } from '../models/adsearch';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.css']
})
export class ProfiledetailsComponent implements OnInit {
  public user: User;
  private isEditing: boolean = false;
  public detailsForm: FormGroup;
  public selectedPicture: File;
  public savedSearches: AdSearch[] = [];

  @ViewChild('canvas')
  private canvas: HTMLCanvasElement;
  @ViewChild('selectedPic')
  private selectedPic: HTMLImageElement;
  
  constructor(
    private route: ActivatedRoute,
    private service: AuthService,
    private modalService: NgbModal,
    private router: Router,
    private formBuilder: FormBuilder,
    private aws: AmazonService
  ) {
    this.detailsForm = this.formBuilder.group({
      userFullName: new FormControl('', []),
      userEmail: new FormControl('', [
        Validators.email
      ]),
      userPassword: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      userTel: new FormControl('', [
        Validators.minLength(11),
        Validators.maxLength(11)
      ]),
      userPic: new FormControl()
    })
  }

  public openInfoModal(title: string, text: string) {
    const modalRef = this.modalService.open(InfoModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      scrollable: true,
      backdrop: "static",
      keyboard: false 
    });

    modalRef.componentInstance.modal_title = title;
    modalRef.componentInstance.modal_text = text;

    modalRef.result.then((data) => {
      console.log(`InfoModalComponent has been closed with: ${data}`);
    });
  }

  public isSelectedPicture() {
    return this.selectedPicture;
  }

  public onSelectFile(event) {
    if (event.target.files) {
      this.selectedPicture = event.target.files[0];
    }
  }

  public async save(formValues: FormGroup) {
    if (!formValues.valid) {
      console.log('Form is invalid');
      return;
    }

    let user_id: number = +localStorage.getItem('user_id'),
        name = this.detailsForm.value.userFullName,
        email = this.detailsForm.value.userEmail,
        password = this.detailsForm.value.userPassword,
        tel = this.detailsForm.value.userTel,
        picture;

    if (this.selectedPicture != null) {
      picture = this.aws.uploadFile(this.selectedPicture, user_id, false);
    } else {
      picture = "";
    }

    if (name == "" && email == "" && password == "" && tel == "" && this.selectedPicture == null) {
      this.openInfoModal('Error', 'There are no changes!');
    } else {
      this.service.save(user_id, name, email, password, tel, await picture)
      .subscribe(
        (response) => {
          this.setIsEditing();
          this.detailsForm.reset();

          this.openInfoModal('Info', 'User successfully updated!');
          this.selectedPicture = null;

          window.location.reload();
        },
        (err_response: HttpErrorResponse) => {
          this.openInfoModal('Error', err_response.error.message);
        }
      )
    }
  }

  public cancel() {
    this.setIsEditing();
    this.detailsForm.reset();
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  openDeleteModal() {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      scrollable: true,
      size: "lg",
      backdrop: "static",
      keyboard: false 
    });

    modalRef.componentInstance.bound = "profile";
    modalRef.componentInstance.param = localStorage.getItem('user_id');

    modalRef.result.then((data) => {
      console.log(`DeleteModalComponent has been closed with: ${data}`);
      if (data == 'yes') {
        this.service.logoutUser();
        this.router.navigate(['/login']);
      }
    });
  }

  loadProfile() {
    const userId = +this.route.snapshot.paramMap.get('id');
    this.service.getById(userId).subscribe(
      (response: User) => { 
        this.user = response;
        if (!this.user.picture) {
          this.user.picture = "assets/default-user.jpg";
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
        this.router.navigate(['/not-found']);
      }
    );

    this.service.getAllSavedSearch(userId).toPromise().then(
      (response: AdSearch[]) => {
        this.savedSearches = response;
      },
      (error: HttpErrorResponse) => {
        this.openInfoModal('Error', error.error.message);
      }
    );
  }

  deleteSearch(id: number) {
    this.service.removeSavedSearch(this.user.id, id).toPromise().then(
      (response) => {
        this.savedSearches.splice(this.savedSearches.findIndex(s => s.id === id), 1);
      },
      (error: HttpErrorResponse) => {
        this.openInfoModal('Error', error.error.message);
      }
    )
  }

  public setIsEditing() : void {
    this.isEditing = !this.isEditing;
  }

  public getIsEditing() : boolean {
    return this.isEditing;
  }
}
