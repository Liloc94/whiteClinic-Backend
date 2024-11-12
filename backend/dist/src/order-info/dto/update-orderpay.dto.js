"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderPayDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_orderpay_dto_1 = require("./create-orderpay.dto");
class UpdateOrderPayDTO extends (0, swagger_1.PartialType)(create_orderpay_dto_1.CreateOrderPayDTO) {
}
exports.UpdateOrderPayDTO = UpdateOrderPayDTO;
//# sourceMappingURL=update-orderpay.dto.js.map