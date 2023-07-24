// form id값을 가져와서 notice_write_list 에다가 저장
const notice_write_list = document.getElementById("write-form");

// 이벤트 발생할때 동작할 함수
const handleSubmitForm = async (event) => {
  event.preventDefault(); //콘솔에서 한번 출력되고 사라지는 것을 방지
  // try catch 문을 이용해서 에러면 이동되게끔 만들어줌
  const body = new FormData(notice_write_list);
  body.append("insertAt", new Date().getTime());

  try {
    const res = await fetch("/why", {
      method: "POST",
      body: body, //form 데이터 형식으로 보내줘야 함
    });

    const data = await res.json();
    if (data == "200") window.location.pathname = "/"; //데이터가 잘 보내지면, 루트페이지로 이동
  } catch (e) {
    console.error("에러입니다.");
  }
};
// submit될때 이벤트 발생면, handleSubbitform을 하겠다.
notice_write_list.addEventListener("submit", handleSubmitForm);
