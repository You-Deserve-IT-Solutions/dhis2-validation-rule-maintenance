import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { SaveValidationModalComponent } from '../save-validation-modal/save-validation-modal.component';
import { MetadataDescriptionService } from 'src/app/core/services/metadata-description.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-format-custom-form',
  templateUrl: './format-custom-form.component.html',
  styleUrls: ['./format-custom-form.component.css'],
})
export class FormatCustomFormComponent implements OnInit {
  @Input() dataSets: any;

  searchString: string = '';
  _htmlMarkup: SafeHtml;
  dataSetCtrl: FormControl = new FormControl('');
  dataset: any;
  importanceOptions = [
    {
      id: 'high',
      name: 'High',
    },
    {
      id: 'medium',
      name: 'Medium',
    },
    {
      id: 'low',
      name: 'Low',
    },
  ];

  operators = [
    {
      id: '==',
      name: 'Equal to',
    },
    {
      id: '!=',
      name: 'Not Equal to',
    },
  ];
  name: string;
  shortName: string;
  description: string;
  instruction: string;
  importance: string;
  leftSideDescription: string;
  leftSideExpression: string;
  operator: string;
  rightSideDescription: string;
  rightSideExpression: string;
  shouldSkipValidation: boolean;
  isRightSideSet: boolean = false;
  isLeftSideSet: boolean = false;
  currentExpression: string = '';
  metadataIds: string[] = [];
  uids: string[] = [];
  expressionDescriptionRight$: Observable<any>;
  expressionDescriptionLeft$: Observable<any>;
  curretOperatorId: string;
  constructor(
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private metadataExpressionDescriptionService: MetadataDescriptionService
  ) {}

  ngOnInit(): void {}

  onSelectionChange(item): void {
    // let expression = '<input disabled="disabled" id="aI75w49azlp" indicatorformula="(#{o0KObJuu9Yu.o9Oj5Cjekej}+#{o0KObJuu9Yu.ZU3sKDB9i2o})/(1)" name="indicatorFormula" readonly="readonly" style="width:3.5em;text-align:center/" />';
    let ids = [];
    let self = this;
    try {
      this._htmlMarkup = this.sanitizer.bypassSecurityTrustHtml(
        item?.dataEntryForm?.htmlCode
      );

      document.addEventListener(
        'click',
        function (event: any) {
          if (event.target.name == 'entryfield') {
            document.getElementById(event.target.id).style.backgroundColor =
              '#36e1f2';
            self.metadataIds = [
              ...self.metadataIds,
              '#{' +
                event.target.id.split('-').join('.').replace('.val', '') +
                '}',
            ];

            if (self.isLeftSideSet) {
              self.leftSideExpression = self.metadataIds.join('');
              self.expressionDescriptionLeft$ =
                self.metadataExpressionDescriptionService.getMetadataExpressionDescription(
                  self.metadataIds.join('')
                );
            } else {
              self.rightSideExpression = self.metadataIds.join('');
              self.expressionDescriptionRight$ =
                self.metadataExpressionDescriptionService.getMetadataExpressionDescription(
                  self.metadataIds.join('')
                );
            }
          } else {
          }
          event.preventDefault();
        },
        false
      );
    } catch (e) {
      console.log('ng on init ' + JSON.stringify(e));
    }
  }

  getSignValue(event: Event, operator) {
    event.stopPropagation();
    this.metadataIds = [...this.metadataIds, operator];
    this.curretOperatorId = operator;
  }

  setActiveExpressionArea(event: Event, expressionPart): void {
    event.stopPropagation();
    if (expressionPart === 'LEFT') {
      this.isRightSideSet = false;
      this.isLeftSideSet = true;
      this.metadataIds = [];
    } else {
      this.isRightSideSet = true;
      this.isLeftSideSet = false;
      this.metadataIds = [];
    }
  }

  onSaveValidationRule(event: Event): void {
    event.stopPropagation();

    this.dialog.open(SaveValidationModalComponent, {
      width: '40%',
      data: {
        name: this.name,
      },
    });
  }
}
