# CLiCK Prompt Insight 대시보드

CLiCK 브랜드로 제공되는 정적 웹 대시보드입니다. 프롬프트 사용 현황, 개선 전/후 비교, 사용자 행동, 커뮤니티 트렌드, 데이터 내보내기까지 한 화면에서 확인할 수 있도록 구성했습니다. 로그인(모의) 흐름과 JSON/CSV 다운로드 예시도 포함되어 있어 실제 서비스로 확장하기 쉽습니다.

## 프로젝트 구조

```
Hackathon/
├── public/                # 배포 가능한 정적 자산
│   ├── index.html         # 메인 대시보드
│   ├── login.html         # 전용 로그인 페이지
│   └── assets/
│       └── css/
│           ├── styles.css # 대시보드 레이아웃 & 컴포넌트
│           └── auth.css   # 로그인 페이지 전용 스타일
└── src/
    ├── app.js             # 진입점: 렌더링 & 이벤트 초기화
    ├── auth/
    │   └── login-page.js  # 로그인 페이지 폼 이벤트 처리
    ├── data/
    │   └── dashboard-data.js # 샘플 분석 데이터
    ├── renderers/         # 섹션별 DOM 렌더링 로직
    ├── server/            # 목업 서버 시뮬레이터
    ├── services/          # 내보내기, 인증, 상태 관리 등 기능성 모듈
    └── utils/             # 포맷터, 데이터 헬퍼
```

## 실행 방법

Chart.js(UMD CDN)를 활용해 주요 지표를 시각화합니다. 별도 빌드 과정은 없으며 정적 자산만 제공합니다.

1. **파일 직접 열기**  
   `public/index.html` 파일을 더블 클릭하거나 브라우저의 `파일 → 파일 열기`로 로딩합니다.
2. **로컬 서버 사용 (권장)**  
   ```bash
   cd /Users/park-incheol/Hackathon
   python -m http.server 3000
   ```
   이후 `http://localhost:3000/public/index.html`에 접속하면 모듈 스크립트가 정상 작동합니다.

## 주요 구성 요소

- `src/data/dashboard-data.js`  
  샘플 통계가 담긴 JSON 형태의 데이터입니다. 실제 서비스 연동 시 API 호출 결과나 데이터 파일과 교체하면 됩니다.

- `src/utils/chart-manager.js`  
  Chart.js 인스턴스를 생성/파괴하면서 메모리를 관리합니다. 섹션 렌더링 시 캔버스를 다시 사용할 수 있습니다.

- `src/services/auth.js` & `src/server/mock-auth-server.js`  
  로그인 요청을 처리하는 샘플 로직을 포함합니다. 실제 서비스와 연동할 때는 `loginUser` 안의 fetch 구문과 토큰 처리 부분을 교체하고, `mockAuthServer` 대신 백엔드 엔드포인트를 호출하세요.

- `src/server/mock-export-server.js`  
  JSON/CSV 내보내기 요청을 받아 인증 토큰을 검증하고, 응답 본문/로그를 생성합니다. 실제 서버 측 다운로드 API를 작성할 때의 참고 예시입니다.

- `src/services/auth-state.js`  
  브라우저 `localStorage`에 인증 토큰과 사용자 정보를 저장/조회/삭제하는 헬퍼입니다. 로그인을 유지하거나 로그아웃 시 상태를 정리합니다.

- `src/auth/login-page.js`  
  로그인 페이지에서 폼 제출을 처리하고, 요청/응답/서버 로그를 시각화합니다.

- `src/renderers/*`  
  각 섹션별 렌더링 로직입니다. `personal`, `behavior`, `community` 모듈은 Chart.js를 사용해 막대·라인·도넛 차트를 그립니다. 나머지는 리스트와 카드 UI를 활용합니다.

- `src/services/exporters.js`  
  대시보드 데이터를 JSON/CSV로 변환해 클라이언트에서 바로 다운로드합니다.

- `src/services/events.js`  
  대시보드 상단 버튼(새로고침, 내보내기, 로그인 페이지 이동)을 이벤트 리스너에 연결합니다.

## 데이터 연동 가이드

- 백엔드 API 또는 다른 데이터 소스와 연결할 때는 `dashboardData` 객체를 비동기 호출로 대체하거나, `renderDashboard` 호출 전에 데이터를 주입하면 됩니다.
- 섹션 추가나 레이아웃 조정이 필요하면 `src/renderers` 디렉터리에 새 모듈을 추가하고 `renderers/dashboard.js`에서 호출만 등록하면 됩니다.
- 추가적인 필터 UI, 차트 라이브러리(Chart.js, ECharts 등) 통합도 동일한 구조를 유지하면서 확장할 수 있습니다.
  - Chart.js 옵션은 각 렌더러 파일에 정의되어 있으므로 색상/툴팁/축 설정을 쉽게 커스터마이징할 수 있습니다.
- 로그인 기능을 실제 API와 연결하려면 `src/services/auth.js`의 `loginUser` 함수와 `src/auth/login-page.js`의 주석 위치에 맞춰 fetch/토큰 처리 로직 및 리다이렉션을 수정하세요. `src/services/auth-state.js`를 사용하면 토큰을 원하는 저장소(localStorage, secure cookie 등)로 손쉽게 교체할 수 있습니다.
- JSON/CSV 내보내기는 `src/services/exporters.js`에서 인증 토큰과 함께 서버에 요청을 보냅니다. 실제 백엔드에서는 해당 토큰을 검증한 뒤 `mockExportServer` 예시처럼 파일 스트림을 반환하면 됩니다.