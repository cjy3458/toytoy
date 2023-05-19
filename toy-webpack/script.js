// import axios from "./node_modules/axios/dist/esm/axios.min.js";

const baseUrl =
  "https://apis.data.go.kr/B551011/PhotoGalleryService1/galleryList1?numOfRows=1&pageNo=1&MobileOS=ETC&MobileApp=forsession&arrange=A&_type=json&serviceKey=Y1o7YxBzN3Vms4qwhgqqsrn3Ywm3Kq%2BqghKESznXDl3GCeQZE4HVxslyRidtWUnbU9KKl8ZFo9%2FH56IlENuFeg%3D%3D";

// 방명록 작성

/*const baseUrl = "http://toyproject.kro.kr:8000/guestbook/";

getGuestbookList = () => {
  const response = axios.get(`${baseUrl}`)
    .then((response) => {
      console.log("방명록 리스트 조회 성공:", response.data);

      const data = response.data.result;

      data.map((datas, i) => {
        const list = document.createElement('div');
        list.id='list';
  
        const text = document.createElement('span');
        text.innerText=`
        작성자: ${datas.writer}
        내용: ${datas.content}`
  
        const guestbookForm = document.getElementById('guestbookForm');
        guestbookForm.appendChild(list);
        list.appendChild(text);
        i++;???
      })

      })

    .catch((error) => {console.log("방명록 조회 오류:", error);
    });
};*/

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
    })
    .catch((error) => {
      console.log("방명록 작성 오류:", error);
    });
});

// 방명록 리스트 조회
const guestbookContainer = document.createElement("div");
guestbookContainer.id = "guestbookContainer";

const renderGuestbook = (guestbookList) => {
  guestbookContainer.innerHTML = ""; // 수정된 부분

  guestbookList.forEach((guestbook) => {
    const guestbookItem = document.createElement("div");
    guestbookItem.classList.add("guestbook-item");

    const writer = document.createElement("p");
    writer.textContent = `작성자: ${guestbook.writer}`;

    const content = document.createElement("p");
    content.textContent = `내용: ${guestbook.content}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제하기";
    deleteButton.addEventListener("click", () => {
      deleteGuestbook(guestbook.id);
    });

    guestbookItem.appendChild(writer);
    guestbookItem.appendChild(content);
    guestbookItem.appendChild(deleteButton);

    guestbookContainer.appendChild(guestbookItem);
  });
};

document.body.appendChild(guestbookContainer); // 추가된 부분

const getGuestbookList = () => {
  axios
    .get(`${baseUrl}`)
    .then((response) => {
      console.log("방명록 리스트 조회 성공:", response.data);
      renderGuestbook(response.data);
    })
    .catch((err) => {
      console.error("방명록 리스트 조회 오류:", err);
    });
};

// getGuestbookList();

// 방명록 삭제
const deleteGuestbook = (guestbookId) => {
  axios
    .delete(`${baseUrl}/${guestbookId}`)
    .then((response) => {
      console.log("방명록 삭제 성공:", response.data);
      getGuestbookList(); // 삭제 후 방명록 리스트 다시 조회
    })
    .catch((error) => {
      console.error("방명록 삭제 오류:", error);
    });
};
