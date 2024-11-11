import { Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from '../dto/create-registration.dto';
import { UpdateRegistrationDto } from '../dto/update-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Engineer } from 'src/engineer-info/entities/engineer.entity';
import { Repository, DataSource } from 'typeorm';
import { EngineerCommissionRates } from 'src/engineer-info/entities/engineer_commission.rate.entity';
import { CommissionRates } from '../entities/commissionRates.entity';
import { RegularHolidays } from '../entities/RegularHolidays.entity';
import { WeekDays } from '../entities/WeekDays.entity';
import { EngineerSkill } from '../entities/EngineerSkill.entity';
import { Skills } from '../entities/Skills.entity';
import { EngineerPayday } from 'src/engineer-info/entities/engineer_payday.entity';
import { SpecialHolidays } from '../entities/SpecialHolidays.entity';

@Injectable()
export class RegistrationService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(Engineer)
    private EngineerRepostiory: Repository<Engineer>,
  ) {}

  async create(dto: CreateRegistrationDto) {
    // 트랜젝션 설정
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //엔지니어 테이블에 데이터 넣어주기
      const engineer = this.EngineerRepostiory.save({
        name: dto.engineerName,
        phoneNumber: dto.phoneNumber,
        location: dto.location,
        remark: dto.remark,
      });
      console.log('engineerData 정상적으로 저장완료', (await engineer).name);

      //받은 스킬들 문자열 배열로 정렬
      const skillNames = dto.skill.split(',').map((data) => data.trim());

      //스킬이 Skill 데이터베이스에 있는지 확인
      for (const skillName of skillNames) {
        let skill = await queryRunner.manager.findOne(Skills, {
          where: { skill: skillName },
        });

        //만약 skill 데이터베이스에 존재하지 않는 스킬이라면
        if (!skill) {
          skill = await queryRunner.manager.save(Skills, {
            skill: skillName,
          });
          console.log('새로운 스킬인 ' + skill.skill + ' 저장되었습니다.');
        }

        //Engineer_skill 매핑 및 저장
        await queryRunner.manager.save(EngineerSkill, {
          engineerId: (await engineer).engineerId,
          skillId: skill.skillId,
        });
        console.log('engineerId : ', (await engineer).engineerId);
        console.log('skillId', skill.skillId);
      }

      //수당률
      // post 해당률과 일치하는 데이터를 찾고 id 리턴
      const CommissionRate = await queryRunner.manager.findOneBy(
        CommissionRates,
        {
          rate: parseFloat(dto.commissionRate),
        },
      );

      //수당률
      await queryRunner.manager.save(EngineerCommissionRates, {
        engineerId: (await engineer).engineerId,
        rateId: CommissionRate.id,
      });

      //비정기휴무
      //배열로 만들어주기
      const ArraySPecialHolidays = dto.specialHoliday
        .split(',')
        .map((data) => data.trim());

      for (const ArraySPecialHoliday of ArraySPecialHolidays) {
        await queryRunner.manager.save(SpecialHolidays, {
          engineerId: (await engineer).engineerId,
          holiday: ArraySPecialHoliday,
        });
      }
      console.log('비정기 완료', ArraySPecialHolidays);

      //정기휴무
      //post로 받은 날짜와 weekDay 테이블안에 해당하는 날짜의 id 찾아오기
      const selectedDayId = await queryRunner.manager.findOneBy(WeekDays, {
        dayName: dto.regularHoliday,
      });

      await queryRunner.manager.save(RegularHolidays, {
        engineerId: (await engineer).engineerId,
        weekdayId: selectedDayId.id,
      });
      console.log('정기휴무 나오냐?', selectedDayId);

      //급여요일
      const selectPaymentDay = await queryRunner.manager.findOneBy(WeekDays, {
        dayName: dto.paymentDay,
      });

      await queryRunner.manager.save(EngineerPayday, {
        engineerId: (await engineer).engineerId,
        weekdays: selectPaymentDay.id,
        isPay: false,
      });
      console.log('급여요일 날짜 나오냐?', selectPaymentDay.id);

      await queryRunner.commitTransaction();

      return {
        sucess: true,
        message: '성공적으로 데이터가 저장되었습니다.',
        data: {
          engineer,
          skillNames: skillNames,
          commissionRate: CommissionRate,
          specialHolidays: ArraySPecialHolidays,
          regularHolidays: selectedDayId,
          paymentDay: selectPaymentDay,
        },
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('에러 발생', error);
    } finally {
      await queryRunner.release();
    }
  }

  update(id: number, UpdateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} registration`;
  }

  remove(id: number) {
    return `This action removes a #${id} registration`;
  }
}
