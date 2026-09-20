import { useEffect } from "react";

function App() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.12 },
    );

    const revealEls = document.querySelectorAll(".reveal");
    revealEls.forEach((el) => io.observe(el));

    const cards = Array.from(document.querySelectorAll(".card"));
    const onCardEnter = (c: Element) => () => {
      cards.forEach((x) => x.classList.remove("active"));
      c.classList.add("active");
    };
    const cardHandlers = cards.map((c) => {
      const handler = onCardEnter(c);
      c.addEventListener("mouseenter", handler);
      return { c, handler };
    });

    let raf = 0;
    let x = -300;
    let y = -300;
    const onPointerMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--mx", x + "px");
          document.documentElement.style.setProperty("--my", y + "px");
          raf = 0;
        });
      }
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    document
      .querySelectorAll<HTMLElement>(
        ".project-card, .solution, .metric, .reason, .quote, .step",
      )
      .forEach((el, i) => {
        el.style.transitionDelay = `${(i % 6) * 45}ms`;
      });

    const slider = document.getElementById("servicesSlider");
    const prev = document.querySelector(".service-prev");
    const next = document.querySelector(".service-next");

    const move = (dir: number) => {
      if (!slider) return;
      const card = slider.querySelector(".card");
      const gap = parseFloat(getComputedStyle(slider).gap) || 15;
      const step = (card ? card.getBoundingClientRect().width : 250) + gap;
      slider.scrollBy({ left: dir * step, behavior: "smooth" });
    };

    const onPrev = () => move(-1);
    const onNext = () => move(1);

    if (slider && prev && next) {
      prev.addEventListener("click", onPrev);
      next.addEventListener("click", onNext);
    }

    return () => {
      io.disconnect();
      cardHandlers.forEach(({ c, handler }) =>
        c.removeEventListener("mouseenter", handler),
      );
      window.removeEventListener("pointermove", onPointerMove);
      if (raf) cancelAnimationFrame(raf);
      prev?.removeEventListener("click", onPrev);
      next?.removeEventListener("click", onNext);
    };
  }, []);

  return (
    <>
      <nav className="nav">
        <img
          className="logo"
          src="/image.png"
          alt="Raghava Ram IT Solutions logo"
        />
        <div className="brand">
          RAGHAVA RAM<small>IT SOLUTIONS</small>
        </div>
        <a href="#services">Services</a>
        <a href="#solutions">Solutions</a>
        <a href="#results">Results</a>
        <a href="#projects">Projects</a>
        <a href="#process">Process</a>
        <a href="#contact">Contact</a>
        <a className="btn" href="tel:+918500784889">
          +91 85007 84889
        </a>
      </nav>

      <main>
        <section className="hero">
          <div className="reveal">
            <div className="kicker">INNOVATE · INTEGRATE · ELEVATE</div>
            <h1>
              We build digital systems <span>that work.</span>
            </h1>
            <p>
              Websites, apps, AI and automation designed around real business
              outcomes.
            </p>
            <div className="actions">
              <a className="btn" href="#services">
                Start a project →
              </a>
              <a className="btn outline" href="https://wa.me/918500784889">
                ◉ Chat on WhatsApp
              </a>
            </div>
            <div className="stats">
              <div className="stat">
                <strong>20+</strong>
                <span>Clients Managed</span>
              </div>
              <div className="stat">
                <strong>60%</strong>
                <span>Lower Support Load</span>
              </div>
              <div className="stat">
                <strong>24/7</strong>
                <span>AI Assistance</span>
              </div>
              <div className="stat">
                <strong>3</strong>
                <span>Branch Cities</span>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="system-visual">
              <div className="system-grid"></div>
              <div className="system-core">
                <div className="core-label">DIGITAL SYSTEM</div>
                <div className="core-title">WORKS</div>
                <div className="core-dot"></div>
              </div>

              <div className="system-node node-web">
                <span>WEB</span>
                <small>Connected</small>
              </div>
              <div className="system-node node-ai">
                <span>AI</span>
                <small>Active</small>
              </div>
              <div className="system-node node-data">
                <span>DATA</span>
                <small>Synced</small>
              </div>
              <div className="system-node node-auto">
                <span>AUTO</span>
                <small>Running</small>
              </div>

              <svg
                className="system-lines"
                viewBox="0 0 620 470"
                aria-hidden="true"
              >
                <path
                  className="line l1"
                  d="M110 105 C190 135 225 185 305 230"
                />
                <path
                  className="line l2"
                  d="M510 105 C430 135 395 185 315 230"
                />
                <path
                  className="line l3"
                  d="M105 365 C190 335 230 285 305 245"
                />
                <path
                  className="line l4"
                  d="M515 365 C430 335 390 285 315 245"
                />
                <circle className="flow f1" cx="0" cy="0" r="4" />
                <circle className="flow f2" cx="0" cy="0" r="4" />
                <circle className="flow f3" cx="0" cy="0" r="4" />
                <circle className="flow f4" cx="0" cy="0" r="4" />
              </svg>

              <div className="system-metric metric-one">
                <span>UPTIME</span>
                <strong>24/7</strong>
              </div>
              <div className="system-metric metric-two">
                <span>RESPONSE</span>
                <strong>&lt; 1s</strong>
              </div>
              <div className="system-metric metric-three">
                <span>GROWTH</span>
                <strong>+62%</strong>
              </div>

              <div className="system-scan"></div>
            </div>
          </div>
        </section>

        <div className="marquee">
          <div className="track">
            <span>
              ✦ <b>WEB &amp; MOBILE</b>
            </span>
            <span>✦ AI AGENTS</span>
            <span>✦ AUTOMATION</span>
            <span>✦ DIGITAL MARKETING</span>
            <span>✦ ENTERPRISE SOLUTIONS</span>
            <span>✦ CUSTOM SOFTWARE</span>
            <span>
              ✦ <b>WEB &amp; MOBILE</b>
            </span>
            <span>✦ AI AGENTS</span>
            <span>✦ AUTOMATION</span>
          </div>
        </div>

        <section className="section" id="services">
          <div className="head reveal">
            <div className="kicker">WHAT WE BUILD</div>
            <h2>One solution at a time.</h2>
            <p>Simple services. Clear outcomes. No information overload.</p>
          </div>
          <div className="services-wrap reveal">
            <button
              className="service-cursor service-prev"
              type="button"
              aria-label="Show previous solutions"
            >
              ‹
            </button>
            <div className="services" id="servicesSlider">
              <div className="card active">
                <div className="icon service-professional-icon">
                  <svg
                    className="service-icon-svg"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <rect x="9" y="8" width="30" height="32" rx="7" />
                    <path d="M15 17h18M15 23h13M15 29h9" />
                    <path d="M31 28v9M26.5 32.5H35.5" />
                    <circle cx="31" cy="28" r="2.2" />
                  </svg>
                </div>
                <h3>Web &amp; Mobile</h3>
                <p>Fast, secure and scalable digital products.</p>
              </div>
              <div className="card">
                <div className="icon service-professional-icon">
                  <svg
                    className="service-icon-svg"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path d="M13 11h22a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4Z" />
                    <path d="M15 18h12M15 24h8M15 30h6" />
                    <path d="m30 27 3 3 6-7" />
                    <path d="M28 15h7" />
                  </svg>
                </div>
                <h3>Marketing &amp; SEO</h3>
                <p>Get found. Get customers. Grow faster.</p>
              </div>
              <div className="card">
                <div className="icon service-professional-icon">
                  <svg
                    className="service-icon-svg"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path d="M7 25s6-11 17-11 17 11 17 11-6 11-17 11S7 25 7 25Z" />
                    <circle cx="24" cy="25" r="5" />
                    <circle cx="24" cy="25" r="1.8" />
                    <path d="M24 10v-3M12 13l-2-2M36 13l2-2" />
                  </svg>
                </div>
                <h3>Enterprise</h3>
                <p>Systems built around real business needs.</p>
              </div>
              <div className="card">
                <div className="icon service-professional-icon">
                  <svg
                    className="service-icon-svg"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path d="M8 35h32" />
                    <path d="m11 30 8-8 6 5 12-14" />
                    <path d="M29 13h8v8" />
                    <circle cx="11" cy="30" r="2.2" />
                    <circle cx="19" cy="22" r="2.2" />
                    <circle cx="25" cy="27" r="2.2" />
                    <path d="M36 31v8M32 35h8" />
                  </svg>
                </div>
                <h3>AI Agent</h3>
                <p>24/7 customer assistance.</p>
              </div>
              <div className="card">
                <div className="icon service-professional-icon">
                  <svg
                    className="service-icon-svg"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <circle cx="24" cy="24" r="5" />
                    <path d="M24 8v7M24 33v7M8 24h7M33 24h7" />
                    <path d="m12.7 12.7 5 5M30.3 30.3l5 5M35.3 12.7l-5 5M17.7 30.3l-5 5" />
                    <circle cx="24" cy="8" r="2" />
                    <circle cx="40" cy="24" r="2" />
                    <circle cx="24" cy="40" r="2" />
                    <circle cx="8" cy="24" r="2" />
                  </svg>
                </div>
                <h3>Automation</h3>
                <p>Reduce repetitive manual work.</p>
              </div>
              <div className="card">
                <div className="icon service-professional-icon custom-software-icon">
                  <svg
                    className="service-icon-svg"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <rect x="8" y="9" width="32" height="30" rx="6" />
                    <path d="M8 17h32" />
                    <circle cx="14" cy="13" r="1.4" />
                    <circle cx="19" cy="13" r="1.4" />
                    <circle cx="24" cy="13" r="1.4" />
                    <path d="m17 28 5 5 10-11M14 36h20" />
                  </svg>
                </div>
                <h3>Custom Software</h3>
                <p>Solutions tailored to your workflow.</p>
              </div>
            </div>
            <button
              className="service-cursor service-next"
              type="button"
              aria-label="Show next solutions"
            >
              ›
            </button>
          </div>
        </section>

        <section className="section dark" id="solutions">
          <div className="head reveal">
            <div className="kicker">YOUR BUSINESS CHALLENGES</div>
            <h2>Real problems. Practical solutions.</h2>
          </div>
          <div className="solutions reveal professional-solutions">
            <article className="solution professional-solution">
              <div className="solution-top">
                <span className="challenge-icon">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M9 11h30v22H9z" fill="none" />
                    <path d="M15 18h18M15 24h11" fill="none" />
                    <path d="M18 39l6-6 6 6" fill="none" />
                  </svg>
                </span>
                <span className="solution-index">01</span>
              </div>
              <div className="solution-label">CUSTOMER COMMUNICATION</div>
              <h3>Too many enquiries?</h3>
              <p>
                Customers wait for replies and valuable leads can be missed.
              </p>
              <div className="solution-flow">
                <span className="flow-line"></span>
                <span className="flow-arrow">↓</span>
              </div>
              <div className="solution-result">
                <span className="result-icon">✦</span>
                <div>
                  <small>OUR SOLUTION</small>
                  <strong>
                    AI Agent <em>24/7</em>
                  </strong>
                </div>
              </div>
            </article>
            <article className="solution professional-solution">
              <div className="solution-top">
                <span className="challenge-icon">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <rect
                      x="8"
                      y="9"
                      width="32"
                      height="30"
                      rx="4"
                      fill="none"
                    />
                    <path
                      d="M15 17h18M15 24h13M15 31h8M34 29l5 5-5 5"
                      fill="none"
                    />
                  </svg>
                </span>
                <span className="solution-index">02</span>
              </div>
              <div className="solution-label">OPERATIONS</div>
              <h3>Too much manual work?</h3>
              <p>
                Repetitive tasks consume time and increase the chance of errors.
              </p>
              <div className="solution-flow">
                <span className="flow-line"></span>
                <span className="flow-arrow">↓</span>
              </div>
              <div className="solution-result">
                <span className="result-icon">↗</span>
                <div>
                  <small>OUR SOLUTION</small>
                  <strong>Smart Automation</strong>
                </div>
              </div>
            </article>
            <article className="solution professional-solution">
              <div className="solution-top">
                <span className="challenge-icon">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <circle cx="22" cy="22" r="12" fill="none" />
                    <path d="M31 31l9 9M16 25l4-5 4 3 5-7" fill="none" />
                    <path d="M14 37h20" fill="none" />
                  </svg>
                </span>
                <span className="solution-index">03</span>
              </div>
              <div className="solution-label">VISIBILITY &amp; GROWTH</div>
              <h3>Low online visibility?</h3>
              <p>
                Great services are harder to find when your digital presence is
                weak.
              </p>
              <div className="solution-flow">
                <span className="flow-line"></span>
                <span className="flow-arrow">↓</span>
              </div>
              <div className="solution-result">
                <span className="result-icon">◎</span>
                <div>
                  <small>OUR SOLUTION</small>
                  <strong>SEO + Marketing</strong>
                </div>
              </div>
            </article>
            <article className="solution professional-solution">
              <div className="solution-top">
                <span className="challenge-icon">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <circle cx="18" cy="17" r="6" fill="none" />
                    <circle cx="32" cy="20" r="5" fill="none" />
                    <path
                      d="M8 36c1-7 5-10 10-10s9 3 10 10M27 29c6-1 11 2 13 7"
                      fill="none"
                    />
                    <path d="M35 10v8M31 14h8" fill="none" />
                  </svg>
                </span>
                <span className="solution-index">04</span>
              </div>
              <div className="solution-label">LEAD GENERATION</div>
              <h3>Need more qualified leads?</h3>
              <p>
                Turn your digital presence into a system that attracts and
                converts.
              </p>
              <div className="solution-flow">
                <span className="flow-line"></span>
                <span className="flow-arrow">↓</span>
              </div>
              <div className="solution-result">
                <span className="result-icon">↗</span>
                <div>
                  <small>OUR SOLUTION</small>
                  <strong>Digital Solutions</strong>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="ai">
            <div className="head reveal">
              <div className="kicker">YOUR AI TEAM</div>
              <h2>
                Always on.
                <br />
                <span style={{ color: "#173b68" }}>Always helpful.</span>
              </h2>
              <p>
                Answers, qualifies leads and books appointments in Telugu, Hindi
                and English.
              </p>
              <a className="btn" href="#contact">
                See AI in action →
              </a>
            </div>
            <div className="bot-stage reveal">
              <div className="ai-console">
                <div className="console-top">
                  <span className="console-label">RAGHAVA AI</span>
                  <span className="console-live">
                    <i></i> LIVE
                  </span>
                </div>
                <div className="ai-core">
                  <div className="core-ring ring-1"></div>
                  <div className="core-ring ring-2"></div>
                  <div className="core-ring ring-3"></div>
                  <div className="core-glow"></div>
                  <div className="core-mark">AI</div>
                </div>
                <div className="ai-status-row">
                  <span>Assistant active</span>
                  <strong>24 / 7</strong>
                </div>
                <div className="activity-line">
                  <span></span>
                  <b></b>
                  <em></em>
                </div>
              </div>
              <div className="ai-float-card ai-f1">
                <span className="mini-icon">✦</span>
                <div>
                  <small>Customer</small>
                  <strong>Message received</strong>
                </div>
              </div>
              <div className="ai-float-card ai-f2">
                <span className="mini-icon">✓</span>
                <div>
                  <small>Automation</small>
                  <strong>Task completed</strong>
                </div>
              </div>
              <div className="ai-float-card ai-f3">
                <span className="mini-icon">↗</span>
                <div>
                  <small>Business</small>
                  <strong>Lead captured</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section dark" id="results">
          <div className="head reveal">
            <div className="kicker">RESULTS</div>
            <h2>Real numbers. Real impact.</h2>
          </div>
          <div className="metrics reveal">
            <div className="metric">
              <strong>20+</strong>
              <span>Clients managed</span>
            </div>
            <div className="metric">
              <strong>60%</strong>
              <span>Lower support load</span>
            </div>
            <div className="metric">
              <strong>24/7</strong>
              <span>AI assistance</span>
            </div>
            <div className="metric">
              <strong>3</strong>
              <span>Branch cities</span>
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="head reveal">
            <div className="kicker">OUR WORK</div>
            <h2>Previous &amp; Ongoing Projects</h2>
            <p>
              A quick look at the digital systems, apps and growth solutions
              delivered for businesses.
            </p>
          </div>

          <div className="project-grid reveal">
            <article className="project-card featured-project">
              <div className="project-icon">
                <span className="icon-art">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <rect
                      x="7"
                      y="9"
                      width="34"
                      height="29"
                      rx="5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    />
                    <path
                      d="M12 32l7-8 5 5 9-12 5 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15h8"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <i className="icon-point"></i>
              </div>
              {/* <div className="project-number">05</div> */}
              <h3>Meta Advertising</h3>
              <p>
                Campaign setup, audience targeting and performance-focused
                digital advertising.
              </p>
              <div className="project-tags">
                <span>Meta Ads</span>
                <span>Marketing</span>
              </div>
            </article>
            <article className="project-card">
              <div className="project-icon">
                <span className="icon-art">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path
                      d="M8 39V13l16-6 16 6v26"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 18h6v6h-6zM27 18h6v6h-6zM15 29h6v6h-6zM27 29h6v6h-6zM21 39v-8h6v8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    />
                    <path
                      d="M5 39h38"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <i className="icon-point"></i>
              </div>
              {/* <div className="project-number">01</div> */}
              <h3>Hostel Management</h3>
              <p>
                Room allocation, fees, attendance and student management in one
                system.
              </p>
              <div className="project-tags">
                <span>Web App</span>
                <span>Management</span>
              </div>
            </article>
            <article className="project-card">
              <div className="project-icon">
                <span className="icon-art">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path
                      d="M9 14h30v25H9z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      rx="4"
                    />
                    <path
                      d="M15 20h18M15 26h18M15 32h10"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 10h24"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <i className="icon-point"></i>
              </div>
              {/* <div className="project-number">02</div> */}
              <h3>Inventory Management</h3>
              <p>
                Track stock, products, movement and business inventory with
                ease.
              </p>
              <div className="project-tags">
                <span>ERP</span>
                <span>Automation</span>
              </div>
            </article>
            <article className="project-card">
              <div className="project-icon">
                <span className="icon-art">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path
                      d="M8 18h32v20H8z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    />
                    <path
                      d="M6 18l4-9h28l4 9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 18v4h14v-4M17 29h14M17 34h9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <i className="icon-point"></i>
              </div>
              {/* <div className="project-number">03</div> */}
              <h3>E-Commerce</h3>
              <p>
                Modern online shopping experiences with products, orders and
                payments.
              </p>
              <div className="project-tags">
                <span>Web</span>
                <span>Commerce</span>
              </div>
            </article>
            <article className="project-card">
              <div className="project-icon">
                <span className="icon-art">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path
                      d="M24 8c5 8 11 13 11 21a11 11 0 1 1-22 0c0-8 6-13 11-21z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    />
                    <path
                      d="M24 19v12M18 25h12"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <i className="icon-point"></i>
              </div>
              {/* <div className="project-number">04</div> */}
              <h3>Blood Donation App</h3>
              <p>
                Connect donors and recipients with a simple, accessible mobile
                experience.
              </p>
              <div className="project-tags">
                <span>Mobile App</span>
                <span>Social Impact</span>
              </div>
            </article>
            <article className="project-card">
              <div className="project-icon">
                <span className="icon-art">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <rect
                      x="7"
                      y="8"
                      width="34"
                      height="31"
                      rx="5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    />
                    <path
                      d="M13 16h8v7h-8zM27 16h8v7h-8zM13 28h8v6h-8zM27 28h8v6h-8z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    />
                    <path
                      d="M15 12h18"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <i className="icon-point"></i>
              </div>
              {/* <div className="project-number">06</div> */}
              <h3>ERP System</h3>
              <p>
                Connected business workflows that reduce manual work and improve
                visibility.
              </p>
              <div className="project-tags">
                <span>Enterprise</span>
                <span>Automation</span>
              </div>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="head reveal">
            <div className="kicker">CLIENT STORIES</div>
            <h2>Real businesses. Real feedback.</h2>
          </div>
          <div className="testimonials professional-testimonials reveal">
            <article className="story-card">
              <div className="story-top">
                <div className="story-mark">“</div>
                <span className="story-label">AI &amp; CUSTOMER SUPPORT</span>
              </div>
              <p className="story-quote">
                Their AI chatbot handles customer queries in Telugu and English,
                cutting our support load by <b>60%</b>.
              </p>
              <div className="story-bottom">
                <div className="client-avatar">RT</div>
                <div>
                  <strong>Ravi Teja</strong>
                  <span>Client story</span>
                </div>
                <div className="story-result">
                  <b>60%</b>
                  <span>support load</span>
                </div>
              </div>
            </article>
            <article className="story-card">
              <div className="story-top">
                <div className="story-mark">“</div>
                <span className="story-label">DIGITAL OPERATIONS</span>
              </div>
              <p className="story-quote">
                Easy to use, quick support and reduced our manual work
                significantly.
              </p>
              <div className="story-bottom">
                <div className="client-avatar">AK</div>
                <div>
                  <strong>Anitha Kumari</strong>
                  <span>Client story</span>
                </div>
                <div className="story-result">
                  <b>24/7</b>
                  <span>support</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section dark" id="process">
          <div className="head reveal">
            <div className="kicker">OUR PROCESS</div>
            <h2>From idea to impact.</h2>
          </div>
          <div className="process reveal">
            <div className="step">
              <div className="circle">01</div>
              <h3>Discover</h3>
              <p>Understand your needs</p>
            </div>
            <div className="step">
              <div className="circle">02</div>
              <h3>Design</h3>
              <p>Plan &amp; prototype</p>
            </div>
            <div className="step">
              <div className="circle">03</div>
              <h3>Build</h3>
              <p>Develop &amp; test</p>
            </div>
            <div className="step">
              <div className="circle">04</div>
              <h3>Launch</h3>
              <p>Go live &amp; grow</p>
            </div>
          </div>
        </section>

        <section className="cta" id="contact">
          <div className="reveal">
            <div className="kicker">READY TO GROW?</div>
            <h2>
              Let’s build something
              <br />
              great together.
            </h2>
            <a className="btn" href="tel:+918500784889">
              ☎ +91 85007 84889
            </a>{" "}
            <a className="btn outline" href="https://wa.me/918500784889">
              WhatsApp
            </a>
          </div>
          <div className="mountain" aria-label="Digital growth journey">
            <svg viewBox="0 0 520 280" role="img" aria-hidden="true">
              <defs>
                <linearGradient id="pathGold" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0" stopColor="#b68125" />
                  <stop offset=".55" stopColor="#e4bd64" />
                  <stop offset="1" stopColor="#f1d487" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="7" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g opacity=".18" stroke="#173b68" strokeWidth="1">
                <path d="M40 235H485M40 190H485M40 145H485M40 100H485" />
                <path d="M95 55V245M175 55V245M255 55V245M335 55V245M415 55V245" />
              </g>
              <path
                d="M45 232 C105 225 120 190 165 190 S225 165 250 145 S315 130 345 98 S410 78 472 35"
                fill="none"
                stroke="#173b68"
                strokeWidth="18"
                strokeLinecap="round"
                opacity=".14"
              />
              <path
                d="M45 232 C105 225 120 190 165 190 S225 165 250 145 S315 130 345 98 S410 78 472 35"
                fill="none"
                stroke="url(#pathGold)"
                strokeWidth="7"
                strokeLinecap="round"
                filter="url(#glow)"
              />
              <g fill="#173b68" stroke="#fff" strokeWidth="4">
                <circle cx="165" cy="190" r="9" />
                <circle cx="250" cy="145" r="9" />
                <circle cx="345" cy="98" r="9" />
                <circle cx="472" cy="35" r="11" />
              </g>
              <path
                d="M472 35V5"
                stroke="#173b68"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path d="M472 7 L512 19 L472 31 Z" fill="#c79a3b" />
              <text
                x="40"
                y="270"
                fontSize="14"
                fontWeight="700"
                letterSpacing="3"
                fill="#173b68"
                style={{ fontFamily: "var(--font-brand)" }}
              >
                IDEA • BUILD • GROW
              </text>
            </svg>
          </div>
        </section>
      </main>

      <footer className="pro-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span>RR</span>
            </div>
            <div>
              <strong>RAGHAVA RAM</strong>
              <div className="footer-gold">IT SOLUTIONS</div>
            </div>
            <p>
              Digital products. Practical automation.
              <br />
              Real business impact.
            </p>
            <div className="footer-badge">
              <span></span> Building digital systems that work
            </div>
          </div>
          <div className="footer-details">
            <strong>CONTACT</strong>
            <p>
              <span className="ficon">☎</span>
              <a href="tel:+918500784889">+91 85007 84889</a>
            </p>
            <p>
              <span className="ficon">◉</span>
              <a href="https://wa.me/918500784889">WhatsApp</a>
            </p>
          </div>
          <div className="footer-details">
            <strong>LOCATIONS</strong>
            <p>
              <span className="ficon">⌖</span>Hyderabad
            </p>
            <p>
              <span className="ficon">⌖</span>Bangalore
            </p>
            <p>
              <span className="ficon">⌖</span>Vijayawada
            </p>
          </div>
          <div className="footer-details">
            <strong>EXPLORE</strong>
            <p>
              <span className="ficon">→</span>
              <a href="#services">Services</a>
            </p>
            <p>
              <span className="ficon">→</span>
              <a href="#solutions">Solutions</a>
            </p>
            <p>
              <span className="ficon">→</span>
              <a href="#results">Results</a>
            </p>
            <p>
              <span className="ficon">→</span>
              <a href="#contact">Contact</a>
            </p>
          </div>
          <div className="footer-connect">
            <strong>LET&apos;S CONNECT</strong>
            <p>
              Have a project in mind?
              <br />
              Let&apos;s turn it into a working system.
            </p>
            <div className="social-row">
              <a href="https://wa.me/918500784889" aria-label="WhatsApp">
                ◉
              </a>
              <a href="tel:+918500784889" aria-label="Call">
                ☎
              </a>
              <a href="#contact" aria-label="Contact">
                ✉
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Raghava Ram IT Solutions</span>
          <span>Web · AI · Automation · Software</span>
          <span>Built for business. Designed for growth.</span>
        </div>
      </footer>
    </>
  );
}

export default App;
