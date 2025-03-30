import { CreateOrderInfoDto } from 'src/order/dto/create-order_info.dto';
import {
  ExtractedInfoReturnType,
  ExtractOrderCustomerType,
} from 'src/util/constants/types';
import { UpdateOrderInfoDto } from 'src/order/dto/update-order_info.dto';

/**
 *
 * @param orderInfo 주문등록 시 입력 정보, CreateOrderInfoDto 타입
 * @returns [주문정보, 고객정보, 기사성함] 배열로 반환 ExtractedInfoReturnType
 * @description 주문정보를 ExtractedInfoReturnType 형태로 변환하여 반환합니다.
 */
export default async function handleCreateOrderInfo(
  orderInfo: CreateOrderInfoDto | UpdateOrderInfoDto,
): Promise<ExtractedInfoReturnType> {
  const {
    order_customer_addr,
    order_customer_name,
    order_customer_phone,
    order_customer_remark,
    order_engineer_name: engineer_name,
    ...rest
  } = orderInfo;

  const customerInfo: ExtractOrderCustomerType = {
    customer_name: order_customer_name,
    customer_phone: order_customer_phone,
    customer_addr: order_customer_addr,
    customer_remark: order_customer_remark,
  };

  const returnValue: ExtractedInfoReturnType = {
    order: rest,
    customer: customerInfo,
    engineer_name: engineer_name,
  };

  return returnValue;
}
