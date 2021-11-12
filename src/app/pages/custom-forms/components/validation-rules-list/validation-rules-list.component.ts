import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-validation-rules-list',
  templateUrl: './validation-rules-list.component.html',
  styleUrls: ['./validation-rules-list.component.css'],
})
export class ValidationRulesListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() validationRules: any[];
  @Output() editValidation = new EventEmitter<any>();
  @Output() deleteValidation = new EventEmitter<any>();
  displayedColumns: string[] = ['position', 'name', 'action'];
  dataSource: any;
  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      this.formatValidationForDataTable(this.validationRules)
    );
    this.dataSource.paginator = this.paginator;
  }

  formatValidationForDataTable(validationRules): any[] {
    return validationRules.map((validationRule, index) => {
      return {
        position: index + 1,
        ...validationRule,
      };
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(validationRule): void {
    this.editValidation.emit(validationRule);
  }

  onDelete(validationRule): void {
    this.deleteValidation.emit(validationRule);
  }
}
