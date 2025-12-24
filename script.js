(function(){
  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // ===== Archive search + filter =====
  var search = document.getElementById("search");
  var grid   = document.getElementById("grid");
  var pills  = Array.prototype.slice.call(document.querySelectorAll(".pill"));

  function apply() {
    if (!grid) return;
    var q = (search && search.value ? search.value : "").toLowerCase();
    var active = document.querySelector(".pill.is-active");
    var f = active ? active.getAttribute("data-filter") : "all";

    Array.prototype.forEach.call(grid.querySelectorAll(".tile"), function (tile) {
      var title = (tile.getAttribute("data-title") || "").toLowerCase();
      var tags  = (tile.getAttribute("data-tags")  || "").toLowerCase();
      var matchesText   = !q || title.indexOf(q) > -1 || tags.indexOf(q) > -1;
      var matchesFilter = (f === "all") || (tags.indexOf(f) > -1);
      tile.style.display = (matchesText && matchesFilter) ? "" : "none";
    });
  }

  if (search) search.addEventListener("input", apply);
  if (pills.length) {
    pills.forEach(function(p){
      p.addEventListener("click", function(){
        pills.forEach(function(x){ x.classList.remove("is-active"); });
        p.classList.add("is-active");
        apply();
      });
    });
  }
  apply();

  // ===== Subscribe (posts to Google Form via hidden iframe; no redirect) =====
  var form = document.getElementById("subscribeForm") || document.querySelector("form.form");
  if (form) {
    var iframe = document.getElementById("hidden_iframe");
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.name = "hidden_iframe";
      iframe.id = "hidden_iframe";
      iframe.style.display = "none";
      document.body.appendChild(iframe);
    }
    form.setAttribute("target", "hidden_iframe");

    var btn = document.getElementById("submitBtn") || form.querySelector('button[type="submit"], .btn');
    var ok  = document.getElementById("ok");
    var err = document.getElementById("err");

    // Make a non-submit button submit the form
    if (btn && (btn.getAttribute("type") || "").toLowerCase() !== "submit") {
      btn.addEventListener("click", function(){
        if (ok) ok.style.display = "none";
        if (err) err.style.display = "none";
        if (form.requestSubmit) form.requestSubmit(); else form.submit();
      });
    }

    form.addEventListener("submit", function(){
      window.__submitting = true;
      if (ok) ok.style.display = "none";
      if (err) err.style.display = "none";
      if (btn) { btn.disabled = true; btn.textContent = "Authorising…"; }
    });

    iframe.addEventListener("load", function(){
      if (window.__submitting) {
        window.__submitting = false;
        if (ok)  { ok.textContent = "ACCESS GRANTED. Check your inbox."; ok.style.display = "block"; }
        if (btn) { btn.textContent = "Access Granted"; btn.disabled = true; }
      }
    });
  }
})();
