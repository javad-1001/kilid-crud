window.baseApi = "http://dev2.shahrnik.com/";

window.version = "1.0";

window.App_Title = "نام برنامه";
///////////////////////////////////////////
document.getElementById("title").innerHTML = window.App_Title;

if (localStorage.getItem("98caa670ad816b5635981ff2f0819cf8"))
  window.App_Title = localStorage.getItem("98caa670ad816b5635981ff2f0819cf8");
