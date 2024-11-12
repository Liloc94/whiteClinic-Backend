export declare class EngineerResponseDTO {
    readonly id: number;
    readonly name: string;
    readonly phoneNumber: string;
    readonly location: string;
    readonly remark?: string;
    readonly skills: {
        product: string[];
        remark?: string;
    }[];
    readonly commissionRate: string;
    readonly payday: string;
    readonly isPaid: boolean;
    readonly dailyEarnings: {
        date: string;
        dailyAmount: number;
    }[];
    dayoffs: string[];
    readonly holidays?: string[];
}
