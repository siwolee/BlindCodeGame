# BlindCodeGame

**A coding contest platform where the screen is hidden**  
화면이 보이지 않는 상태에서 진행하는 코딩 대회 플랫폼

---

## Overview / 프로젝트 개요

A web platform built to run a blind coding contest at 42Seoul.  
Participants write and submit code without being able to see the screen.  
Built and used in an actual in-house event.

42Seoul 내 블라인드 코딩 대회 운영을 위해 직접 제작한 웹 플랫폼입니다.  
참가자는 화면이 보이지 않는 상태에서 코드를 작성하고 제출합니다.  
실제 커뮤니티 이벤트에서 사용되었습니다.

---

### Page Layout / 페이지 레이아웃
- Start Page 시작 페이지
  ![K-002](https://github.com/user-attachments/assets/c3877dc1-3384-4ef1-9ab9-e6b4bb7cc864)

- Game page 게임 페이지
 ![K-004](https://github.com/user-attachments/assets/17f25933-29ff-4c5e-9532-e5fe2d871a2f)

- Admin Page 어드민 페이지
 ![K-005](https://github.com/user-attachments/assets/aa9a4d29-472f-4420-b9e1-6cc7e8052934)

---


## Features / 주요 기능

**Participant / 참가자**
- Enter IntraId to start the game / IntraId 입력 후 게임 시작
- View all problems / 전체 문제 조회
- Submit code and receive compile result / 코드 제출 및 컴파일 결과 수신
- End game session / 게임 종료

**Admin / 관리자**
- Register problems and test cases / 문제 및 테스트 케이스 등록
- Start and end game / 게임 시작 및 종료
- Access via secret code / 비밀코드로 관리자 접근

---

## API / API 명세

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/game/start` | Start game — `{ intraId: string }` → `{ start: bool }` |
| GET | `/problems` | Get all problems — `{ name, description }[]` |
| POST | `/problems/submit` | Submit code — `{ name, code }` → `{ result: string, success: bool }` |
| POST | `/game/end` | End game |

---

## Tech Stack / 기술 스택

| Part | Stack |
|------|-------|
| Frontend | React, Next.js |

---

## Role / 담당 역할

Solo developer / 단독 개발  
Planning, design, and full implementation / 기획, 디자인, 개발 전체

---

## Note / 참고

No login system — participants identify via IntraId.  
로그인 기능 없음 — IntraId로 참가자 식별.

