import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {environment} from "../../../../../environments/environment";
import {JwtService} from "../../../../services/auth/jwt.service";
import {CustomerDTO} from "../../../common/models/customer-dto";
import {HttpErrorResponse} from "@angular/common/http";
import {CustomerService} from "../../../../services/customer.service";
import {Page} from "../../../common/models/page";
import {Transaction} from "../../../common/models/transaction";

@Component({
  selector: 'app-profile-image-change',
  templateUrl: './profile-image-change.component.html',
  styleUrls: ['./profile-image-change.component.scss'],
  providers: [MessageService]
})
export class ProfileImageChangeComponent implements OnInit{
  uploadedFiles: any[] = [];
  private readonly baseUrl = `${environment.api.baseUrl}`;
  profileImage = 'assets/images/user.png';

  constructor(
    private messageService: MessageService,
    private jwtService: JwtService,
    private customerService: CustomerService,
    ) {}

  ngOnInit(): void {
    const customer: CustomerDTO = JSON.parse(<string>this.jwtService.getCustomer());
    this.loadCustomerImage(customer?.profileImage).then(url => {
      this.profileImage = url;
    });
  }

  loadCustomerImage(customerImage: string | undefined): Promise<string> {
    if (customerImage == undefined) {
      return Promise.resolve('assets/images/user.png');
    }
    return new Promise((resolve, reject) => {
      this.customerService.getCustomerImage(customerImage).subscribe({
        next: (imageBlob: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(imageBlob);
        },
        error: (error: HttpErrorResponse) => {
          resolve('assets/images/user.png');
        }
      });
    });
  }
  onUpload(event: any) {
    this.uploadedFiles = []
    this.uploadedFiles.push(event.files[0]);

    this.showInfo('info', 'Udało się przesłać zdjęcie');
  }

  uploadProfileImage($event: any) {
    let image = $event.files[0] as File;
    this.customerService.uploadProfileImage(image).subscribe({
      next: () => {
        this.showInfo('Sukces', 'udało się zmienić zdj profilowe');

      },
      error: error => {
        console.error('Error upload image', error);
        this.showError('Błąd Servera', 'Nie udało się przesłać zdjęcia');
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

  showWarn(title: string, content: string) {
    this.messageService.add({
      key: 'tr',
      severity: 'warn',
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
