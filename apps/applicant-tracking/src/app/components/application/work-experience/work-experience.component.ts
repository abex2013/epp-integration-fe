import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EducationProgramModel } from '../../../models/education/education-programme.model';
import { EducationModel } from '../../../models/education/education.model';
import { FieldOfStudyModel } from '../../../models/education/field-of-study.model';
import { ResponseDTO } from '../../../models/ResponseDTO';
import { EducationProgrammeService } from '../../../services/applicant/education-programme.service';
import { EducationService } from '../../../services/applicant/education.service';
import { FieldOfStudyService } from '../../../services/applicant/field-of-study.service';
import {
  NotificationType,
  NotifierService,
} from '../../../shared/services/notifier.service';
@Component({
  selector: 'exec-epp-workexpirence',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
  providers: [DatePipe],
})
export class WorkExperienceComponent implements OnInit {
  info = '';
  loggedInUser: any;
  isModalVisible = false;
  isUpdateMode = false;
  isRecordUpdated = false;
  educations: [EducationModel] | [] = [];
  educationModel: EducationModel | null = null;
  loading = false;
  is_studying = false;
  disableFieldOfStudy = false;
  disableEnd = true;
  // databinding
  showConfirm = false;
  guid: any;
  fetchedEducationProgramme: [EducationProgramModel] | [] = [];
  fetchedFieldOfStudies: [FieldOfStudyModel] | [] = [];
  constructor(
    private eduProgService: EducationProgrammeService,
    private fieldOfStudyService: FieldOfStudyService,
    private educationService: EducationService,
    private notifier: NotifierService,
    private modal: NzModalService,
    public datepipe: DatePipe
  ) {}

  education = new FormGroup({
    institution: new FormControl('', [Validators.required]),
    yearFrom: new FormControl(null, [Validators.required]),
    yearTo: new FormControl(null, [Validators.required]),
    country: new FormControl(''),
    program: new FormControl('', [Validators.required]),
    fieldOfStudy: new FormControl('', [Validators.required]),
    isStudying: new FormControl(false, []),
    otherFieldOfStudy: new FormControl(null),
  });

  public validation = new FormGroup({
    isMultitpleEntry: new FormControl(false, [Validators.required]),
  });
  closeModal() {
    this.isModalVisible = false;
  }
  openModal() {
    this.disableEnd = true;
    this.education.controls.yearTo.disable();
    this.isModalVisible = true;
  }
  onSaveRecord(): void {
    this.loading = true;
  }
  onAddNewRecord()
  {
    this.isUpdateMode = false;
    this.education.reset();
    this.validation.controls.isMultitpleEntry.setValue(false);
    this.openModal();
  }
  onEditRecord(guid: string | null) {
    this.isUpdateMode = true;
    this.education.reset();
    this.openModal();
    const id: string = guid == null ? '' : guid;
    this.guid = id;
    this.educationService.getById(id).subscribe(
      (res: ResponseDTO<[EducationModel]>) => {
        const row = res.Data[0];
        this.education.patchValue({
          institution: row.Institution,
          yearFrom: new Date(row.DateFrom),
          yearTo: new Date(row.DateTo),
          country: row.Country,
          program: row.EducationProgramme?.Guid,
          fieldOfStudy: row.FieldOfStudy?.Guid,
          isStudying: row.IsCompleted,
          otherFieldOfStudy: row.OtherFieldOfStudy,
        });
      },
      (err) => this.onShowError(err)
    );
  }
  onDeleteRecord(guid: string | null) {
    this.showConfirmation(guid);
  }
  deleteItem(guid: string | null) {
    const id = guid ? guid : '';
    this.educationService.delete(id).subscribe((_) => {
      this.notifier.notify(
        NotificationType.success,
        'Education Record deleted successfully'
      );
      this.bindRecord();
      this.hasDataEntry(this.educations.length > 0 ? true:false);
    });
  }
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.education.controls.yearTo.value) {
      this.education.controls.yearTo.enable();
      return startValue.getTime() >= Date.now() - 3600 * 1000 * 24;
    }
    return (
      startValue.getTime() >=
      this.education.controls.yearTo.value.getTime() - 3600 * 1000 * 24 
    );
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.education.controls.yearFrom.value) { 
      return false;
    }
    return (
      endValue.getTime() <
      this.education.controls.yearFrom.value.getTime()
    );
  };

  onCountryChange(value: any) {
    this.education.controls.country.setValue(value);
  }
  async onFormSubmit() {
    this.loading = true;
    const educationModel = this.getFormValue();
    this.education.controls.yearTo.disable();
    if (!this.isUpdateMode) await this.addItem(educationModel)
    else await this.updateItem(educationModel);
  }
  addItem(educationModel: EducationModel) {
    this.educationService.add(educationModel).subscribe(
      (_) => {
        this.onSaveCompleted();
        this.education.controls.yearTo.disable();
        this.bindRecord();
        this.hasDataEntry(this.educations.length > 0 ? true:false);
      },
      (err) => this.onShowError(err)
    );
  }
  updateItem(educationModel: EducationModel) {
    this.educationService.update(educationModel).subscribe(
      (_) => {
        this.onSaveCompleted();
        this.bindRecord();
      },
      (err) => this.onShowError(err)
    );
  }
  getFormValue(): EducationModel {
    const educationModel = {
      Guid: this.guid ? this.guid : null,
      ApplicantId: this.loggedInUser.Guid,
      Institution: this.education.get('institution')?.value,
      DateFrom: new Date(this.education.get('yearFrom')?.value),
      DateTo: new Date(this.education.get('yearTo')?.value),
      Country: this.education.get('country')?.value,
      EducationProgrammeId: this.education.get('program')?.value,
      EducationProgramme: null,
      FieldOfStudyId: this.education.get('fieldOfStudy')?.value,
      FieldOfStudy: null,
      OtherFieldOfStudy: this.education.get('otherFieldOfStudy')?.value,
      IsCompleted:
        this.education.get('isStudying')?.value ??
        new Date(this.education.get('yearTo')?.value) > new Date(),
    };
    return educationModel;
  }

  onSaveCompleted() {
    if (!this.validation.controls.isMultitpleEntry.value) {
      this.closeModal();
      this.isRecordUpdated = true;
    }
    this.loading = false;
    const msg = this.isUpdateMode
      ? 'Education is updated successfully .'
      : 'Education added successfully .';
    this.notifier.notify(NotificationType.success, msg);
    this.education.reset();
    this.guid = null;
    if (!this.validation.controls.isMultitpleEntry.value) this.closeModal();
    this.isUpdateMode = false;
  }

  getFieldOfStudyWithId(Id: string) {
    return (
      this.fetchedFieldOfStudies.find((x) => x.Guid == Id)?.Name ?? 'Unknown'
    );
  }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUserInfo') ?? ''
    );
    
    this.bindRecord();this.education.controls.yearTo.enable();
    this.education.controls.isStudying.valueChanges.subscribe((value) => {
      if (value) {
        this.education.controls.yearTo.setValidators([]);
        this.education.controls.yearTo.reset();
      } else
        this.education.controls.yearTo.setValidators([Validators.required]);
      this.education.controls.yearTo.updateValueAndValidity();
    });
    this.education.controls.yearFrom.valueChanges.subscribe((value) => {
      if (value === null) {
        this.education.controls.yearTo.disable();
      }
    });

    this.education.controls.program.valueChanges.subscribe((value) => {
      if (
        this.fetchedEducationProgramme.find((obj) => obj.Guid === value)
          ?.Name === 'High School'
      ) {
        this.education.controls.fieldOfStudy.setValidators([]);
        this.education.controls.fieldOfStudy.setValue('');
        this.education.controls.fieldOfStudy.updateValueAndValidity();
        this.disableFieldOfStudy = true;
      } else {
        this.education.controls.fieldOfStudy.setValidators([Validators.required]);
        this.education.controls.fieldOfStudy.updateValueAndValidity();
        this.disableFieldOfStudy = false;
      }
    });

    

    //api-integration
    this.eduProgService.get().subscribe(
      (res) => {
        this.fetchedEducationProgramme = res;
      },
      (err) => this.onShowError(err)
    );
    this.fieldOfStudyService.get().subscribe(
      (res: ResponseDTO<[FieldOfStudyModel]>) => {
        this.fetchedFieldOfStudies = res.Data;
      },
      (err) => this.onShowError(err)
    );
  }
  bindRecord() {
    this.loading = true;
    this.educationService.getByApplicantId(this.loggedInUser.Guid).subscribe(
      (res: ResponseDTO<[EducationModel]>) => {
        this.educations = res.Data;
        this.hasDataEntry((this.educations.length > 0) ? true : false);
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.onShowError(err);
      }
    );
  }
  showConfirmation(guid: string | null): void {
    this.modal.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Are you sure you want to delete this entry?',
      nzOnOk: () => {
        this.deleteItem(guid);
      },
    });
  }
  onShowError(err: any) {
    let errMsg = 'Some error occured. Please review your input and try again. ';
    errMsg = err ? errMsg + `<br/><br/><hr/>${err}` : errMsg;

    this.notifier.notify(NotificationType.error, errMsg);
    this.loading = false;
  }

  hasDataEntry(value: boolean) {
    this.educationService.hasData(value);
  }
}
