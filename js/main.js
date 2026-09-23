(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  // Solid nav background once the hero has scrolled past.
  const nav = document.getElementById("nav");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle.
  const navToggle = document.getElementById("navToggle");
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
  document.querySelectorAll(".nav-mobile a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });

  // Waitlist signup — posts to the real backend (see js/config.js for the
  // API base URL). No mock success state: the message shown always
  // reflects what the server actually said.
  const form = document.getElementById("waitlistForm");
  const emailInput = document.getElementById("waitlistEmail");
  const submitButton = document.getElementById("waitlistSubmit");
  const status = document.getElementById("waitlistStatus");

  function setStatus(message, kind) {
    status.textContent = message;
    status.classList.remove("success", "error");
    if (kind) status.classList.add(kind);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    if (!email) return;

    submitButton.disabled = true;
    submitButton.textContent = "Joining...";
    setStatus("", null);

    const apiBase = window.NORME_API_BASE_URL || "";

    try {
      const response = await fetch(`${apiBase}/api/waitlist/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "landing_page" }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus(data.detail || "You're on the list.", "success");
        form.reset();
      } else {
        const message =
          data.detail ||
          (data.email && data.email[0]) ||
          "Something went wrong. Try again in a moment.";
        setStatus(message, "error");
      }
    } catch (err) {
      setStatus("Could not reach the server. Try again shortly.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Join the waitlist";
    }
  });
})();
