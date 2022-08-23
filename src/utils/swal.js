import Swal from "sweetalert2";

export const successAlert = () => {
  return Swal.fire({ icon: "success", title: "글쓰기 성공", confirmButtonText: "홈으로 이동" });
};
