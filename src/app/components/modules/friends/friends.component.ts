import { Component, HostListener, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomerDTO } from '../../common/models/customer-dto';
import { Page } from '../../common/models/page';
import { FriendsService } from '../../../services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
  providers: [MessageService]
})
export class FriendsComponent implements OnInit {
  isLoading: boolean = true;
  loadError: boolean = false;
  display: boolean = false;
  isMobileVisible = false;
  friends: CustomerDTO[] = [];
  totalRecords: number = 0;
  rows: number = 10;
  currentPage = 0;

  constructor(
    private messageService: MessageService,
    private friendsService: FriendsService,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileVisible = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    this.isMobileVisible = window.innerWidth <= 768;
    this.loadFriends(0, this.rows);
  }

  friendAdded($event: void) {
    this.isLoading = true;
    this.display = false;
    this.loadFriends(0, 10);
    this.showSuccess('Sukces', 'Udało się dodać Znajomego!');
  }

  onPageChange(event: any) {
    this.isLoading = true;
    this.currentPage = event.page;
    this.loadFriends(event.page, event.rows);
  }

  private loadFriends(page: number, size: number) {
    this.friendsService.getFriendsForCustomer(page, size).subscribe({
      next: (page: Page<CustomerDTO>) => {
        this.friends = page.content;
        this.totalRecords = page.totalElements;
        this.rows = page.size;
        this.isLoading = false;
      },
      error: error => {
        console.error('Error loading customers', error);
        this.showError('Błąd Servera', 'Nie udało się pobrać danych')
        this.loadError = true;
        this.isLoading = false;
      }
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

  showSuccess(title: string, content: string) {
    this.messageService.add({
      key: 'bc',
      severity: 'success',
      summary: title,
      detail: content,
      life: 5000
    });
  }


  friendRemoved($event: any) {
    this.loadFriends(0, 10);
    this.showSuccess('Sukces', 'Udało się usunąć Znajomego!');
  }
}
