import Swal from "sweetalert2";

export const successAlert = (message) => {
  return Swal.fire({ icon: "success", title: message, confirmButtonText: "홈으로 이동" });
};

export const errorAlert = (message) => {
  return Swal.fire({ icon: "error", title: message, confirmButtonText: "확인" });
};

export const nonePageAlert = () => {
  return Swal.fire({ icon: "info", title: "구현중인 기능입니다!", confirmButtonText: "확인" });
};

export const passwordCheckAlert = (message) => {
  return Swal.fire({
    input: "password",
    inputPlaceholder: "비밀번호",
    icon: "warning",
    title: `비밀번호를 입력해주세요.`,
    confirmButtonText: `${message}`,
    cancelButtonText: "취소",
    showCancelButton: true,
  });
};

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const maxLengthOverAlert = (message) => {
  return Toast.fire({ icon: "warning", title: message });
};

export const likeAlert = (message) => {
  return Toast.fire({ icon: "success", title: message });
};
