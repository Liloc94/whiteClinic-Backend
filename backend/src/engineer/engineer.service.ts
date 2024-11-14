import { Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateEngineerDto } from './dto/create-engineer.dto';
import { UpdateEngineerDto } from './dto/update-engineer.dto';
import { Engineer } from './entities/engineer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skills.entity';
import { EngineerSkill } from './entities/engineer_skill.entity';
import { CustomerEngineerOrder } from 'src/order_info/entities/customer_engineer_order.entity';
import {
  findSkillIdsByNames,
  handleEngineerData,
  handleEngineerScheduleData,
} from 'src/util/DataHandlerFunc';

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
  ) {}

  async create(engineerData: CreateEngineerDto) {
    try {
      if (!engineerData) {
        throw new BadRequestException('저장할 기사 정보가 존재하지 않습니다');
      }

      // 비구조화로 나눈 이후 남은 정보부터 먼저 저장하여 id 생성되게끔 하기
      const { engineer_valid_skill, ...engineerWithoutSkill } = engineerData;
      const savedEngineer = await this.engineerRepository.save({
        ...engineerWithoutSkill,
      });
      await this.engineerRepository.save({ ...savedEngineer });

      // 입력 데이터로부터 받아온 가능품목배열의 문자열을 검색 후 skill id 를 다시 배열로 반환받는다.
      const mappedSkillId = await findSkillIdsByNames(engineer_valid_skill);

      // 기사 테이블에서 가장 마지막에 생성된 기사의 아이디 추출
      await this.engineerRepository.find({
        select: ['engineer_id'], // ID만 선택
        order: { engineer_id: 'DESC' },
      });

      // 3. 새로 생성된 엔지니어의 ID는 savedEngineer에서 직접 사용
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

    return await handleEngineerData(engineerWithSkills);
  }

  async getAllSchedule() {
    const engineerSchedule = await this.orderDetailRepository
      .createQueryBuilder('customerEngineerOrder')
      .leftJoinAndSelect('customerEngineerOrder.customer', 'customer')
      .leftJoinAndSelect('customerEngineerOrder.engineer', 'engineer')
      .leftJoinAndSelect('customerEngineerOrder.order', 'order')
      .getMany();

    return await handleEngineerScheduleData(engineerSchedule);
  }

  findOne(id: number) {
    return `This action returns a #${id} engineer`;
  }

  update(id: number, updateEngineerDto: UpdateEngineerDto) {
    return `This action updates a #${id} engineer with ${updateEngineerDto}`;
  }

  remove(id: number) {
    return `This action removes a id : #${id} engineer`;
  }
}
