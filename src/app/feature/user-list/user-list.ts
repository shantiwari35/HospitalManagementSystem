import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, inject, signal, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { UserService } from '../../Core/Services/user-service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { HandleNullPipe } from '../../shared/pipe/handle-null-pipe';
import { TextFormatPipe } from '../../shared/pipe/text-format-pipe';
import { MatPopupService } from '../../shared/services/mat-popup.service';
import { ColorCode } from '../../shared/directive/color-code';
import { Store } from '@ngrx/store';
import { deleteUser } from '../../Core/Store/Action/userAction.action';
@Component({
  selector: 'app-user-list',
  imports: [
    MatProgressSpinnerModule,
    ColorCode,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    HandleNullPipe,
    TextFormatPipe,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit {
  private userService = inject(UserService);
  private popupService = inject(MatPopupService);
  private store = inject(Store);
  private router = inject(Router);

  displayedColumns: string[] = [
    'id',
    'fullName',
    'email',
    'phone',
    'dateOfBirth',
    'role',
    'actions',
  ];

  data = new MatTableDataSource<Users>([]);

  resultsLength = signal<number>(0);
  isLoadingResults = signal<boolean>(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadUsers();
    // this.store.select(state => state.user).subscribe(userState => {
    //   if(userState?.response && userState?.response?.status === 200) {

    //     this.popupService.alert(`User was deleted successfully.`, 'User deleted');
    //   }else if(userState.error) {
    //     this.popupService.alert(`Unable to delete the user.`, 'Delete failed');
    //   }
    // });
  }

  loadUsers() {
    this.isLoadingResults.set(true);
    this.userService.getUsers().subscribe((users: any) => {
      this.data.data = users?.data?.data || [];
      this.isLoadingResults.set(false);
      this.resultsLength.set(users?.data?.totalElements || 0);
      this.paginator.length = users?.data?.totalElements;
      this.paginator.pageIndex = users?.data?.currentPage;
      this.paginator.pageSize = users?.data?.pageSize;
    });
  }

  onDelete(user: Users) {
    console.log('Delete button clicked for user:', user); // Debug log
    const dialogRef = this.popupService.confirm(
      `Are you sure you want to delete ${user.fullName}?`,
      'Delete user',
    );

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Dialog result:', result); // Debug log
      if (result?.action !== 'confirm') {
        return;
      }

      if (user?.id === undefined || user?.id === null) {
        return;
      }

      this.store.dispatch(deleteUser({ userId: user.id }));

      this.userService.deleteUser(user.id).subscribe((response: any) => {
        if (response?.statusCode === 500) {
          this.popupService.alert(
            response.message ?? 'Unable to delete the user.',
            'Delete failed',
          );
          return;
        }

        this.loadUsers();
        this.popupService.alert(`${user.fullName} was deleted successfully.`, 'User deleted');
      });
    });
  }

  onEdit(user: Users) {
    console.log('Edit button clicked for user:', user); 
    this.router.navigate(['/user-edit', user.id]);
    // Debug log
    // Navigate to the edit page or open a dialog for editing the user
  }
}

export interface UserApi {
  data: Users[];
  totalElements: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
}

export interface Users {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  role: string;
}
