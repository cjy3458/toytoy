const baseUrl = "http://ll11th-toy-project.p-e.kr:8000/";

const getGuestbookList = () => {
  const guestbookContainer = document.getElementById("guestbookContainer");
  guestbookContainer.innerHTML = "";

  axios
    .get(baseUrl)
    .then((response) => {
      console.log("방명록 리스트 조회 성공:", response.data);

      const data = response.data.data; // 받아온 정보 안에 data 안에 data에 배열로 입력한 값들이 저장!

      data.reverse().forEach((datas) => {
        const list = document.createElement("div");
        list.id = datas.visit_id;
        list.classList.add("guestbook-item");

        const writer = document.createElement("p");
        writer.textContent = `이름❤️: ${datas.writer}`;

        const content = document.createElement("p");
        content.textContent = `편지💌: ${datas.content}`;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delBtn");
        deleteButton.textContent = "삭제하기";
        deleteButton.addEventListener("click", () => {
          deleteGuestbook(datas.visit_id);
        });

        list.appendChild(writer);
        list.appendChild(content);
        list.appendChild(deleteButton);

        guestbookContainer.appendChild(list);
        guestbookContainer.appendChild(document.createElement("br"));
      });
    })
    .catch((error) => {
      console.log("방명록 조회 오류:", error);
    });
};

const guestbookForm = document.getElementById("guestbookForm");

guestbookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const writerInput = document.getElementById("writer");
  const contentInput = document.getElementById("content");

  const guestbookData = {
    writer: writerInput.value,
    content: contentInput.value,
  };

  axios
    .post(`${baseUrl}`, guestbookData)
    .then((response) => {
      console.log("방명록 작성 성공:", response.data);
      writerInput.value = "";
      contentInput.value = "";
      getGuestbookList();
    })
    .catch((error) => {
      console.log("방명록 작성 오류:", error);
    });
});

// 방명록 삭제

//현재는 delete요청을 했을 때 조회 함수를 콜하는데 요청 성공하면 remove element를 하는 것으로 바꿔야해
const deleteGuestbook = (id) => {
  const confirmation = confirm("😭삭제할거에요...?😭");

  if (confirmation) {
    axios
      .delete(`${baseUrl}${id}`, {
        data: {},
      })
      .then((response) => {
        console.log("방명록 삭제 성공:", response.data);
        const listElement = document.getElementById(id);
        if (listElement) {
          listElement.remove();
        }
        alert("삭제완료ㅠㅠ");
        getGuestbookList();
      })
      .catch((error) => {
        console.log("방명록 삭제 오류:", error);
      });
  }
};
