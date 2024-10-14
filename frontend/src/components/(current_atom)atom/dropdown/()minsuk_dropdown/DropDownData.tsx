export const DropDownList = {
  세척품목: [
    '벽걸이',
    '원웨이',
    '포웨이',
    '스탠드',
    '투인원',
    '원형 360 에어컨',
    '파세코 창문형 에어컨',
    '사각 덕트',
    '원형 덕트',
    '메인 덕트',
    '통돌이',
    '드럼',
    '빌트인',
    '건조기',
    '드럼형 아기사랑 세탁기',
    '통돌이형 아기사랑 세탁기',
  ] as const,

  결제방식: ['계좌이체', '카드결제', '숨고페이', '현장현금결제'] as const,

  증빙서류: ['간이영수증', '세금계산서', '현금영수증', '카드영수증', '필요없음'] as const,

  수당률: ['50%', '55%', '60%', '70%', '75%', '80%'] as const,

  급여요일: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'] as const,
};

export type AllDropDownList = [keyof typeof DropDownList][number];