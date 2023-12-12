export interface TimeEntryFormData {
    fromDate: Date | null,
    toDate: Date | null,
    client: string | null,
    project: string | null,
    hours: number | null,
    note: string | null,
}