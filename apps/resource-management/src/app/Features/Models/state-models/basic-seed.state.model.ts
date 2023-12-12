
export interface BasicSeedState<TModel> {

    data: TModel[]

    selected?: number

}


// export abstract class BasicSeedState<TModel> {
    
//     private _data: TModel[] = []

//     constructor() {}

//     addSingleData(entry: TModel): boolean {
//         const exiting = this.findIndex(entry)
//         if(exiting.length > 0) {
//             return false
//         } else {
//             this._data.push(entry)
//             return true
//         }
//     }

//     addMultipleData(entries: TModel[]): boolean {
//         const results = entries.map((entry: TModel) => this.addSingleData(entry))
//         return results.indexOf(false) === -1? false: true
//     }

//     // removeSingleData(entry: TModel): boolean {
//     //     const exiting = this.findIndex(entry)
//     //     if(exiting.length !== 1) {
//     //         return false
//     //     } else {
//     //         this._data = [
//     //             ...this._data.slice(0, exiting[0]),
//     //             ...this._data.slice(exiting[0] + 1)
//     //         ]
//     //         return true
//     //     }
//     // }

//     findMultiple(identifier: any): TModel[] {
//         const results:  TModel[] = []
//         const indices =  this.findIndex(identifier)
//         for (let i = 0; i < indices.length; i++) {
//             results.push(this._data[indices[i]])
//         }
//         return results
//     }

//     findIndex(identifier: any): number[] {
//         const indices: number[] = []
//         for (let i = 0; i < this._data.length; i++) {
//             if(this._data[i] === identifier) {
//                 indices.push(i)
//             }
//         }
//         return indices
//     }

// }