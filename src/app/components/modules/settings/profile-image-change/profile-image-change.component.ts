import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {JwtService} from "../../../../services/auth/jwt.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CustomerService} from "../../../../services/customer.service";
import {CommunicationService} from "../../../../services/communication.service";
import { CustomerDTO } from '../../../common/models/customer-dto';

@Component({
  selector: 'app-profile-image-change',
  templateUrl: './profile-image-change.component.html',
  styleUrls: ['./profile-image-change.component.scss'],
  providers: [MessageService]
})
export class ProfileImageChangeComponent implements OnInit {
  profileImage = 'assets/images/user.png';
  cantUploading: boolean = false;

  constructor(
    private messageService: MessageService,
    private communicationService: CommunicationService,
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {
  }

  ngOnInit(): void {
    this.loadCustomerImage().then(url => {
      this.profileImage = url;
    });
  }

  loadCustomerImage(): Promise<string> {
    let user: CustomerDTO = JSON.parse(<string>this.jwtService.getCustomer());


    return new Promise((resolve) => {
      this.customerService.getCustomerImage().subscribe({
        next: (imageBlob: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(imageBlob);
        },
        error: (error: HttpErrorResponse) => {
          resolve('assets/images/user.png');
          console.error('Error upload image', error);
          if(user.profileImage != null){
            this.showError('Błąd Servera', 'Nie udało się pobrać zdjęcia');

          }
        }
      });
    });
  }

  uploadProfileImage($event: any) {
    this.cantUploading = true;
    let image = $event.files[0] as File;
    console.log(image)
    this.customerService.uploadProfileImage(image).subscribe({
      next: () => {
        this.loadCustomerImage().then(url => {
          this.profileImage = url;
          this.communicationService.trigger('reloadProfileImage');
          this.showInfo('Sukces', 'udało się zmienić zdj profilowe');
          this.cantUploading = false;
        });

      },
      error: error => {
        console.error('Error upload image', error);
        this.showError('Błąd Servera', 'Nie udało się przesłać zdjęcia');
        this.cantUploading = false;

      }
    });
  }

  showInfo(title: string, content: string) {
    this.messageService.add({
      key: 'tr',
      severity: 'info',
      summary: title,
      detail: content,
      life: 5000
    });
  }

  showError(title: string, content: string) {
    this.messageService.add({
      key: 'tr',
      severity: 'error',
      summary: title,
      detail: content,
      life: 10000

    });
  }

}
