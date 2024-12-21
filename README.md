# WorldWise - You travel the world.
WorldWise는 React 기반의 여행 추적 애플리케이션으로, 세계 여행을 쉽고 효율적으로 관리하고 기록할 수 있도록 설계되었습니다. 직관적인 인터페이스와 다양한 기능을 결합하여 방문한 국가, 도시 목록, 여행 정보 및 메모를 체계적으로 관리할 수 있습니다.

## 주요 기능
### 1.인터랙티브 지도 통합
- 사용자는 인터랙티브 세계 지도를 사용해 자신의 여행 경로를 시각적으로 추적할 수 있습니다.
- 방문한 장소에 마커를 추가하거나 미래 여행지를 계획할 수 있습니다.

### 2.여행 통계
- 방문한 국가 수, 도시 목록, 여행 장점 및 특정 도시와 관련된 메모와 정보 링크를 표시합니다.

### 맞춤형 여행 기록
- 사용자가 여행의 세부 정보를 기록할 수 있습니다(예: 날짜, 목적지, 여행 메모).

### 반응형 디자인
- 데스크톱 및 모바일 기기에서 원활하게 작동하며 부드러운 사용자 경험을 제공합니다.

### 효율적인 상태 관리
- <code>feature/v-1.0.0</code>: 이 버전에서는 주로 Context API를 사용해 상태를 관리했습니다.
- <code>feature/v-2.0.0</code>: 이 버전에서는 ReactQuery/TanStack을 사용해 모든 UI 상태를 원격 상태로 전환했으며, 일부 글로벌 UI 상태를 관리하기 위해 React Redux Toolkit을 도입했습니다.

## 사용 기술
- <b>프론트엔드:</b> React,Vite,React Leaflet,React Router DOM, Date Picker,React Toast,JavaScript,HTML,CSS 모듈
- <b>지도 도구:</b> Leaflet.js를 사용한 인터랙티브 지도 구현
- <b>상태 관리:</b> Context API 및 Redux/Toolkit를 활용해 애플리케이션 상태 관리
- <b>데이터 저장:</b>
  - <code>feature/v-1.0.0</code>: 지속적인 데이터를 위해 로컬 저장소 또는 JSON 서버 사용
  - <code>feature/v-2.0.0</code>: MongoDB를 사용하여 비정형 데이터를 처리 사용

## 개인 기여 사항
### 1.향상된 반응형 디자인
- 태블릿과 소형 모바일 기기를 포함한 모든 화면 크기에서 최적화된 경험을 제공하도록 앱의 반응형 디자인을 개선했습니다.
- 다양한 디바이스에서 더 나은 사용성을 위해 레이아웃을 테스트하고 수정했습니다.
- <code>feature/v-1.0.0</code> 및 <code>feature/v-2.0.0</code> 브랜치를 통해 확인할 수 있습니다.

### 2.백엔드 통합
- 사용자 데이터 및 여행 기록 관리를 위해 Node.js와 Express.js를 사용하여 백엔드를 개발하고 통합했습니다.
- MongoDB를 사용하여 여행 세부 정보와 통계를 지속적으로 저장할 수 있는 데이터베이스를 구현했습니다.
- 개인 계정과 안전한 데이터 관리를 위해 Bcrypt.js 및 JSONwebtoken을 활용한 사용자 인증 및 권한 부여를 추가했습니다.
- ReactQuery/TanStack을 사용해 원격 상태를 관리했으며, UI 글로벌 상태 관리를 위해 React Redux Toolkit을 사용했습니다.

## 얻은 성과와 배운 점:
성과:
### 1.지도 데이터 시각화 구현
- GeoJSON 및 지도 라이브러리 Leaflet.js 활용하여 인터랙티브 지도 시각화를 성공적으로 구현.
- 사용자가 방문한 국가와 도시를 직관적으로 보여주는 기능으로 사용자 만족도를 크게 향상.

### 데이터 처리 및 분석 기술 강화
- MongoDB를 활용하여 사용자 데이터(방문 국가, 도시, 여행 기록 등)를 효율적으로 저장하고 검색.
- 여행 통계(방문 국가 수, 거리, 여행 일수,개인 노트 등)를 계산하고 시각적으로 표현하여 데이터 분석 역량 강화.

### 반응형 디자인
- CSS Module 및 React를 사용해 반응형 UI를 개인적으로 구현하여 다양한 디바이스에서 최적의 사용자 경험 제공
  
배운 점:
### 1.풀스택 개발 과정에 대한 종합적 이해
- 프론트엔드와 백엔드의 역할과 상호작용을 깊이 이해하며, 클라이언트-서버 구조의 중요성을 학습.
- RESTful API 설계 및 상태 관리를 통해 데이터의 일관성과 신뢰성을 유지하는 방법 습득.

### 2.지도 기반 데이터 시각화
- GeoJSON 형식의 데이터를 활용하여 지도 상에 사용자 정보를 시각화하는 기술을 배움.
- 지도 라이브러리의 활용법과 지도 상의 데이터 렌더링 최적화 기법 학습.

### 3.데이터 저장 및 검색 최적화
- MongoDB에서 복잡한 쿼리와 인덱싱을 사용하여 대규모 데이터를 효율적으로 관리하고 검색하는 방법 습득.
- 데이터 모델링을 통해 사용자 데이터를 체계적으로 관리하는 기술 향상.

### 4.사용자 경험 개선
- 직관적이고 반응형인 UI/UX 설계를 통해 다양한 사용자 환경에 적합한 인터페이스 설계 기술을 여러 번 업그래이트 하면서 경험 한 것.

### 5.문제 해결 및 디버깅 역량 강화
- 프로젝트 진행 중 발생한 데이터 동기화 및 성능 이슈를 해결하며 디버깅 기술 향상.
  
## 브랜치별 버전
### 1.<code>feature/v-1.0.0</code>
- 이 프로젝트는 Jonas Schmedtmann의 Udemy 강좌, The Ultimate React Course를 기반으로 학습 및 개선 목적으로 개발되었습니다.
- 해당 강좌에서는 프론트엔드만 개발되었으며, 이를 <code>feature/v-1.0.0</code> 브랜치에서 확인할 수 있습니다.
- 버전 1은 백엔드가 포함되지 않았으며, 개인 기여 사항인 반응형 디자인이 포함되었습니다.

### 2.<code>feature/v-2.0.0</code>
- 버전 2에서는 백엔드 통합이 시작되었으며, 주요 기능은 ReactQuery/TanStack과 React Redux Toolkit을 사용해 글로벌 상태를 관리하는 것입니다.

## UI Screenshots

## Errors:
### 1.React Query States are Frist render undefined 

This is my custom hook. Here data is initially undefined.
```javascript
export function useCities2() {
  const {
    isLoading,
    data, ///data is initially undefined.
    error,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    refetchOnMount: true,
  });
  console.log(data);

  return { isLoading, error, data };
}
```
So if we want to use like
```javascript
  const { data } = useCities2(); // Frist render data undefined so error is occoured 
  const { cities } = data; //
```
>[!TIP]
>Solution:
```javascript
const {
    isLoading,
    data = {},
    error,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    refetchOnMount: true,
  });
```

## 향후 계획
### 1추가 기능
- 연도, 국가 또는 여행 유형별로 여행을 필터링하는 고급 필터링 옵션 추가
- 방문 장소의 히트맵과 같은 여행 행동 분석 기능 추가
- AWS EC3를 통합해 백엔드 신뢰성, 확장성 및 가상 네트워크 환경 개선

## 기대 효과 및 자기 성장
- 여행 기록 및 시각화를 제공하는 실용적인 앱 개발을 통해 실무와 유사한 경험을 축적.
- 데이터를 기반으로 사용자 경험을 향상시키는 기법을 습득하며, 개발자로서의 자신감을 얻음.
- 사용자의 니즈를 파악하고 이를 기술로 구현하는 역량 강화.
