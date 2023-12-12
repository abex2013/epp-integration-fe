import { LUSkillSet } from "./skill-sets.model";

export interface areaOfInterestModel {
    Guid: string;
    PositionToApplyID: string;
    ProficiencyLevelID: string;
    YearsOfExpierence: number;
    MonthOfExpierence: number;
    SelectedIDArray: LUSkillSet[];
    SelectedIDSecondArray: LUSkillSet[];
    SelectedIDOtherArray: LUSkillSet[];
    ApplicantId: string;
}