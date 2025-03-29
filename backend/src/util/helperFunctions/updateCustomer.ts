import { Customer } from 'src/customer/entities/customer.entity';

/**
 * @param customer Customer entity instance
 * @param updatedCustomer updatedCustomer entity instance
 * @description Customer 엔티티의 필드를 업데이트합니다.
 */
export default async function updateCustomer(
  customer: Customer,
  updatedCustomer: Partial<Customer>,
) {
  customer.customer_name = updatedCustomer.customer_name;
  customer.customer_phone = updatedCustomer.customer_phone;
  customer.customer_addr = updatedCustomer.customer_addr;
  customer.customer_remark = updatedCustomer.customer_remark;
}
