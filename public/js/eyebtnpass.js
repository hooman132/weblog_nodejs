document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("inputPassword");
  const togglerePassword = document.getElementById("togglerePassword");
  const repasswordInput = document.getElementById("inputrePassword");

  if (togglerePassword && repasswordInput) {
    togglerePassword.addEventListener("click", function () {
      // تغییر نوع ورودی
      const type =
        repasswordInput.getAttribute("type") === "password"
          ? "text"
          : "password";
      repasswordInput.setAttribute("type", type);

      // تغییر آیکون چشم
      this.querySelector("i").classList.toggle("fa-eye");
      this.querySelector("i").classList.toggle("fa-eye-slash");
    });
  } else {
    console.error("المان‌های مربوط به رمز عبور پیدا نشدند.");
  }

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      // تغییر نوع ورودی
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // تغییر آیکون چشم
      this.querySelector("i").classList.toggle("fa-eye");
      this.querySelector("i").classList.toggle("fa-eye-slash");
    });
  } else {
    console.error("المان‌های مربوط به رمز عبور پیدا نشدند.");
  }
});
