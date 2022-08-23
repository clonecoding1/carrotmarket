import Swal from "sweetalert2";

export const successAlert = () => {
  return Swal.fire({ icon: "success", title: "글쓰기 성공", confirmButtonText: "홈으로 이동" });
};

export const errorAlert = () => {
  return Swal.fire({ icon: "error", title: "글쓰기 실패", confirmButtonText: "홈으로 이동" });
};
