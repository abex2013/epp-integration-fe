import { Category } from "./category";
import { DeviceClassification } from "./deviceclassification";
import { SubCategory } from "./subcategory";

export interface DeviceDetail {
    Guid: string;
    IsActive: boolean;
    IsDeleted: boolean;
    CreatedDate: Date;
    CreatedbyUserGuid: string;
    CategoryGuid: string;
    SubCategoryGuid: string;
    CompanyDeviceCode: string;
    DeviceName: string;
    BusinessUnit: string;
    IsWorking: boolean;
    AllocateTo: string;
    DeviceClassificationGuid: string;
    PurchaseDate: Date;
    Purchaser: string;
    InvoiceNumber: string;
    Manufacturer: string;
    SerialNumber: string;
    Warranty: string;
    WarrantyEndDate: Date;
    Notes: string;
}
