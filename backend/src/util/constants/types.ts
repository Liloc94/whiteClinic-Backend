import { Customer } from 'src/customer/entities/customer.entity';
import { Engineer } from 'src/engineer/entities/engineer.entity';
import { Order } from 'src/order/entities/order_info.entity';

export type IncomeType = {
  idx?: number;
  order_id: number;
  engineer_id: number;
  daily_income: number;
  date: string;
};

export type ExtractOrderType = {
  order_date?: string;
  deposit_paid?: boolean;
  order_deposit?: number;
  order_payment?: string;
  order_receipt_docs?: string;
  receipt_docs_issued?: boolean;
  order_category?: string;
  order_product?: string;
  order_remark?: string;
  order_count?: number;
  order_total_amount?: number;
  order_isDiscount?: boolean;
  order_discount_ratio?: number;
};

export type ExtractOrderCustomerType = {
  customer_name: string;
  customer_phone: string;
  customer_addr: string;
  customer_remark: string;
};

export type ExtractedInfoReturnType = {
  order: ExtractOrderType;
  customer: ExtractOrderCustomerType;
  engineer_name: string;
};

export type MappedDataType = {
  customer: Customer;
  order: Order;
  engineer: Engineer;
};
