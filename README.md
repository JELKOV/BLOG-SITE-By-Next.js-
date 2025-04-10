
# 📘 Next.js 기반 Markdown 블로그 프로젝트

## 🔗 배포 주소  
👉 https://blog-site-by-next-js.vercel.app

## 📌 프로젝트 소개  
이 프로젝트는 Next.js Page Router 방식 기반의 정적 사이트 생성(SSG)과 **서버리스 API 라우트**를 모두 활용한 **풀스택 블로그 웹사이트**입니다.  
포스트는 Markdown 파일로 작성되며, MongoDB Atlas를 통해 사용자 메시지를 저장하고, Vercel을 통해 실제 배포까지 완료된 프로젝트입니다.


## 🧱 핵심 기능 요약  

| 구분 | 설명 |
|------|------|
| 홈페이지 | 소개(Hero) 및 추천 게시물(Featured Posts) 표시 |
| 전체 게시물 페이지 | Markdown 파일로 구성된 모든 포스트 목록 출력 |
| 게시물 상세 페이지 | 마크다운 본문 렌더링, 이미지 최적화, 코드 하이라이팅 |
| 문의 페이지 | 입력한 문의 내용을 MongoDB에 저장, Notification 피드백 제공 |
| 마크다운 처리 | 이미지 → Next.js `<Image />`, 코드 → react-syntax-highlighter로 최적화 |
| SEO 최적화 | 각 페이지별 `<Head>` 설정, HTML 구조 커스터마이징 |
| 환경변수 관리 | `.env.development`, `.env.production` 등 환경별로 구분, 배포시 Varcel 환경변수로 사용용|
| 배포 | Vercel 플랫폼을 통해 CI/CD 및 자동 재배포 처리 |

## 🛠 사용 기술 스택  

### Frontend
- Next.js (Page Router 방식)
- React 19
- Markdown + react-markdown
- CSS Modules

### Backend
- API Routes (Next.js 서버리스 함수)
- MongoDB Atlas

### 기타 도구
- Vercel (배포 및 CI/CD)
- gray-matter (Markdown 파싱)
- react-syntax-highlighter (코드 블록 하이라이팅)

## 📦 패키지 정보  

```json
{
  "next": "^15.2.4",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-markdown": "^10.1.0",
  "gray-matter": "^4.0.3",
  "mongodb": "^6.15.0",
  "react-syntax-highlighter": "^15.6.1"
}
```
## 🗂️ 주요 폴더 구조  

```
📦project-root
├── pages/
│   ├── index.js
│   ├── posts/
│   │   ├── index.js
│   │   └── [slug].js
│   ├── contact.js
│   └── api/
│       └── contact.js
├── components/
│   ├── home-page/
│   ├── posts/
│   ├── layout/
│   └── contact/
├── content/
│   └── posts/    ← 마크다운 게시물 저장
├── public/
│   └── images/   ← 이미지 최적화 폴더
├── lib/
│   └── posts-util.js
└── styles/
    └── globals.css
```
## 💡 주요 기능 설명  

### 마크다운 렌더링 커스터마이징
- `react-markdown`의 `components` 속성을 사용해 이미지, 코드 블록 렌더링 오버라이드  
- 이미지: `<Image />` 컴포넌트로 최적화 렌더링  
- 코드: `react-syntax-highlighter`로 하이라이트 + 불필요한 언어 제거로 빌드 최적화  

### API 라우트 및 DB 연동  
- `/api/contact`로 메시지 전송 시 MongoDB에 저장  
- 유효성 검사 (프론트 & 백엔드 모두) 
- 에러 핸들링 및 응답 메시지 처리 포함  
- 전송 성공/실패/로딩 상태를 Notification으로 알려줌  
- `.env` 파일을 통한 MongoDB URI 관리  

### 정적 사이트 생성 (Static Generation)  
- 마크다운 데이터를 사전에 읽어 `getStaticProps`, `getStaticPaths`를 통해 각 게시물 페이지 사전 생성  
- 빌드 타임에 콘텐츠를 불러오므로 빠른 렌더링 및 SEO 최적화 가능  
- 개별 게시물은 슬러그 기반으로 생성, 10분마다 자동 재생성 (ISR 적용)  


## ⚙️ 환경 변수 설정  

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
```

**Vercel 환경변수 설정**  
- Vercel 대시보드 → Environment Variables → `MONGODB_URI` 등록  
- MongoDB Atlas → Network Access에서 IP 화이트리스트(`0.0.0.0/0`) 허용도 필요  


## 🚀 배포 전략  

- GitHub 연동 → 커밋 시마다 자동 빌드/배포  
- Vercel 플랫폼 사용: Next.js 프로젝트에 최적화된 빌드/서버리스 처리  

## 🧪 실행 방법  

```bash
# 1. 레포 클론
git clone https://github.com/JELKOV/BLOG-SITE-By-Next.js-.git

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.local.development / .env.local.production 

# 4. 개발 서버 실행
npm run dev
```

## 🔗 관련 링크  

- 🔧 개발 상세 정리(Notion) 👉 [개발 회고 및 정리 문서](https://jelkov-developer.notion.site/Next-js-1c2c23f30734807e89f8e94882954c45?pvs=4)  
- 📁 GitHub Repository 👉 https://github.com/JELKOV/BLOG-SITE-By-Next.js-  
- 🌍 배포된 블로그 👉 https://blog-site-by-next-js.vercel.app
