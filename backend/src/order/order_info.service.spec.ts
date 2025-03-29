// {
//   order_date: '2024-12-12 10',
//   order_customer_name: '이정환',
//   order_customer_phone: '010-8402-2980',
//   order_customer_addr: '인천광역시 서구',
//   order_customer_remark: '단골고객',
//   order_deposit: 20000,
//   deposit_paid: true,
//   order_total_amount: 140000,
//   order_payment: '계좌이체',
//   order_receipt_docs: '현금영수증',
//   receipt_docs_issued: true,
//   order_category: '세탁기',
//   order_product: '통돌이',
//   order_count: 2,
//   order_discount_ratio: 14000,
//   order_remark: '더러움',
//   order_engineer_name: '장철환',
//   order_isDiscount: true,
// }

import { Test } from '@nestjs/testing';

import { DataSource } from 'typeorm';
import { OrderInfoService } from './order_info.service';
import { IncomeInfoService } from 'src/income.service';
import { Order } from './entities/order_info.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { CustomerEngineerOrder } from './entities/customer_engineer_order.entity';
import { Engineer } from 'src/engineer/entities/engineer.entity';
import { NotFoundException } from '@nestjs/common';
import handleCreateOrderInfo from 'src/util/helperFunctions/handleNewOrder';
import extractOrderDetail from 'src/util/helperFunctions/extractOrderDetails';

jest.mock('src/util/helper/DataHandlerFunc');
jest.mock('src/income.service');

describe('OrderInfoService', () => {
  let service: OrderInfoService;
  let dataSource: DataSource;
  let incomeInfoService: IncomeInfoService;

  const mockQueryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    manager: {
      save: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      find: jest.fn(),
      createQueryBuilder: jest.fn(),
      leftJoinAndSelect: jest.fn(),
      getOne: jest.fn(),
    },
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    isReleased: false,
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [OrderInfoService],
    })
      .useMocker((token) => {
        if (token === DataSource) {
          return {
            createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
          };
        }
        if (token === IncomeInfoService) {
          return {
            saveDailyIncome: jest.fn(),
          };
        }
        return jest.fn();
      })
      .compile();

    service = moduleRef.get(OrderInfoService);
    dataSource = moduleRef.get(DataSource);
    incomeInfoService = moduleRef.get(IncomeInfoService);
  });

  it('should create order and related entities', async () => {
    // Mock dependencies and utility function
    const mockCreateOrderInfoDto = {
      order_date: '2024-12-12 10',
      order_customer_name: '이정환',
      order_customer_phone: '010-8402-2980',
      order_customer_addr: '인천광역시 서구',
      order_customer_remark: '단골고객',
      order_deposit: 20000,
      deposit_paid: true,
      order_total_amount: 140000,
      order_payment: '계좌이체',
      order_receipt_docs: '현금영수증',
      receipt_docs_issued: true,
      order_category: '세탁기',
      order_product: '통돌이',
      order_count: 2,
      order_discount_ratio: 14000,
      order_remark: '더러움',
      order_engineer_name: '장철환',
      order_isDiscount: true,
    };

    const mockTemp = {
      order: {
        order_id: 1,
        order_total_amount: 140000,
        order_date: new Date(),
      },
      customer: { customer_id: 1, customer_name: '이정환' },
      engineer_name: '장철환',
    };

    const mockEngineer = { engineer_id: 1, engineer_name: '장철환' };
    const mockSavedOrderInfo = { ...mockTemp.order };
    const mockSavedCustomer = { ...mockTemp.customer };
    const mockCustomerEngineerOrder = { idx: 1 };

    (handleCreateOrderInfo as jest.Mock).mockResolvedValue(mockTemp);
    mockQueryRunner.manager.save.mockImplementation((entity, data) =>
      Promise.resolve(data),
    );
    mockQueryRunner.manager.findOne.mockResolvedValue(mockEngineer);
    mockQueryRunner.manager.create.mockReturnValue(mockCustomerEngineerOrder);

    // Execute service method
    const result = await service.create(mockCreateOrderInfoDto);

    // Assertions
    // 어설션(Assertions)
    // 어설션은 코드가 실행되는 동안 개발자가 가정한 조건이 항상 참인지 검증하는 도구입니다.
    // 주로 개발 단계에서 사용되며, 가정이 깨졌을 때 프로그램 실행을 중단하고 오류를 알려줍니다.
    // 어설션은 코드의 논리적 오류를 조기에 발견하고 디버깅을 쉽게 하기 위해 사용됩니다.

    expect(handleCreateOrderInfo).toHaveBeenCalledWith(mockCreateOrderInfoDto);
    expect(mockQueryRunner.connect).toHaveBeenCalled();
    expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
    expect(mockQueryRunner.manager.save).toHaveBeenCalledWith(
      Order,
      mockTemp.order,
    );
    expect(mockQueryRunner.manager.save).toHaveBeenCalledWith(
      Customer,
      mockTemp.customer,
    );
    expect(mockQueryRunner.manager.findOne).toHaveBeenCalledWith(Engineer, {
      where: { engineer_name: mockTemp.engineer_name },
    });
    expect(mockQueryRunner.manager.create).toHaveBeenCalledWith(
      CustomerEngineerOrder,
      {
        customer: mockSavedCustomer,
        order: mockSavedOrderInfo,
        engineer: mockEngineer,
      },
    );
    expect(mockQueryRunner.manager.save).toHaveBeenCalledWith(
      mockCustomerEngineerOrder,
    );
    expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
    expect(incomeInfoService.saveDailyIncome).toHaveBeenCalledWith({
      order_id: mockSavedOrderInfo.order_id,
      engineer_id: mockEngineer.engineer_id,
      daily_income: mockSavedOrderInfo.order_total_amount,
      date: mockSavedOrderInfo.order_date,
    });
    expect(mockQueryRunner.release).toHaveBeenCalled();
    expect(result).toEqual({
      idx: mockCustomerEngineerOrder.idx,
      savedOrderInfo: mockSavedOrderInfo,
      savedCustomer: mockSavedCustomer,
    });
  });

  it('should rollback transaction on error', async () => {
    const mockCreateOrderInfoDto = {
      order_date: '2024-12-12 10',
      order_customer_name: '이정환',
      order_customer_phone: '010-8402-2980',
      order_customer_addr: '인천광역시 서구',
      order_customer_remark: '단골고객',
      order_deposit: 20000,
      deposit_paid: true,
      order_total_amount: 140000,
      order_payment: '계좌이체',
      order_receipt_docs: '현금영수증',
      receipt_docs_issued: true,
      order_category: '세탁기',
      order_product: '통돌이',
      order_count: 2,
      order_discount_ratio: 14000,
      order_remark: '더러움',
      order_engineer_name: '장철환',
      order_isDiscount: true,
    };
    const mockError = new Error('Test error');

    (handleCreateOrderInfo as jest.Mock).mockRejectedValue(mockError);

    await expect(service.create(mockCreateOrderInfoDto)).rejects.toThrow(
      'Test error',
    );

    expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
    expect(mockQueryRunner.release).toHaveBeenCalled();
  });

  it('should remove order', async () => {
    const mockOrderId = 1;

    await service.remove(mockOrderId);

    expect(mockQueryRunner.manager.delete).toHaveBeenCalledWith(Order, {
      order_id: mockOrderId,
    });
    expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
    expect(mockQueryRunner.release).toHaveBeenCalled();
  });

  it('should rollback transaction on remove error', async () => {
    const mockOrderId = 1;
    const mockError = new Error('Test error');

    mockQueryRunner.manager.delete.mockRejectedValue(mockError);

    await expect(service.remove(mockOrderId)).rejects.toThrow('Test error');

    expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
    expect(mockQueryRunner.release).toHaveBeenCalled();
  });

  it('should find order details', async () => {
    const mockOrderDetails = [{ order_id: 1, order_date: new Date() }];

    mockQueryRunner.manager.find.mockResolvedValue(mockOrderDetails);

    (extractOrderDetail as jest.Mock).mockResolvedValue(mockOrderDetails);
    const result = await service.findOrderDetails();

    expect(result).toEqual(mockOrderDetails);
  });

  it('should find order details with id', async () => {
    const mockOrderId = 1;
    const mockOrderDetails = {
      order: {
        order_id: 1,
        description: 'Test Order',
        order_date: '2024-12-22 10',
        order_deposit: 100,
        deposit_paid: 50,
        order_total_amount: 200,
        order_payment: 'Credit',
        order_receipt_docs: 'Docs',
        receipt_docs_issued: true,
        order_category: 'Category A',
        order_count: 2,
        order_isDiscount: false,
        order_discount_ratio: 10,
        order_product: '에어컨', // Set to null if that is expected
      },
      engineer: {
        engineer_id: 301,
        engineer_name: 'Jane Smith',
      },
      customer: {
        customer_id: 101,
        customer_name: 'John Doe',
        customer_phone: '123-456-7890',
        customer_addr: '123 Main St',
        customer_remark: 'Regular customer',
      },
    };

    // Mock the service method
    mockQueryRunner.manager.createQueryBuilder.mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue(mockOrderDetails), // Mocked response
    });

    const result = await service.findWithId(mockOrderId);

    // Ensure the result matches the mockOrderDetails structure
    expect(result).toEqual({
      order_id: 1,
      engineer_id: 301,
      customer_id: 101,
      order_date: '2024-12-22 10',
      customer_name: 'John Doe',
      customer_phone: '123-456-7890',
      customer_addr: '123 Main St',
      customer_remark: 'Regular customer',
      order_deposit: 100,
      deposit_paid: 50,
      order_total_amount: 200,
      order_payment: 'Credit',
      order_receipt_docs: 'Docs',
      receipt_docs_issued: true,
      order_category: 'Category A',
      order_product: '에어컨', // Ensure this matches your expected value
      order_count: 2,
      order_isDiscount: false,
      order_discount_ratio: 10,
      engineer_name: 'Jane Smith',
    });
  });

  it('should throw NotFoundException if order is not found', async () => {
    mockQueryRunner.manager.createQueryBuilder.mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue(undefined),
    });

    await expect(service.findWithId(1)).rejects.toThrow(NotFoundException);
  });
});
