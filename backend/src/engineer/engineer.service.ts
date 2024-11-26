import { EngineerSkill } from 'src/engineer/entities/engineer_skill.entity';
import { DataSource } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { Engineer } from './entities/engineer.entity';
import { CustomerEngineerOrder } from 'src/order_info/entities/customer_engineer_order.entity';
import {
  extractOrderDetail,
  handleEngineerData,
  handleEngineerScheduleData,
} from 'src/util/DataHandlerFunc';
import { EngineerDailyEarning } from './entities/engineer_daily_earning.entity';
import { SkillService } from 'src/skillUtil.service';
import { TempEngineer } from './entities/temp_emgineer_info.entity';
import { EngineerWeeklySalaryDto } from './dto/save-engineer-weeklyEarning.dto';
import { EngineerWeeklyEarning } from './entities/engineer_weekly_earning.entity';
import { EngineerWeeklyDetailDto } from './dto/search-engineer-weeklyEarningIsPaid.dto';

@Injectable()
export class EngineerService {
  constructor(
    // NOTE : QueryRunner 사용 시 DB 의존성 주입이 필요하지 않다,
    // 직접적으로 QueryRunner가 DB와의 연결을 담당하기 때문이다.

    // 기사 정보 저장 테이블
    // @InjectRepository(Engineer)
    // private readonly engineerRepository: Repository<Engineer>,
    //  기사 정보 임시저장 테이블
    // @InjectRepository(TempEngineer)
    // private readonly tempEngineerRepository: Repository<TempEngineer>,
    //  매핑을 위한 가능품목 테이블
    // @InjectRepository(Skill)
    // private readonly skillRepository: Repository<Skill>,
    //  기사와 가능품목 매핑테이블
    // @InjectRepository(EngineerSkill)
    // private readonly engineerSkillRepository: Repository<EngineerSkill>,
    // @InjectRepository(CustomerEngineerOrder)
    // private readonly orderDetailRepository: Repository<CustomerEngineerOrder>,
    // @InjectRepository(EngineerDailyEarning)
    // private readonly engineerDailyEarningRepository: Repository<EngineerDailyEarning>,

    // module 내의 providers 배열에 추가가 필요함.
    private readonly skillService: SkillService, // 별도의 서비스 의존성 주입
    private readonly dataSource: DataSource,
  ) {}

  async createEngineerInfo(engineerData: CreateEngineerDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      // destructuring 이후 남은 정보부터 먼저 저장하여 id 생성되게끔 하기
      const { engineer_valid_skill, ...engineerWithoutSkill } = engineerData;

      const savedEngineer = await queryRunner.manager.save(Engineer, {
        ...engineerWithoutSkill,
      });

      await queryRunner.manager.save(Engineer, { ...savedEngineer });

      // 입력 데이터로부터 받아온 가능품목배열의 문자열을 검색 후 skill id 를 다시 배열로 반환받는다.
      const mappedSkillId =
        await this.skillService.findSkillIdsByNames(engineer_valid_skill);

      // 3. 새로 생성된 기사의 ID는 savedEngineer에서 직접 사용
      const engineerSkills = mappedSkillId.map((skillId) => ({
        engineer_id: savedEngineer.engineer_id, // 또는 savedEngineer.engineer_id
        skill_id: skillId,
      }));

      await queryRunner.manager.insert(EngineerSkill, engineerSkills);

      queryRunner.commitTransaction();
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async findAllEngineer() {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const engineerWithSkills = await queryRunner.manager
        .createQueryBuilder(EngineerSkill, 'engineerSkill')
        .leftJoinAndSelect('engineerSkill.engineer', 'engineer')
        .leftJoinAndSelect('engineerSkill.skill', 'skill')
        .getMany();

      queryRunner.commitTransaction();

      return await handleEngineerData(engineerWithSkills);
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async getAllSchedule() {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const engineerSchedule = await extractOrderDetail(
        this.dataSource,
        CustomerEngineerOrder,
      );

      queryRunner.commitTransaction();

      return await handleEngineerScheduleData(engineerSchedule);
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async getDailySalary(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const engineerDailyIncome = await queryRunner.manager.find(
        EngineerDailyEarning,
        {
          where: {
            engineer: {
              engineer_id: id, // engineer 엔티티에서 id를 사용하여 검색
            },
          },
        },
      );

      await queryRunner.commitTransaction();
      return engineerDailyIncome;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async saveEngineerWeeklySalary(weeklySalary: EngineerWeeklySalaryDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      // 몇 주차인지 먼저 검증
      const isExistingWeekly = await queryRunner.manager.findOne(
        EngineerWeeklyEarning,
        { where: { weekly: weeklySalary.weekly } },
      );

      if (!!isExistingWeekly) {
        await queryRunner.manager.update(
          EngineerWeeklyEarning,
          { weekly: weeklySalary.weekly },
          { ...weeklySalary },
        );
      } else {
        await queryRunner.manager.save(EngineerWeeklyEarning, {
          ...weeklySalary,
        });
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async getEngineerWeeklyDetail(idDate: EngineerWeeklyDetailDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const searchedInfo = await queryRunner.manager.findOne(
        EngineerWeeklyEarning,
        { where: { engineer_id: idDate.engineer_id, weekly: idDate.weekly } },
      );
      await queryRunner.commitTransaction();
      // idx 불필요함, 구조분해 후 남겨두기
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { idx, ...rest } = searchedInfo;

      return rest;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async findEngineerWithSkill(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    try {
      const exactEngineer = await queryRunner.manager
        .createQueryBuilder(EngineerSkill, 'engineerSkill')
        .leftJoinAndSelect('engineerSkill.engineer', 'engineer')
        .leftJoinAndSelect('engineerSkill.skill', 'skill')
        .where('engineer.engineer_id = :id', { id })
        .getMany();

      await queryRunner.commitTransaction();
      return await handleEngineerData(exactEngineer);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateEngineerInfo(id: number, updateInfo: UpdateEngineerDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      // 기사 가능품목만 구조분해 이후 따로 저장
      const { engineer_valid_skill, ...rest } = updateInfo;
      const engineerSkill =
        await this.skillService.findSkillIdsByNames(engineer_valid_skill);

      await queryRunner.manager.delete(EngineerSkill, { engineer_id: id });

      // map , forEach 등의 반복문은 비동기로 처리할 수 없다,
      // 변수에 담아 Promise.all() 함수의 매개변수로 전달하여 반복문 내의 모든 작업을
      // 한번에 병렬로 비동기 처리할 수 있다.
      const promises = engineerSkill.map((skillNumber) => {
        queryRunner.manager.delete(EngineerSkill, {
          skill_id: skillNumber,
        });
        queryRunner.manager.save(EngineerSkill, { skill_id: skillNumber });
      });

      // 해당 함수를 통해 반복순회를 병렬로 비동기처리할 수 있다.
      await Promise.all(promises);

      // 기사 정보 업데이트
      await queryRunner.manager.update(Engineer, { engineer_id: id }, rest);

      // 업데이트된 엔지니어 ID에 대해서만 시퀀스 값을 맞춰줍니다.
      //   await queryRunner.manager.query(`
      //   SELECT setval('engineer_engineer_id_seq', (SELECT MAX(engineer_id) FROM engineer WHERE engineer_id <= ${id}));
      // `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async removeEngineerInfo(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const targetEngineer = await queryRunner.manager.findOneOrFail(Engineer, {
        where: { engineer_id: id },
      });

      // 기사정보 임시 저장테이블에 먼저 저장
      await queryRunner.manager.save(TempEngineer, { ...targetEngineer });

      // id 값을 가진 기사정보를 기사테이블에서 삭제
      await queryRunner.manager.delete(Engineer, { engineer_id: id });

      // 기사정보 테이블 시퀀스 수정으로 serial id 값 재조정을 통해
      // 신규 기사정보 생성 시, 값의 공백을 없앨 수 있다.
      await queryRunner.manager.query(`
        SELECT setval('engineer_engineer_id_seq', (SELECT MAX(engineer_id) FROM engineer));
      `);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // QueryRunner 해제
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }
}
