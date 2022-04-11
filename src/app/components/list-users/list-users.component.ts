import { AfterViewInit , Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PersonModel } from 'src/app/models/person.model';
import { WtwServiceService } from 'src/app/services/wtw-service.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements AfterViewInit {

  ELEMENT_DATA: PersonModel[];
  displayedColumns: string[] = ['FirstName', 'LastName', 'DocumentType', 'DocumentNumber','Email'];
  dataSource: MatTableDataSource<PersonModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private wtwservice: WtwServiceService
  ) { }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
    this.paginator._intl.nextPageLabel = 'Siguiente página';
    this.paginator._intl.firstPageLabel = 'Primer página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.previousPageLabel = 'Página reciente';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 a ${length }`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
    this.getData();
  }
  
  async getData(){
    let resp = await this.wtwservice.getAllPersons().toPromise();
    this.ELEMENT_DATA = resp.data;
    console.log(this.ELEMENT_DATA);
    this.dataSource = new MatTableDataSource<PersonModel>(this.ELEMENT_DATA)
    this.dataSource.paginator = this.paginator;
  }

}

