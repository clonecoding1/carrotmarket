import Swal from "sweetalert2";

export const successAlert = (message) => {
  return Swal.fire({ icon: "success", title: message, confirmButtonText: "홈으로 이동" });
};

export const errorAlert = () => {
  return Swal.fire({ icon: "error", title: "글쓰기 실패", confirmButtonText: "홈으로 이동" });
};

export const nonePageAlert = () => {
  return Swal.fire({ icon: "info", title: "구현중인 기능입니다!", confirmButtonText: "확인" });
};
