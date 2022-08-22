import Swal from "sweetalert2";

export const test2 = () => {
  return Swal.fire({
    icon: "question",
    text: "스윗버튼",
    showCancelButton: true,
    cancelButtonText: "아뇨뚱인데요",
    confirmButtonText: "스펀지밥",
  });
};

export const successAlert = () => {
  return Swal.fire({ icon: "success", title: "글쓰기 성공", confirmButtonText: "홈으로 이동" });
};
