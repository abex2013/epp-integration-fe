import { OrganizationalDetail } from "./organizational-detail.model";
import { PersonalDetail } from "./personal-detailsmodel";

export interface EmployeeDetail {
    personalDetail?: PersonalDetail
    organizationalDetail: OrganizationalDetail
}