import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { Observable } from 'rxjs';
import { ValidtyAddClientForms } from '../../core';
import { ClientService } from '../../core/services/client.service';
import { AddClientStateService } from '../../core/State/add-client-state.service';

@Component({
  selector: 'exec-epp-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  position: NzTabPosition = 'left';
  validateAddClientFormState$?: Observable<ValidtyAddClientForms>;
  validateAddClientFormState?: ValidtyAddClientForms;
  addButtonClicked = false;
  contactDetailsTabEnabled = false;
  activeTabIndex = 0;
  locationTabEnabled = false;
  constructor(
    private router: Router,
    private clientService: ClientService,
    private addClientState: AddClientStateService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {}
  ngOnInit(): void {
    this.addClientState.restAddClientState();
    this.validateAddClientFormState$ =
      this.addClientState.validateAddClientFormState();

    this.addClientState
      .validateAddClientFormState()
      .subscribe((res: ValidtyAddClientForms) => {
        this.validateAddClientFormState = res;
      });
  }

  addClient() {
    this.addClientState
      .validateAddClientFormState()
      .subscribe((res: ValidtyAddClientForms) => {
        this.validateAddClientFormState = res;
      });

    this.addButtonClicked = true;
    if (
      this.validateAddClientFormState?.clientDetailsForm &&
      this.validateAddClientFormState?.clientLocationForm &&
      this.validateAddClientFormState?.clientContactsForm &&
      this.validateAddClientFormState?.clientContactsForm
    ) {
      this.router.navigateByUrl('clients');
      this.clientService.addClient();
    }
    // eslint-disable-next-line no-empty
    else {
      if (this.validateAddClientFormState?.clientDetailsForm == false) {
        this.activeTabIndex = 0;
        this.notification.error('Client details is mandatory !', '', {
          nzPlacement: 'bottomRight',
        });
      } else if (
        this.validateAddClientFormState?.clientContactsForm == false ||
        this.validateAddClientFormState?.CompanyContactsForm == false
      ) {
        this.contactDetailsTabEnabled = true;
        if (this.validateAddClientFormState?.clientContactsForm == false) {
          this.activeTabIndex = 2;
          this.notification.error('Client Contacts is mandatory !', '', {
            nzPlacement: 'bottomRight',
          });
        } else {
          this.activeTabIndex = 3;
          this.notification.error('Company Contacts is mandatory !', '', {
            nzPlacement: 'bottomRight',
          });
        }
      } else if (this.validateAddClientFormState?.clientLocationForm == false) {
        this.locationTabEnabled = true;
        if (this.contactDetailsTabEnabled) this.activeTabIndex = 5;
        else this.activeTabIndex = 3;
        this.notification.error('Client location is mandatory !', '', {
          nzPlacement: 'bottomRight',
        });
      }
    }
  }

  cancelAddClientPage() {
    this.cancelConfirm();
  }

  cancelConfirm(): void {
    if (
      this.validateAddClientFormState?.clientDetailsForm ||
      this.validateAddClientFormState?.clientLocationForm ||
      this.validateAddClientFormState?.clientContactsForm ||
      this.validateAddClientFormState?.CompanyContactsForm
    )
      this.modal.confirm({
        nzTitle: 'Are you sure, you want to cancel ?',

        nzCancelText: 'No',
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        nzOnCancel: () => {},
        nzOkText: 'Yes',
        nzOkDanger: true,

        nzOnOk: () => {
          this.router.navigateByUrl('clients');
          this.addClientState.restAddClientState();
        },
      });
    else this.router.navigateByUrl('clients');
  }
  ClientContacTab() {
    if (this.contactDetailsTabEnabled == false) {
      this.contactDetailsTabEnabled = true;
      this.activeTabIndex = 2;
    } else {
      this.contactDetailsTabEnabled = false;
      this.activeTabIndex = 0;
    }
  }

  LocationTab() {
    if (this.locationTabEnabled == false) {
      this.locationTabEnabled = true;
      if (this.contactDetailsTabEnabled) this.activeTabIndex = 5;
      else this.activeTabIndex = 3;
    } else {
     
      this.locationTabEnabled = false;
      if (this.contactDetailsTabEnabled == true) this.activeTabIndex = 3;
      else this.activeTabIndex = -3;

    }
    
  }
}
