import { EngineerSkill } from 'src/engineer/entities/engineer_skill.entity';

/**
 * @param engineerWithSkill 기사 청소가능 품목 배열
 * @returns 모든 기사정보 + 해당 기사의 청소가능 품목 배열 반환
 * @description 기사 정보와 청소가능 품목을 함께 반환합니다.
 */
export default async function handleEngineerData(
  engineerWithSkill: EngineerSkill[],
) {
  const engineerMap = new Map<number, any>();

  engineerWithSkill.forEach((engineerSkill) => {
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
