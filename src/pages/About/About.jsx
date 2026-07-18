import { useEffect, useState, useRef } from "react";
import "./About.css";
import useTranslation from "../../hooks/useTranslation";
import {
  FiTarget,
  FiEye,
  FiAward,
  FiCpu,
  FiZap,
  FiShield,
  FiCode,
  FiClock,
  FiCheck,
  FiArrowUpRight
} from "react-icons/fi";
import aboutImg from "../../assets/images/about.png";

function AnimatedCounter({ value, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const target = parseInt(value, 10);
    if (isNaN(target)) {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp = null;
          
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = Math.floor(progress * target);
            setCount(currentCount);
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [value, duration]);

  return (
    <span ref={elementRef} className="stat-card__number">
      {count}
      {suffix}
    </span>
  );
}

function About() {
  const { t } = useTranslation();

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects-showcase");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="about section" id="about">
      <div className="container">
        
        {/* Centered Top Header section */}
        <div className="about-header" data-aos="fade-up">
          <span className="section-badge">{t("about.badge")}</span>
          <h2 className="section-title">{t("about.title")}</h2>
          <p className="about-description">{t("about.description")}</p>
          
          <div className="about-actions">
            {/* <button 
              onClick={handleScrollToContact} 
              className="about-cta-btn about-cta-btn--primary"
              aria-label="Scroll to contact form"
            >
              <span>{t("about.ctaStart")}</span>
              <FiZap className="cta-icon" />
            </button> */}
            
            {/* <button 
              onClick={handleScrollToProjects} 
              className="about-cta-btn about-cta-btn--secondary"
              aria-label="Scroll to projects section"
            >
              <span>{t("about.ctaView")}</span>
              <FiArrowUpRight className="cta-icon" />
            </button> */}
          </div>
        </div>

        {/* 2-Column content */}
        <div className="about-grid">
          {/* Image Panel */}
          <div className="about-image-panel" data-aos="fade-right">
            <div className="about-image-frame">
              <img 
                src={aboutImg} 
                alt={t("about.imageAlt")} 
                className="about-featured-img" 
                loading="lazy"
              />
              <div className="about-image-glow" />
            </div>
          </div>

          {/* Pillars List (Mission, Vision, Why Choose Us) */}
          <div className="about-pillars" data-aos="fade-left">
            <article className="pillar-item">
              <div className="pillar-icon-box">
                <FiTarget className="pillar-icon" />
              </div>
              <div className="pillar-text">
                <h3>{t("about.mission.title")}</h3>
                <p>{t("about.mission.text")}</p>
              </div>
            </article>

            <article className="pillar-item">
              <div className="pillar-icon-box">
                <FiEye className="pillar-icon" />
              </div>
              <div className="pillar-text">
                <h3>{t("about.vision.title")}</h3>
                <p>{t("about.vision.text")}</p>
              </div>
            </article>

            <article className="pillar-item">
              <div className="pillar-icon-box">
                <FiAward className="pillar-icon" />
              </div>
              <div className="pillar-text">
                <h3>{t("about.whyUs.title")}</h3>
                <p>{t("about.whyUs.text")}</p>
              </div>
            </article>
          </div>
        </div>

        {/* Features 2x2 grid */}
        <div className="about-features-section" data-aos="fade-up">
          <div className="about-features-grid">
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <FiCheck className="feature-icon-check" />
                <FiCpu className="feature-icon-main" />
              </div>
              <span className="feature-label">{t("about.features.tech")}</span>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <FiCheck className="feature-icon-check" />
                <FiCode className="feature-icon-main" />
              </div>
              <span className="feature-label">{t("about.features.code")}</span>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <FiCheck className="feature-icon-check" />
                <FiShield className="feature-icon-main" />
              </div>
              <span className="feature-label">{t("about.features.security")}</span>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <FiCheck className="feature-icon-check" />
                <FiClock className="feature-icon-main" />
              </div>
              <span className="feature-label">{t("about.features.support")}</span>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="about-stats-row" data-aos="fade-up">
          <div className="stat-card">
            <h3>
              <AnimatedCounter 
                value={t("about.stats.projects.number")} 
                suffix={t("about.stats.projects.suffix")} 
              />
            </h3>
            <p className="stat-card__label">{t("about.stats.projects.label")}</p>
          </div>

          <div className="stat-card">
            <h3>
              <AnimatedCounter 
                value={t("about.stats.clients.number")} 
                suffix={t("about.stats.clients.suffix")} 
              />
            </h3>
            <p className="stat-card__label">{t("about.stats.clients.label")}</p>
          </div>

          <div className="stat-card">
            <h3>
              <AnimatedCounter 
                value={t("about.stats.years.number")} 
                suffix={t("about.stats.years.suffix")} 
              />
            </h3>
            <p className="stat-card__label">{t("about.stats.years.label")}</p>
          </div>

          <div className="stat-card">
            <h3>
              <AnimatedCounter 
                value={t("about.stats.support.number")} 
                suffix={t("about.stats.support.suffix")} 
              />
            </h3>
            <p className="stat-card__label">{t("about.stats.support.label")}</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;