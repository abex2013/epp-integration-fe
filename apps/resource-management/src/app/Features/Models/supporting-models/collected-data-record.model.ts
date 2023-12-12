export interface CollectedDataRecord {

    usage: number

    qty: number

    internaDataRecord?: {
        [key: string]: CollectedDataRecord
    }

}