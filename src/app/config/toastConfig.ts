const toastBaseConfig = {
  timeOut: 3000,
  progressBar: true,
  closeButton: true,
  newestOnTop: true,
  positionClass: 'toast-top-right',
};

const successConfig = {
  ...toastBaseConfig,
  toastClass: 'ngx-toastr !bg-primary',
};

const errorConfig = {
  ...toastBaseConfig,
  timeOut: 8000,
  toastClass: 'ngx-toastr !bg-danger',
};

export const toastConfig = {
  successConfig,
  errorConfig,
};
