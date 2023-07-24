{
  /* <div class="notice-line" alt="">
        <li class="notice-line 01" alt="">
          <img src="assets/notice-line.svg" />
        </li> */
}

//작성한 notice들을 보여주는 js 파일
//데이터들을 렌더 해주기
const renderData = (data) => {
  const main = document.querySelector("main"); // main화면으로 넘겨줌(const main이라는 변수에 html id값 넘겨받음)

  data.forEach((obj) => {
    //목록 리스트
    const noticelistDiv = document.createElement("div");
    noticelistDiv.className = "notice-list";

    //노티스 no
    const noticelistNoDiv = document.createElement("span");
    noticelistNoDiv.className = "notice-number";
    noticelistNoDiv.innerText = obj.id;

    //노티스 title
    const noticeTitleDiv = document.createElement("span");
    noticeTitleDiv.className = "notice-title";
    noticeTitleDiv.innerText = obj.title;

    // 아이템 이미지
    const noticeListimageDiv = document.createElement("div");
    noticeListimageDiv.className = "notice-line-img";

    const img = document.createElement("img");
    img.src = "assets/notice-line.svg";
    noticeListimageDiv.appendChild(img);
    noticelistDiv.appendChild(noticelistNoDiv);
    noticelistDiv.appendChild(noticeTitleDiv);
    noticelistDiv.appendChild(noticeListimageDiv);

    // 여기다가 그걸 넣어줘야함. 만약에

    main.appendChild(noticelistDiv);
  });
};

// 서버로 부터 데이터 받기
const fetchList = async () => {
  const res = await fetch("/why");
  const data = await res.json();
  renderData(data); //받아온 데이터를 렌더함수에 데이터로 넘겨줌
};

fetchList();
