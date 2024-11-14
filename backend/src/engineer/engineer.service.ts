import { In, Repository } from 'typeorm';
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
import { EngineerScheduleDto } from './dto/search-engineer-schedule.dto';

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
      const mappedSkillId =
        await this.findSkillIdsByNames(engineer_valid_skill);

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

    const engineerMap = new Map<number, any>();

    engineerWithSkills.forEach((engineerSkill) => {
      const { engineer, skill } = engineerSkill;

      // 엔지니어가 이미 map에 있다면 스킬만 추가
      if (engineerMap.has(engineer.engineer_id)) {
        engineerMap
          .get(engineer.engineer_id)
          .engineer_skills.push(skill.skill_type);
      } else {
        // 엔지니어가 처음 등장하는 경우, 엔지니어 정보와 스킬을 함께 추가
        engineerMap.set(engineer.engineer_id, {
          ...engineer,
          engineer_skills: [skill.skill_type],
        });
      }
    });

    return Array.from(engineerMap.values());
  }

  async getAllSchedule() {
    const engineerSchedule = await this.orderDetailRepository
      .createQueryBuilder('customerEngineerOrder')
      .leftJoinAndSelect('customerEngineerOrder.customer', 'customer')
      .leftJoinAndSelect('customerEngineerOrder.engineer', 'engineer')
      .leftJoinAndSelect('customerEngineerOrder.order', 'order')
      .getMany();

    async function handleOrderDetails(
      orderDetails: any[],
    ): Promise<EngineerScheduleDto[]> {
      const scheduleList: EngineerScheduleDto[] = orderDetails.map((detail) => {
        const { customer, engineer, order } = detail; // 각 엔티티를 구조 분해

        return {
          order_id: order.order_id,
          engineer_id: engineer.engineer_id,
          customer_id: customer.customer_id,
          order_date: order.order_date,
          order_timeslot: '', // 여기에 예약 시간을 어떻게 할지 처리해줘야 함. 예시로 빈 문자열 처리
          //TODO : 화면설계 완료 이후 추가할지 버릴지 정하기
          engineer_name: engineer.engineer_name,
          customer_name: customer.customer_name,
          customer_addr: customer.customer_addr,
          customer_phone: customer.customer_phone,
          order_product: order.order_category,
          order_product_detail: order.order_product,
          order_count: order.order_count,
          order_total_amount: order.order_total_amount,
          order_remarks: order.order_remark,
          customer_remarks: customer.customer_remark,
        };
      });

      return scheduleList;
    }

    return await handleOrderDetails(engineerSchedule);
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

  // 스킬 이름 배열을 받아서 해당하는 스킬 ID를 반환
  async findSkillIdsByNames(skillNames: string[]): Promise<number[]> {
    const skills = await this.skillRepository.find({
      where: { skill_type: In(skillNames) }, // skillNames 배열에 포함된 이름으로 스킬 검색
    });

    if (skills.length === 0) {
      throw new Error('입력값과 일치하는 품목이 존재하지 않습니다.');
    }

    // 매칭되는 스킬의 ID만 추출하여 배열로 반환
    return skills.map((skill) => skill.skill_id);
  }
}
