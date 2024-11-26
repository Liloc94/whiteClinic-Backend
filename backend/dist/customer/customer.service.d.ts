import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DataSource, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
export declare class CustomerService {
    private readonly dataSource;
    private readonly customerRepository;
    constructor(dataSource: DataSource, customerRepository: Repository<Customer>);
    create(createCustomerDto: CreateCustomerDto): string;
    findAll(): Promise<Customer[]>;
    findOne(id: number): string;
    update(id: number, updateCustomerDto: UpdateCustomerDto): string;
    remove(id: number): string;
}
