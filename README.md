# 이따 (Idda) : 이불 밖은 따뜻해


## 서비스 한 줄 소개
고립·은둔 청년이 단계별 미션을 수행하며 외출을 유도하고, 사회 복귀를 돕는 맞춤형 서비스


## 구현 범위 및 시연 안내

- 본 서비스는 **웹 애플리케이션(Web App)** 으로 구현되었으며, **시연 목적**에 맞춰 일부 기능이 단순화되어 있습니다.
- 고립·은둔 단계 테스트를 위한 **온보딩 페이지는 구현하지 않았습니다.**
- 원활한 시연 진행을 위해 **로그인 기능은 제외**하고, `user_id = 1`로 고정된 상태에서 구현하였습니다.


## 프로젝트 구조

주요 폴더 및 파일 구조는 아래와 같습니다.

- **public/** : 정적 파일 (파비콘, og-image, 폰트 등)
- **src/**
    - **assets/** : 공용 이미지 및 아이콘
    - **components/** : 재사용 가능한 공용 UI 컴포넌트
    - **features/** : 기능 단위 모듈화된 컴포넌트
    - **mocks/** : Mock 데이터
    - **pages/** : 페이지 단위 UI
    - **styles/** : 전역 스타일 및 CSS
    - **App.jsx** : 최상위 App 컴포넌트
    - **Router.jsx** : 라우팅 설정
- **vercel.json** : Vercel 배포 설정
- **vite.config.js** : Vite 빌드 설정


## 기술 스택

| 구분 | 내용 |
| --- | --- |
| Library | **React** |
| Programming Language | **JavaScript** |
| Styling | **Styled-components** |
| Data Fetching | **Axios** |
| Package Manager | **Yarn** |
| Deployment | **Vercel** |
