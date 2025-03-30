# 베이스 이미지 설정
FROM node:20.15.0

# 작업 디렉토리 설정
WORKDIR /WHITECLINIC-BACKEND/backend/   

# 소스코드 복사
COPY backend/ .
COPY backend/yarn.lock ./

# 환경 변수 설정
ENV PORT=3000

# 의존성 설치
RUN yarn install

# 빌드 실행
RUN yarn build

# 애플리케이션이 사용하는 포트
EXPOSE 3000

# 컨테이너가 실행될 때 실행할 명령어
CMD ["yarn", "start:prod"]

