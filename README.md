# BlindCodeGame
눈 가리고 코드 짜기 대회
---
### 구상 페이지
- 시작 페이지
  ![K-002](https://github.com/user-attachments/assets/c3877dc1-3384-4ef1-9ab9-e6b4bb7cc864)

- 게임 페이지
 ![K-004](https://github.com/user-attachments/assets/17f25933-29ff-4c5e-9532-e5fe2d871a2f)

- 어드민 페이지
 ![K-005](https://github.com/user-attachments/assets/aa9a4d29-472f-4420-b9e1-6cc7e8052934)

---

### 문제
HELLO WORLD\n 출력
ft_strlen
ft_putchar
argc argv 받아서 출력하기

### API

- 로그인 기능 없음

- 시작하면 IntraId 입력 후 진행

게임 시작 POST
REQ
  intraId : string
RES
  start : bool

문제 전체 조회 GET
RES
{
  {
    문제 이름
    문제 설명
  },
  ..
}

문제 제출 POST
{
  문제 이름
  코드
}
RES
{
    컴파일 결과 : string
    성공 유무 : bool
}

게임 종료 POST

admin : intraId에 비밀코드를 입력
문제 등록
테스트 케이스 등록
게임 시작
게임 종료
