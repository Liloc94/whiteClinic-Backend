import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://default:hNOtdfu8sWy3@ep-cold-band-a71ed1zj-pooler.ap-southeast-2.aws.neon.tech:5432/verceldb?sslmode=require',
  ssl: { rejectUnauthorized: false },
  schema: 'white_clinic',
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'], // 모든 엔티티 파일 포함
  migrations: [__dirname + '/migrations/*{.ts,.js}'],

  synchronize: false,
  logging: true,
});
