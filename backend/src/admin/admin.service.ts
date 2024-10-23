import { Injectable } from '@nestjs/common';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { bcrypt } from 'bcrypt';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  // 관리자 계정 생성
  async createAdmin(
    adminid: string,
    adminpw: string,
    role: string = 'admin',
  ): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(adminpw, 10);
    const admin = this.adminRepository.create({
      adminid,
      adminpw: hashedPassword,
      role,
    });
    return this.adminRepository.save(admin);
  }

  // 아이디와 일치하는 리프레시 토큰을 가진 회원정보 찾기
  async findOne(adminid: string): Promise<Admin | undefined> {
    return this.adminRepository.findOne({
      where: { adminid },
      relations: ['refreshTokens'],
    });
  }

  // tokenVersion 증가 함수
  // accessToken 에 version 을 추가하여 2중으로 체크하여 유효성 검사 실시
  async incrementTokenVersion(id: number): Promise<void> {
    await this.adminRepository.increment({ id }, 'tokenVersion', 1);
  }
}
