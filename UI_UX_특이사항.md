# 프리미엄 인테리어 사이트 UI/UX 특이사항 및 구현 가이드

이 문서는 `ilsangmodu_interior_site`에서 사용된 주요 UI 효과와 고급 시각 기술들을 정리한 가이드입니다. 다른 프로젝트에 동일한 감성을 반영할 때 참고하세요.

## 1. 디자인 시스템 & 기반 기술
- **Typography (Pretendard)**: 한글과 영문 모두 세련되게 표현되는 Pretendard 폰트를 기반으로 합니다.
- **Tailwind CSS (CDN/JIT)**: 별도의 복잡한 빌드 설정 없이도 `cdn.tailwindcss.com`을 활용해 고수준의 스타일링을 빠르게 구현했습니다.
- **Color Palette**: `neutral-900` (Main BG), `white`, `black`을 사용한 무채색 기반의 미니멀리즘을 유지합니다.

## 2. 주요 시각 효과 (Visual Effects)

### 2.1 글래스모피즘 (Glassmorphism)
- **효과**: 요소 뒤쪽이 흐릿하게 비치는 고급스러운 투명도 효과.
- **구현**: `backdrop-blur-md` 또는 `backdrop-blur-sm` 클래스 사용.
- **활용**: 네비게이션 바(스크롤 시), 히어로 섹션의 배지 포인트 등.

### 2.2 타이포그래피 블렌드 모드 (Mix Blend Mode)
- **효과**: 텍스트가 배경 이미지의 색상과 자연스럽게 겹치는 중첩 효과.
- **구현**: `mix-blend-overlay` 클래스. 히어로 섹션의 거대한 타이틀에 적용하여 이미지 위에 텍스트가 녹아든 느낌을 줌.

### 2.3 이미지 호버 인터랙션
- **그레이스케일 토글**: 평상시 `grayscale` 상태에서 호버 시 `grayscale-0`으로 색상이 돌아오는 연출.
- **부드러운 확대**: `group-hover:scale-105 transition-transform duration-700`을 통해 이미지가 서서히 커지는 효과.

## 3. 핵심 인터랙션 (Interactions)

### 3.1 스크롤 스파이 (Scroll-Spy) & 내비게이션
- **Intersection Observer**: `App.tsx`에서 `IntersectionObserver`를 사용해 현재 사용자가 보고 있는 섹션을 실시간으로 감지합니다.
- **상태 변화**: `window.scrollY`에 따라 네비게이션 바가 투명에서 반투명 블러 상태로 전환됩니다.
- **밑줄 애니메이션**: `scale-x-0`에서 `scale-x-100`으로, `origin-left`를 지정해 왼쪽에서 오른쪽으로 선이 자라나는 애니메이션.

### 3.2 히어로 섹션 애니메이션
- **무한 회전**: 배경의 장식용 원형 라인에 `animate-[spin_60s_linear_infinite]`를 적용하여 은은한 움직임 부여.
- **커스텀 버튼**: 배경색이 왼쪽에서 오른쪽으로 채워지는 효과 (`transform scale-x-0 group-hover:scale-x-100 origin-left`).

### 3.3 스크롤 유도 인디케이터
- 히어로 하단의 수직선 애니메이션. 막대 내부의 흰 선이 상단에서 하단으로 흐르듯 움직이는 연출(`animate-dropdown`).

## 4. 커스텀 스크롤바
`index.html` 내부에 직접 스타일링하여 브라우저 기본 스크롤바보다 얇고 어두운 톤으로 일체감을 줍니다.

```css
::-webkit-scrollbar { width: 8px; background: #171717; }
::-webkit-scrollbar-thumb { background: #404040; border-radius: 4px; }
```
