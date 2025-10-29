export const dashboardData = {
  personalUsage: {
    period: "최근 30일",
    totalPrompts: 482,
    improvedPrompts: 164,
    averageScore: 86,
    improvementRate: 38,
    avgResponseTokens: 7245,
    categories: [
      { label: "코딩", ratio: 47, weeklyGrowth: 12 },
      { label: "분석", ratio: 18, weeklyGrowth: 6 },
      { label: "요약", ratio: 14, weeklyGrowth: 9 },
      { label: "질문", ratio: 13, weeklyGrowth: 2 },
      { label: "번역", ratio: 8, weeklyGrowth: 4 },
    ],
    trend: [
      { label: "응답 품질", value: "+18%", hint: "지난달 대비" },
      { label: "사용자 만족도", value: "+12%", hint: "피드백 평균" },
      { label: "응답 시간", value: "-21%", hint: "단축률" },
    ],
  },
  beforeAfter: [
    { metric: "응답 품질 점수", before: 68, after: 88, unit: "점" },
    { metric: "평균 해결 시간", before: 9.2, after: 6.1, unit: "분" },
    { metric: "재질문 비율", before: 24, after: 11, unit: "%" },
  ],
  userBehavior: {
    patterns: [
      { user: "de***", pattern: "야간(22~01시) 집중 사용", focus: "코딩 디버깅" },
      { user: "te***", pattern: "낮(09~12시) 집중 사용", focus: "요약 및 회의 준비" },
      { user: "ad***", pattern: "주말 집중 세션", focus: "번역 & 리라이팅" },
    ],
    faqTopics: [
      { topic: "React 상태 관리", count: 42 },
      { topic: "데이터 시각화", count: 35 },
      { topic: "법률 문서 요약", count: 27 },
      { topic: "영문 이메일 교정", count: 25 },
      { topic: "프롬프트 엔지니어링 팁", count: 22 },
    ],
    activeHours: [
      { label: "06시", value: 8 },
      { label: "09시", value: 32 },
      { label: "12시", value: 24 },
      { label: "15시", value: 41 },
      { label: "18시", value: 35 },
      { label: "21시", value: 48 },
      { label: "24시", value: 27 },
    ],
  },
  topicInsights: [
    {
      title: "코딩",
      highlight: "JSON 포맷 지정 시 후처리 시간 -35%",
      detail: "자동화 스크립트 540건에서 포맷을 지정한 경우 수작업 수정 시간이 크게 줄었습니다.",
      tip: "필수 필드를 미리 정의하고 예시 JSON 스키마를 함께 제공하세요.",
    },
    {
      title: "요약",
      highlight: "세부 키워드 지정 시 길이 편차 -24%",
      detail: "핵심 키워드 목록을 프롬프트에 포함하면 균형 잡힌 요약이 생성됩니다.",
      tip: "길이, 형식, 관점을 사전에 정의하세요.",
    },
    {
      title: "질문",
      highlight: "프롬프트 사용률 34%",
      detail: "질문 상황을 서술하면 추가 정보 제안이 정확해집니다.",
      tip: "목적/현재 진행 상황을 세팅해보세요.",
    },
    {
      title: "교육",
      highlight: "퀴즈형 프롬프트 학습 유지율 +27%",
      detail: "학습 세션 로그 3,200건 분석 결과, 단계별 질문 → 피드백 → 요약 구조가 재방문율을 높였습니다.",
      tip: "학습 목표, 난이도, 피드백 방식을 지정하고 예시 문제를 함께 제시하세요.",
    },
  ],
  promptReport: [
    {
      title: "에러 로그 요약",
      score: 92,
      original: "이 에러 로그 좀 이해해줘.",
      improved:
        "아래 Node.js 서버 에러 로그를 재구성해서 원인 후보 3가지를 요약하고, 각 항목에 대응 전략을 제시해줘.\n```\n[log snippet]\n```",
      notes: ["응답 길이 30% 감소", "해결 소요 시간 5분 → 2분"],
    },
    {
      title: "해외 고객 지원 메일",
      score: 88,
      original: "고객에게 사과 메일 작성해줘.",
      improved:
        "다음 고객 상황을 참고해 사과+보상 메일을 작성해줘. 브랜드 톤은 '전문적이고 진정성 있는' 느낌으로.\n- 문제: 배송 지연 4일\n- 고객 타입: VIP\n- 보상: 추가 포인트 5,000점",
      notes: ["NPS 3.1 → 4.6", "회신 시간 2배 단축"],
    },
    {
      title: "IR 피치 자료",
      score: 85,
      original: "우리 회사 소개 자료 만들어줘.",
      improved:
        "아래 항목을 중심으로 6장 슬라이드 구조를 제안하고 각 슬라이드에 들어갈 핵심 카피를 작성해줘.\n- 시장 문제: …\n- 해결 방법: …\n- 경쟁 우위: …",
      notes: ["발표 준비 시간 30% 절약", "투자자 질의 응답 대비 ↑"],
    },
  ],
  leaderboard: {
    promptTypes: [
      { label: "버그 리포트 디버깅", improvement: 63 },
      { label: "법률 문서 요약", improvement: 58 },
      { label: "마케팅 카피 AB 테스트", improvement: 52 },
      { label: "데이터 분석 질의", improvement: 47 },
      { label: "교육용 스크립트", improvement: 43 },
    ],
    keywords: [
      { label: "맥락 요약", lift: 54 },
      { label: "톤 & 스타일", lift: 46 },
      { label: "테스트 케이스", lift: 39 },
      { label: "타겟 퍼소나", lift: 35 },
      { label: "출력 포맷", lift: 31 },
    ],
  },
  community: {
    trendingTopics: [
      { topic: "LLM 코드 개선", share: 19 },
      { topic: "멀티모달 프롬프트", share: 16 },
      { topic: "법률 검토 자동화", share: 12 },
      { topic: "세일즈 세일즈 시퀀스", share: 9 },
      { topic: "공공데이터 분석", share: 7 },
    ],
    demographicKeywords: [
      {
        segment: "10대 · 여성 - 학습, SNS",
        keywords: ["문제 풀이", "창의적 글쓰기", "SNS 콘텐츠"],
      },
      {
        segment: "10대 · 남성 - 코딩, 게임",
        keywords: ["코딩 연습", "게임 스토리 작성", "수학 문제 풀이"],
      },
      {
        segment: "20대 · 여성 - 학습, 취업",
        keywords: ["스터디 요약", "영문 교정", "취업 자기소개서"],
      },
      {
        segment: "20대 · 남성 - 개발, 오픈소스",
        keywords: ["게임 개발", "알고리즘 문제 풀이", "오픈소스 기여"],
      },
      {
        segment: "30대 · 여성 - 프로젝트, 마케팅",
        keywords: ["프로젝트 관리", "마케팅 전략", "콘텐츠 기획"],
      },
      {
        segment: "30대 · 남성 - 업무 효율, 데이터",
        keywords: ["코드 리뷰", "테스트 자동화", "데이터 파이프라인"],
      },
    ],
  },
  metadata: {
    generatedAt: new Date().toISOString(),
    source: "샘플 데이터셋",
  },
};
