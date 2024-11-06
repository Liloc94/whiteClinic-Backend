import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegistrationDto {
  @IsNotEmpty()
  @IsString()
  engineerName: string; // 기사성함

  @IsNotEmpty()
  @IsString()
  phoneNumber: string; // 연락처

  @IsNotEmpty()
  @IsString()
  location: string; // 거주지역

  @IsNotEmpty()
  @IsString()
  skill: string; // 가능품목

  @IsNotEmpty()
  @IsString()
  remark: string; // 특이사항

  @IsNotEmpty()
  @IsString()
  commissionRate: string; // 수당률

  @IsNotEmpty()
  @IsString()
  paymentDay: string; // 급여요일

  @IsNotEmpty()
  @IsString()
  specialHoliday: string; // 비정기휴무등록

  @IsNotEmpty()
  @IsString()
  regularHoliday: string; // 정기휴무
}
