import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AdminAccount } from './entities/admin_account.entity';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminAccount)
    private readonly adminRepository: Repository<AdminAccount>,
  ) {}

  // 관리자 계정 생성
  async createAdmin(
    adminid: string,
    adminpw: string,
    role: string = 'admin',
  ): Promise<AdminAccount> {
    const hashedPassword = await bcrypt.hash(adminpw, 10);
    const admin = this.adminRepository.create({
      admin_id: adminid,
      admin_pw: hashedPassword,
      role,
    });
    return this.adminRepository.save(admin);
  }

  // 아이디와 일치하는 리프레시 토큰을 가진 회원정보 찾기
  async findOne(adminid: string): Promise<AdminAccount | undefined> {
    try {
      const admin = await this.adminRepository.findOne({
        where: { admin_id: adminid },
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
  async incrementTokenVersion(token_version: number): Promise<void> {
    await this.adminRepository.increment({ token_version }, 'token_version', 1);
  }
}
