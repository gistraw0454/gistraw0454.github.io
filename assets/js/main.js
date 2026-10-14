(function () {
  document.getElementById("year").textContent = new Date().getFullYear();

  const nav = document.querySelector(".nav");
  window.addEventListener(
    "scroll",
    () => nav.classList.toggle("scrolled", window.scrollY > 10),
    { passive: true }
  );

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.Lenis && !reduceMotion) {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    document.querySelectorAll('a[href="#top"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.2 });
      });
    });
  }

  const revealTargets = document.querySelectorAll(".tl-item, .ach-col");
  const revealer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    revealer.observe(el);
  });
})();
