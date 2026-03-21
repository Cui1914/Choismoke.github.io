const page = document.body.dataset.page;

const navMap = {
  home: "index.html",
  portfolio: "portfolio.html",
  life: "life.html",
  about: "about.html",
  forum: "forum.html",
};

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (href === navMap[page]) {
    link.classList.add("active");
  }
});

const socialDefaults = {
  github: "#",
  bilibili: "#",
  xiaohongshu: "#",
  wechat: "#",
  email: "#",
};

const socialConfig = {
  ...socialDefaults,
  ...(window.siteConfig && window.siteConfig.socialLinks
    ? window.siteConfig.socialLinks
    : {}),
};

document.querySelectorAll("[data-social]").forEach((item) => {
  const key = item.dataset.social;
  const link = socialConfig[key] || "#";
  item.setAttribute("href", link);

  const isExternal = /^https?:\/\//i.test(link);
  if (isExternal) {
    item.setAttribute("target", "_blank");
    item.setAttribute("rel", "noopener noreferrer");
  }
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

const filterGroup = document.querySelector("[data-filter-group]");
if (filterGroup) {
  const buttons = filterGroup.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("[data-category]");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = btn.dataset.filter;

      buttons.forEach((button) => button.classList.remove("active"));
      btn.classList.add("active");

      cards.forEach((card) => {
        const hit = selected === "all" || card.dataset.category === selected;
        card.style.display = hit ? "" : "none";
      });
    });
  });
}

const copyWeeklyBtn = document.querySelector("[data-copy-weekly]");
if (copyWeeklyBtn) {
  copyWeeklyBtn.addEventListener("click", async () => {
    const template = document.querySelector("[data-weekly-template]");
    if (!template) return;

    const text = template.innerText.trim();
    try {
      await navigator.clipboard.writeText(text);
      copyWeeklyBtn.textContent = "已复制模板";
      setTimeout(() => {
        copyWeeklyBtn.textContent = "复制周记模板";
      }, 1200);
    } catch (err) {
      copyWeeklyBtn.textContent = "复制失败，请手动复制";
      setTimeout(() => {
        copyWeeklyBtn.textContent = "复制周记模板";
      }, 1400);
    }
  });
}
