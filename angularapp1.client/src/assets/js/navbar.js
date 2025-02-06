const mobileScreen = window.matchMedia("(max-width: 990px)");

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".dashboard-nav-dropdown-toggle").forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      const parentDropdown = toggle.closest(".dashboard-nav-dropdown");

      parentDropdown.classList.toggle("show");

      parentDropdown.querySelectorAll(".dashboard-nav-dropdown").forEach(function (nestedDropdown) {
        nestedDropdown.classList.remove("show");
      });

      toggle.parentElement.parentElement.querySelectorAll(":scope > *").forEach(function (sibling) {
        if (sibling !== toggle.parentElement) {
          sibling.classList.remove("show");
        }
      });
    });
  });

  document.querySelectorAll(".menu-toggle").forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      if (mobileScreen.matches) {
        document.querySelector(".dashboard-nav").classList.toggle("mobile-show");
      } else {
        document.querySelector(".dashboard").classList.toggle("dashboard-compact");
      }
    });
  });
});
