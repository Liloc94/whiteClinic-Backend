"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: 'postgres://default:hNOtdfu8sWy3@ep-cold-band-a71ed1zj-pooler.ap-southeast-2.aws.neon.tech:5432/verceldb?sslmode=require',
    ssl: { rejectUnauthorized: false },
    schema: 'white_clinic',
    entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: false,
    logging: true,
});
//# sourceMappingURL=data-source.js.map