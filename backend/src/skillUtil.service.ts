import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './engineer/entities/skills.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  // 스킬 이름 배열을 받아서 해당하는 스킬 ID를 반환
  async findSkillIdsByNames(skillNames: string[]): Promise<number[]> {
    // skillNames 배열에 포함된 이름으로 스킬 검색
    const skills = await this.skillRepository.find({
      where: { skill_type: In(skillNames) },
    });

    if (skills.length === 0) {
      throw new NotFoundException(
        '입력값과 일치하는 품목이 존재하지 않습니다.',
      );
    }

    return skills.map((skill) => skill.skill_id);
  }
}
