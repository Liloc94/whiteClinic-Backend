"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const submit_order_dto_1 = require("./submit_order.dto");
class UpdateOrderDTO extends (0, swagger_1.PartialType)(submit_order_dto_1.SubmitOrderDto) {
}
exports.UpdateOrderDTO = UpdateOrderDTO;
//# sourceMappingURL=update-order.dto.js.map