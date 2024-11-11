import { ProductType } from './product_type.entity';
import { AirConditioner } from './air_condition.entity';
import { WashingMachine } from './washing_machine.entity';
export declare class ProductDetail {
    productDetailId: number;
    productTypeId: number;
    productType: ProductType;
    airConditionId: number | null;
    airCondition: AirConditioner | null;
    washingMachineId: number | null;
    washingMachine: WashingMachine | null;
}
