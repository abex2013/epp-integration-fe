import { EducationProgramModel } from "./education-programme.model";
import { FieldOfStudyModel } from "./field-of-study.model";

export interface EducationModel {
      Guid : string | null,
      ApplicantId : string
      EducationProgramme: EducationProgramModel | null,
      EducationProgrammeId: string,
      Institution: string, 
      Country: string,
      FieldOfStudy:  FieldOfStudyModel | null,
      FieldOfStudyId:  string 
      DateFrom: Date, 
      DateTo: Date, 
      IsCompleted: boolean 
      OtherFieldOfStudy: string
}