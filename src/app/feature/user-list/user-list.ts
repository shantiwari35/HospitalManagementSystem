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

@Component({
  selector: 'app-user-list',
  imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements  OnInit {
  private _httpClient = inject(HttpClient);
  private userService = inject(UserService);

  displayedColumns: string[] = ['id', 'fullName', 'email', 'phone', 'dateOfBirth', 'role','actions'];

  data = new MatTableDataSource<Users>([]);

  resultsLength = signal<number>(0);
  isLoadingResults = signal<boolean>(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //  ngOnInit() {
  //    this.loadUsers();
  //  }
  ngOnInit() {
    this.loadUsers();

  }

  loadUsers() {
    this.isLoadingResults.set(true);
    this.userService.getUsers().subscribe((users: any) => {
      console.log('Users fetched:', users.data?.data);
      this.data.data = users?.data?.data || [];
      this.isLoadingResults.set(false);
    });
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
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  role: string;
}
