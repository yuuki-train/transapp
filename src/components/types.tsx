export type Trains = {
    readonly id: string
    readonly departure: string
    readonly depHour: number
    readonly depMinute: number
    readonly destination: string
    readonly arvHour: number
    readonly arvMinute: number
    readonly trainType: string
    readonly fee: number
}