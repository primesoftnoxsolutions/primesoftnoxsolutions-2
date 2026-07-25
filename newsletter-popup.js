(() => {
  const isHomePage = () => {
    if (document.body.classList.contains("page-index")) return true;
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    return path === "/" || path.endsWith("/index.html");
  };

  const injectStyles = () => {
    if (document.getElementById("newsletterPopupStyles")) return;
    const styles = document.createElement("style");
    styles.id = "newsletterPopupStyles";
    styles.textContent = `
      .newsletter-popup {
        position: fixed;
        inset: 0;
        z-index: 12000;
        display: grid;
        place-items: center;
        padding: clamp(16px, 3vw, 32px);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity .28s ease, visibility .28s ease;
      }

      .newsletter-popup.is-visible {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }

      .newsletter-popup__backdrop {
        position: absolute;
        inset: 0;
        background: rgba(5, 10, 16, .22);
        backdrop-filter: blur(16px) saturate(130%);
        -webkit-backdrop-filter: blur(16px) saturate(130%);
      }

      .newsletter-popup__dialog {
        position: relative;
        width: min(1120px, 100%);
        max-height: min(92vh, 900px);
        overflow: hidden;
        border-radius: 26px;
        background: linear-gradient(135deg, rgba(255,255,255,.98), rgba(246,241,255,.96));
        box-shadow: 0 30px 90px rgba(0, 0, 0, .5);
        display: grid;
        grid-template-columns: 0.94fr 1.2fr;
        color: #1a1026;
        transform: scale(.75);
        transform-origin: center;
      }

      .newsletter-popup__close {
        position: absolute;
        top: 18px;
        right: 18px;
        width: 46px;
        height: 46px;
        border: 0;
        border-radius: 999px;
        background: rgba(18, 10, 28, .92);
        color: #fff;
        display: grid;
        place-items: center;
        cursor: pointer;
        box-shadow: 0 10px 24px rgba(0, 0, 0, .28);
        z-index: 3;
      }

      .newsletter-popup__close svg {
        width: 22px;
        height: 22px;
      }

      .newsletter-popup__art {
        position: relative;
        padding: 36px;
        background:
          radial-gradient(circle at 20% 18%, rgba(179, 107, 255, .6) 0, rgba(179, 107, 255, 0) 34%),
          radial-gradient(circle at 76% 24%, rgba(126, 45, 255, .55) 0, rgba(126, 45, 255, 0) 26%),
          linear-gradient(180deg, #0d0717 0%, #130a22 100%);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .newsletter-popup__art::before,
      .newsletter-popup__art::after {
        content: "";
        position: absolute;
        inset: auto;
        border: 2px dashed rgba(183, 124, 255, .65);
        border-radius: 999px;
        opacity: .8;
      }

      .newsletter-popup__art::before {
        width: 160px;
        height: 160px;
        top: 38px;
        left: 24px;
        border-color: rgba(183, 124, 255, .45);
        transform: rotate(-20deg);
      }

      .newsletter-popup__art::after {
        width: 210px;
        height: 150px;
        right: 26px;
        bottom: 68px;
        border-color: rgba(183, 124, 255, .35);
      }

      .newsletter-popup__art-inner {
        position: relative;
        width: min(100%, 360px);
        display: grid;
        gap: 24px;
      }

      .newsletter-popup__plane {
        position: absolute;
        top: 8px;
        left: 12px;
        width: 118px;
        height: 118px;
        background: linear-gradient(145deg, #cfa1ff, #7f2cff);
        clip-path: polygon(0 45%, 100% 0, 58% 100%, 44% 64%, 0 45%);
        filter: drop-shadow(0 0 22px rgba(183, 124, 255, .4));
        transform: rotate(-11deg);
      }

      .newsletter-popup__envelope {
        position: relative;
        margin: 110px auto 0;
        width: 240px;
        height: 180px;
        border-radius: 18px;
        background: linear-gradient(180deg, #201d27 0, #0b0a10 100%);
        box-shadow: 0 16px 28px rgba(0, 0, 0, .45);
      }

      .newsletter-popup__envelope::before {
        content: "";
        position: absolute;
        inset: 24px 16px 16px;
        border-radius: 16px 16px 22px 22px;
        background: linear-gradient(180deg, #b56bff 0, #8c3eff 100%);
      }

      .newsletter-popup__envelope::after {
        content: "🔔";
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        font-size: 48px;
        filter: drop-shadow(0 0 16px rgba(255,255,255,.35));
      }

      .newsletter-popup__features {
        display: grid;
        gap: 18px;
        margin-top: 12px;
      }

      .newsletter-popup__feature {
        display: grid;
        grid-template-columns: 56px 1fr;
        gap: 14px;
        align-items: center;
        padding-top: 16px;
        border-top: 1px solid rgba(255,255,255,.12);
      }

      .newsletter-popup__feature:first-child {
        border-top: 0;
        padding-top: 0;
      }

      .newsletter-popup__feature-icon {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, #8c3eff, #b56bff);
        box-shadow: 0 0 20px rgba(181, 107, 255, .45);
        font-size: 22px;
      }

      .newsletter-popup__feature h4 {
        margin: 0 0 4px;
        font-size: 1.05rem;
        line-height: 1.2;
      }

      .newsletter-popup__feature p {
        margin: 0;
        color: rgba(255,255,255,.8);
        line-height: 1.45;
      }

      .newsletter-popup__content {
        position: relative;
        padding: 52px 56px 34px;
        background: linear-gradient(180deg, rgba(255,255,255,.98), rgba(246,241,255,.96));
      }

      .newsletter-popup__eyebrow {
        margin: 0 0 12px;
        font-size: .88rem;
        letter-spacing: .24em;
        text-transform: uppercase;
        color: #7b3fe4;
        font-weight: 700;
      }

      .newsletter-popup__title {
        margin: 0;
        font-size: clamp(2.2rem, 4vw, 4rem);
        line-height: .98;
        letter-spacing: -0.04em;
        color: #17121f;
      }

      .newsletter-popup__title span {
        color: #7d39df;
      }

      .newsletter-popup__bar {
        width: 112px;
        height: 5px;
        border-radius: 999px;
        margin: 22px 0 26px;
        background: linear-gradient(90deg, #b56bff 0, #7f2cff 100%);
        box-shadow: 0 0 12px rgba(181, 107, 255, .65);
      }

      .newsletter-popup__copy {
        margin: 0 0 28px;
        color: #5f5a6b;
        font-size: 1.06rem;
        line-height: 1.62;
        max-width: 36rem;
      }

      .newsletter-popup__form {
        display: grid;
        gap: 14px;
        max-width: 520px;
      }

      .newsletter-popup__field-wrap {
        position: relative;
      }

      .newsletter-popup__field {
        width: 100%;
        height: 66px;
        border-radius: 14px;
        border: 1px solid rgba(128, 96, 178, .22);
        background: rgba(255,255,255,.92);
        padding: 18px 18px 0;
        font-size: 1rem;
        color: #241735;
        outline: none;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.16);
        transition: border-color .22s ease, box-shadow .22s ease, background-color .22s ease;
      }

      .newsletter-popup__field-wrap:focus-within .newsletter-popup__field {
        border-color: rgba(127, 44, 255, .7);
        background: rgba(255,255,255,.98);
        box-shadow:
          0 0 0 4px rgba(181, 107, 255, .16),
          0 0 0 1px rgba(127, 44, 255, .28) inset;
      }

      .newsletter-popup__field::placeholder {
        color: transparent;
      }

      .newsletter-popup__floating-label {
        position: absolute;
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
        color: #8a829b;
        font-size: 1rem;
        pointer-events: none;
        transition: transform .22s ease, top .22s ease, font-size .22s ease, color .22s ease, letter-spacing .22s ease;
        background: transparent;
      }

      .newsletter-popup__field:focus + .newsletter-popup__floating-label,
      .newsletter-popup__field:not(:placeholder-shown) + .newsletter-popup__floating-label {
        top: 12px;
        transform: translateY(0);
        font-size: .76rem;
        letter-spacing: .08em;
        color: #7f2cff;
      }

      .newsletter-popup__submit {
        width: 100%;
        min-height: 70px;
        border: 0;
        border-radius: 14px;
        padding: 0 20px;
        font-size: 1.05rem;
        font-weight: 700;
        color: #fff;
        background: linear-gradient(90deg, #7f2cff 0%, #b56bff 100%);
        box-shadow: 0 16px 30px rgba(127, 44, 255, .35), 0 0 22px rgba(181, 107, 255, .4);
        cursor: pointer;
        transition: transform .22s ease, box-shadow .22s ease, filter .22s ease, background-position .3s ease;
        background-size: 120% 100%;
        background-position: 0 0;
      }

      .newsletter-popup__submit:hover {
        transform: translateY(-2px);
        filter: brightness(1.04);
        background-position: 100% 0;
        box-shadow: 0 20px 34px rgba(127, 44, 255, .42), 0 0 26px rgba(181, 107, 255, .56);
      }

      .newsletter-popup__submit:focus-visible {
        outline: none;
        transform: translateY(-1px);
        box-shadow: 0 0 0 4px rgba(181, 107, 255, .18), 0 20px 34px rgba(127, 44, 255, .42);
      }

      .newsletter-popup__note {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 12px;
        color: #77707f;
        font-size: .96rem;
      }

      .newsletter-popup__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-top: 28px;
        padding-top: 18px;
        border-top: 1px solid rgba(127, 44, 255, .14);
        color: #6f6980;
        font-size: .95rem;
      }

      .newsletter-popup__dismiss {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        user-select: none;
      }

      .newsletter-popup__dismiss input {
        width: 18px;
        height: 18px;
        accent-color: #7f2cff;
      }

      .newsletter-popup__privacy {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
      }

      @media (max-width: 960px) {
        .newsletter-popup {
          padding: 14px;
        }

        .newsletter-popup__dialog {
          grid-template-columns: 1fr;
          width: min(calc(100vw - 28px), 720px);
          max-height: min(90vh, 860px);
          overflow-y: auto;
          transform: scale(.88);
        }

        .newsletter-popup__art {
          min-height: 320px;
        }

        .newsletter-popup__content {
          padding: 30px 22px 24px;
        }

        .newsletter-popup__close {
          top: 14px;
          right: 14px;
          width: 42px;
          height: 42px;
        }
      }

      @media (max-width: 560px) {
        .newsletter-popup {
          padding: 10px;
        }

        .newsletter-popup__backdrop {
          background: rgba(5, 10, 16, .14);
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        .newsletter-popup__dialog {
          width: min(calc(100vw - 20px), 100%);
          max-height: calc(100vh - 20px);
          transform: scale(1);
          border-radius: 22px;
          background: linear-gradient(180deg, #ffffff 0%, #f9f6ff 100%);
          box-shadow: 0 18px 42px rgba(39, 17, 82, .14);
          will-change: auto;
        }

        .newsletter-popup__art {
          display: none;
        }

        .newsletter-popup__content {
          padding: 26px 18px 18px;
        }

        .newsletter-popup__eyebrow {
          margin-bottom: 10px;
          font-size: .72rem;
          letter-spacing: .26em;
        }

        .newsletter-popup__title {
          font-size: clamp(2.25rem, 12vw, 3.15rem);
          line-height: .96;
        }

        .newsletter-popup__bar {
          width: 88px;
          height: 4px;
          margin: 18px 0 18px;
        }

        .newsletter-popup__copy {
          margin: 0 0 18px;
          font-size: .95rem;
          line-height: 1.5;
        }

        .newsletter-popup__field {
          height: 58px;
          padding: 16px 15px 0;
          border-radius: 12px;
        }

        .newsletter-popup__floating-label {
          left: 15px;
          font-size: .93rem;
        }

        .newsletter-popup__field:focus + .newsletter-popup__floating-label,
        .newsletter-popup__field:not(:placeholder-shown) + .newsletter-popup__floating-label {
          top: 9px;
          font-size: .68rem;
        }

        .newsletter-popup__submit {
          min-height: 58px;
          font-size: 1rem;
          border-radius: 12px;
        }

        .newsletter-popup__note {
          margin-top: 10px;
          font-size: .85rem;
        }

        .newsletter-popup__footer {
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          margin-top: 18px;
          padding-top: 14px;
          font-size: .86rem;
        }

        .newsletter-popup__dismiss {
          gap: 8px;
        }

        .newsletter-popup__privacy {
          gap: 6px;
          white-space: normal;
        }
      }
    `;
    document.head.appendChild(styles);
  };

  const createPopup = () => {
    if (document.getElementById("newsletterPopup")) return null;

    const popup = document.createElement("div");
    popup.id = "newsletterPopup";
    popup.className = "newsletter-popup";
    popup.innerHTML = `
      <div class="newsletter-popup__backdrop" aria-hidden="true"></div>
      <div class="newsletter-popup__dialog" role="dialog" aria-modal="true" aria-labelledby="newsletterPopupTitle">
        <button type="button" class="newsletter-popup__close" aria-label="Close newsletter popup">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6 18 18M18 6 6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
          </svg>
        </button>
        <div class="newsletter-popup__art">
          <div class="newsletter-popup__art-inner">
            <div class="newsletter-popup__plane" aria-hidden="true"></div>
            <div class="newsletter-popup__envelope" aria-hidden="true"></div>
            <div class="newsletter-popup__features">
              <div class="newsletter-popup__feature">
                <div class="newsletter-popup__feature-icon">✦</div>
                <div>
                  <h2>Stay Updated</h2>
                  <p>Get the latest news and updates straight to your inbox.</p>
                </div>
              </div>
              <div class="newsletter-popup__feature">
                <div class="newsletter-popup__feature-icon">✦</div>
                <div>
                  <h2>Exclusive Offers</h2>
                  <p>Be the first to know about new offers and promotions.</p>
                </div>
              </div>
              <div class="newsletter-popup__feature">
                <div class="newsletter-popup__feature-icon">⚡</div>
                <div>
                  <h2>Important Alerts</h2>
                  <p>Receive important announcements and updates instantly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="newsletter-popup__content">
          <p class="newsletter-popup__eyebrow">Newsletter</p>
          <h2 class="newsletter-popup__title" id="newsletterPopupTitle">Stay <span>Updated!</span></h2>
          <div class="newsletter-popup__bar"></div>
          <p class="newsletter-popup__copy">Subscribe to our newsletter and get the latest updates, offers and announcements directly in your inbox.</p>
          <form class="newsletter-popup__form" novalidate>
            <div class="newsletter-popup__field-wrap">
              <input class="newsletter-popup__field" type="email" name="email" placeholder=" " aria-label="Email Address" />
              <label class="newsletter-popup__floating-label">Email Address</label>
            </div>
            <button type="submit" class="newsletter-popup__submit">Subscribe Our Newsletter</button>
          </form>
          <div class="newsletter-popup__note">🔒 We respect your privacy. No spam, unsubscribe anytime.</div>
          <div class="newsletter-popup__footer">
            <label class="newsletter-popup__dismiss">
              <input type="checkbox" />
              <span>Don't show this again</span>
            </label>
            <div class="newsletter-popup__privacy">🛡️ We respect your privacy</div>
          </div>
        </div>
      </div>
    `;

    const close = () => {
      popup.classList.remove("is-visible");
      document.body.classList.remove("newsletter-popup-open");
      window.setTimeout(() => popup.remove(), 280);
    };

    popup.querySelector(".newsletter-popup__close").addEventListener("click", close);
    popup.querySelector(".newsletter-popup__backdrop").addEventListener("click", close);
    popup.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      close();
    });
    popup.querySelector(".newsletter-popup__dismiss input").addEventListener("change", () => close());

    document.body.appendChild(popup);

    return popup;
  };

  const init = () => {
    if (!isHomePage()) return;
    injectStyles();
    const popup = createPopup();
    if (!popup) return;

    window.setTimeout(() => {
      popup.classList.add("is-visible");
      document.body.classList.add("newsletter-popup-open");
    }, 2000);
  };

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init, { once: true });
  }
})();
