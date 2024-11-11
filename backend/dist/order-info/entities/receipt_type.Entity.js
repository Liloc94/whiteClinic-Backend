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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptDocs = void 0;
const typeorm_1 = require("typeorm");
let ReceiptDocs = class ReceiptDocs {
};
exports.ReceiptDocs = ReceiptDocs;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'receipt_docs_id' }),
    __metadata("design:type", Number)
], ReceiptDocs.prototype, "receiptDocsId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['간이영수증', '세금계산서', '현금영수증', '카드영수증', '필요없음'],
        unique: true,
    }),
    __metadata("design:type", String)
], ReceiptDocs.prototype, "receiptType", void 0);
exports.ReceiptDocs = ReceiptDocs = __decorate([
    (0, typeorm_1.Entity)('receipt_docs')
], ReceiptDocs);
//# sourceMappingURL=receipt_type.Entity.js.map