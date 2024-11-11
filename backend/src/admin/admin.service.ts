import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  // 관리자 계정 생성
  async createAdmin(
    adminid: string,
    adminpw: string,
    role: string = 'admin',
  ): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(adminpw, 10);
    const admin = this.adminRepository.create({
      adminId: adminid,
      password: hashedPassword,
      role,
    });
    return this.adminRepository.save(admin);
  }

  // 아이디와 일치하는 리프레시 토큰을 가진 회원정보 찾기
  async findOne(adminid: string): Promise<Admin | undefined> {
    try {
      const admin = await this.adminRepository.findOne({
        where: { adminId: adminid },
        relations: ['refreshTokens'],
      });

      if (!admin) {
        throw new UnauthorizedException(
          '아이디와 일치하는 회원정보가 존재하지 않습니다.',
        );
      }
      return admin;
    } catch (error) {
      console.error('Error finding admin:', error);
      throw error;
    }
  }

  // tokenVersion 증가 함수
  // accessToken 에 version 을 추가하여 2중으로 체크하여 유효성 검사 실시
  async incrementTokenVersion(id: number): Promise<void> {
    await this.adminRepository.increment({ id }, 'tokenVersion', 1);
  }
}
