import { EngineerSkill } from 'src/engineer/entities/engineer_skill.entity';
import { Repository, DataSource } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { Engineer } from './entities/engineer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skills.entity';
import { CustomerEngineerOrder } from 'src/order_info/entities/customer_engineer_order.entity';
import {
  handleEngineerData,
  handleEngineerScheduleData,
} from 'src/util/DataHandlerFunc';
import { EngineerDailyEarning } from './entities/engineer_daily_earning.entity';
import { SkillService } from 'src/skillUtil.service';
import { IncomeType } from 'src/util/constantTypes';

@Injectable()
export class EngineerService {
  constructor(
    // 기사 정보 저장 테이블
    @InjectRepository(Engineer)
    private readonly engineerRepository: Repository<Engineer>,

    // 매핑을 위한 가능품목 테이블
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,

    // 기사와 가능품목 매핑테이블
    @InjectRepository(EngineerSkill)
    private readonly engineerSkillRepository: Repository<EngineerSkill>,

    @InjectRepository(CustomerEngineerOrder)
    private readonly orderDetailRepository: Repository<CustomerEngineerOrder>,

    @InjectRepository(EngineerDailyEarning)
    private readonly engineerDailyEarningRepository: Repository<EngineerDailyEarning>,

    private readonly skillService: SkillService, // 다른 서비스 의존성 주입
    private readonly dataSource: DataSource,
  ) {}

  async createEngineerInfo(engineerData: CreateEngineerDto) {
    try {
      if (!engineerData) {
        throw new BadRequestException('저장할 기사 정보가 존재하지 않습니다');
      }

      // destructuring 이후 남은 정보부터 먼저 저장하여 id 생성되게끔 하기
      const { engineer_valid_skill, ...engineerWithoutSkill } = engineerData;
      const savedEngineer = await this.engineerRepository.save({
        ...engineerWithoutSkill,
      });
      await this.engineerRepository.save({ ...savedEngineer });

      // 입력 데이터로부터 받아온 가능품목배열의 문자열을 검색 후 skill id 를 다시 배열로 반환받는다.
      const mappedSkillId =
        await this.skillService.findSkillIdsByNames(engineer_valid_skill);

      // 기사 테이블에서 가장 마지막에 생성된 기사의 아이디 추출
      await this.engineerRepository.find({
        select: ['engineer_id'], // ID만 선택
        order: { engineer_id: 'DESC' },
      });

      // 3. 새로 생성된 기사의 ID는 savedEngineer에서 직접 사용
      const engineerSkills = mappedSkillId.map((skillId) => ({
        engineer_id: savedEngineer.engineer_id, // 또는 savedEngineer.engineer_id
        skill_id: skillId,
      }));
      await this.engineerSkillRepository.insert(engineerSkills);
    } catch (error) {
      if (error.code === '23505') {
        // 중복 키 에러 코드
        throw new ConflictException('이미 존재하는 엔지니어입니다.');
      }
    }
  }

  async findAll() {
    const engineerWithSkills = await this.engineerSkillRepository
      .createQueryBuilder('engineerSkill')
      .leftJoinAndSelect('engineerSkill.engineer', 'engineer') // 엔지니어 정보 조인
      .leftJoinAndSelect('engineerSkill.skill', 'skill') // 스킬 정보 조인
      .getMany();
    if (!engineerWithSkills[0]) {
      throw new NotFoundException('기사 정보가 존재하지 않습니다.');
    }
    return await handleEngineerData(engineerWithSkills);
  }

  async getAllSchedule() {
    const engineerSchedule = await this.orderDetailRepository
      .createQueryBuilder('customerEngineerOrder')
      .leftJoinAndSelect('customerEngineerOrder.customer', 'customer')
      .leftJoinAndSelect('customerEngineerOrder.engineer', 'engineer')
      .leftJoinAndSelect('customerEngineerOrder.order', 'order')
      .getMany();

    if (!engineerSchedule[0]) {
      throw new NotFoundException('기사 스케쥴 데이터가 존재하지 않습니다.');
    }
    return await handleEngineerScheduleData(engineerSchedule);
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

  async findOne(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    try {
      const exactEngineer = await queryRunner.manager.find(Engineer, {
        where: { engineer_id: id },
      });

      await queryRunner.commitTransaction();
      return exactEngineer;
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

      (await engineerSkill).map((skillNumber) => {
        queryRunner.manager.delete(EngineerSkill, {
          skill_id: skillNumber,
        });
        queryRunner.manager.save(EngineerSkill, { skill_id: skillNumber });
      });
      // 기사 정보 업데이트
      await queryRunner.manager.update(Engineer, { engineer_id: id }, rest);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  async removeEngineerInfo(id: number) {
    // const targetEngineer = await this.engineerRepository.findOne({
    //   where: { engineer_id: id },
    // });

    // 기사정보 임시저장 테이블
    // this.tempEngineerRepository.save({ ...targetEngineer });
    await this.engineerRepository.delete({ engineer_id: id });
  }
}
