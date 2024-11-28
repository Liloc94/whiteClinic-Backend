"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const typeorm_2 = require("@nestjs/typeorm");
let CustomerService = class CustomerService {
    constructor(dataSource, customerRepository) {
        this.dataSource = dataSource;
        this.customerRepository = customerRepository;
    }
    create(createCustomerDto) {
        return 'This action adds a new customer';
    }
    async findAll() {
        return await this.customerRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} customer`;
    }
    update(id, updateCustomerDto) {
        return `This action updates a #${id} customer`;
    }
    remove(id) {
        return `This action removes a #${id} customer`;
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        typeorm_1.Repository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map