import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Mail, Download, Code, ChevronDown, ArrowUpRight } from 'lucide-react';

import Preloader from './Preloader';
import ScrollProgress from './ScrollProgress';
import CustomCursor from './CustomCursor';
import ProjectModal from './ProjectModal';
import ParticleGrid from './ParticleGrid';
import GlitchText from './GlitchText';
import TypewriterText from './TypewriterText';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import TechMarquee from './TechMarquee';
import ProjectList from './ProjectList';
import TopNav from './TopNav';
import ScanlineOverlay from './ScanlineOverlay';

import { skills, projects, journey, certifications } from '../data/portfolioData';

/* ─── reusable section heading ─────────────────────────────────── */
const SectionHeading = ({ label, heading, accent }) => (
  <ScrollReveal animation="fade-up">
    <div className="mb-12 md:mb-16">
      <div className="text-wqf-orange text-xs font-black uppercase tracking-widest mb-3">— {label}</div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
        {heading} <span className="text-wqf-teal">{accent}</span>
      </h2>
    </div>
  </ScrollReveal>
);

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActive] = useState('home');
  const [modalProject, setModal] = useState(null);
  const lineRef = useRef(null);
  const journeyRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  /* section tracker + parallax hero */
  useEffect(() => {
    const SECTIONS = ['home', 'about', 'skills', 'projects', 'certifications', 'journey', 'contact'];
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const current = SECTIONS.find(id => {
          const el = document.getElementById(id);
          if (!el) return false;
          const { top, bottom } = el.getBoundingClientRect();
          return top <= window.innerHeight * 0.5 && bottom >= window.innerHeight * 0.25;
        });
        if (current) setActive(current);

        /* parallax — only on desktop */
        if (heroRef.current && window.innerWidth >= 768) {
          const y = window.pageYOffset;
          heroRef.current.style.transform = `translateY(${y * 0.25}px)`;
          heroRef.current.style.opacity = `${Math.max(0, 1 - y / 650)}`;
        }
        ticking = false;
      });
      ticking = true;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* animated timeline fill */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        if (!journeyRef.current || !lineRef.current) { ticking = false; return; }
        const { top, height } = journeyRef.current.getBoundingClientRect();
        const pct = Math.min(1, Math.max(0, (-top + window.innerHeight * 0.15) / (height - window.innerHeight * 0.3 || 1)));
        lineRef.current.style.transform = `scaleY(${pct})`;
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback(id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
  }, []);

  const openProject = useCallback(i => setModal(projects[i]), []);
  const closeProject = useCallback(() => setModal(null), []);

  return (
    <>
      <Preloader loading={loading} />
      <ScrollProgress />
      <CustomCursor />
      <ScanlineOverlay />

      <div className="min-h-screen bg-wqf-dark text-wqf-light relative overflow-x-hidden cursor-none font-sans">
        {/* subtle vignette — pointer-events:none is enforced in CSS */}
        <div className="wqf-vignette fixed inset-0" />
        <ParticleGrid />
        <TopNav activeSection={activeSection} scrollToSection={scrollTo} />

        {/* ════════════════ HERO ════════════════════════════════════ */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
          {/* corner metadata — desktop only */}
          <div className="absolute top-20 left-6 text-[10px] font-mono text-wqf-light/50 uppercase tracking-widest hidden xl:block select-none">
            <div>30.7333° N / 76.7794° E</div>
            <div className="mt-1 text-wqf-teal/70">Punjab, IN</div>
          </div>
          <div className="absolute top-20 right-6 text-[10px] font-mono text-wqf-light/50 uppercase tracking-widest text-right hidden xl:block select-none">
            <div>Portfolio v3.0 · 2026</div>
            <div className="mt-1 text-wqf-teal/70">Open to Work ✦</div>
          </div>

          <div ref={heroRef} className="relative z-10 text-center px-4 sm:px-6 max-w-6xl w-full">
            <ScrollReveal animation="fade-down" delay={0}>
              <div className="flex flex-col items-center mb-8 gap-4 px-2">
                <div className="flex flex-wrap justify-center items-center gap-2 px-3 sm:px-4 py-2 bg-wqf-gray border border-wqf-teal/30 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-wqf-teal glass-terminal">
                  <span className="w-1.5 h-1.5 bg-wqf-teal rounded-full animate-pulse" />
                  System Status: Online
                  <span className="hidden sm:inline opacity-20">|</span>
                  <div className="sm:hidden w-full h-0" /> {/* mobile break */}
                  Node: k8s-master
                  <span className="opacity-20">|</span>
                  Region: IN-NORTH
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-wqf-gray border border-wqf-teal/30 text-xs font-black uppercase tracking-widest text-wqf-teal">
                  <span className="w-1.5 h-1.5 bg-wqf-teal rounded-full animate-pulse" />
                  Available for opportunities · 2026
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <h1 className="hero-name text-transparent bg-clip-text bg-gradient-to-r from-white via-wqf-teal to-wqf-light mb-1 select-none drop-shadow-2xl leading-[0.8]">AADI</h1>
              <h1 className="hero-name mb-6 sm:mb-8 drop-shadow-[0_0_15px_rgba(92,147,159,0.5)] leading-[0.8]">
                <GlitchText text="JAIN" className="text-wqf-teal" />
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={250}>
              <div className="text-base sm:text-lg md:text-xl text-wqf-light mb-8 font-mono tracking-wide glass-terminal p-4 rounded-lg inline-block">
                <span className="text-wqf-teal font-bold">aadi@k8s:</span><span className="text-wqf-orange font-bold">~</span><span className="text-wqf-light/70">$</span><span className="text-wqf-light"> deploy --role=</span>
                <TypewriterText
                  phrases={['"Cloud & DevOps Engineer"', '"Full Stack Developer"', '"AWS Cloud Engineer"', '"K8s Engineer"', '"SRE"']}
                  className="text-wqf-teal font-bold"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={370}>
              <div className="max-w-xl mx-auto mb-12 px-4 text-left">
                <div className="glass-terminal p-4 rounded-md shadow-lg font-mono text-xs sm:text-sm">
                  <div className="flex gap-1.5 mb-2 border-b border-wqf-teal/10 pb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="text-wqf-light/90 leading-relaxed">
                    <span className="text-wqf-teal">❯</span> Building reliable cloud architectures and intuitive full-stack systems —<br />
                    <span className="text-wqf-teal">❯</span> turning complex infrastructure into elegant, scalable solutions.
                    <span className="inline-block w-2 h-4 bg-wqf-teal ml-1 animate-pulse align-middle"></span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={460}>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-12">
                <button onClick={() => scrollTo('contact')}
                  className="px-8 sm:px-10 py-4 bg-wqf-teal text-wqf-dark font-black uppercase tracking-widest hover:bg-wqf-light transition-colors text-sm w-full sm:w-auto">
                  Get In Touch
                </button>
                <button onClick={() => scrollTo('projects')}
                  className="px-8 sm:px-10 py-4 bg-transparent border border-wqf-gray text-white font-black uppercase tracking-widest hover:border-wqf-teal hover:text-wqf-teal transition-colors text-sm w-full sm:w-auto">
                  View Work →
                </button>
              </div>
            </ScrollReveal>

            <button onClick={() => scrollTo('about')}
              className="flex flex-col items-center gap-1 mx-auto text-wqf-light/30 text-xs uppercase tracking-widest hover:text-wqf-teal transition-colors animate-bounce">
              <ChevronDown size={18} />
            </button>
          </div>
        </section>

        <TechMarquee />

        {/* ════════════════ ABOUT ════════════════════════════════════ */}
        <section id="about" className="section-pad px-4 sm:px-6 bg-wqf-dark">
          <div className="max-w-7xl mx-auto">
            <SectionHeading label="Who I Am" heading="About" accent="Me" />

            <div className="grid md:grid-cols-12 border border-wqf-gray">
              {/* Photo */}
              <ScrollReveal animation="fade-right" className="md:col-span-4">
                <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-wqf-gray flex flex-col items-center text-center relative group h-full">
                  <div className="absolute top-0 left-0 w-0 h-0.5 bg-wqf-teal group-hover:w-full transition-all duration-700" />
                  <div className="relative inline-block mb-6">
                    <img src="logo.png" alt="Aadi Jain"
                      className="w-36 h-36 md:w-40 md:h-40 object-cover border-4 border-wqf-gray grayscale hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-wqf-teal -z-10" />
                    <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-wqf-orange" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-widest mb-1">Aadi Jain</h3>
                  <p className="text-wqf-teal font-bold tracking-widest uppercase text-xs mb-6">Cloud & DevOps · Full Stack Dev</p>
                  <div className="flex gap-3 flex-wrap justify-center">
                    {[
                      { href: 'https://github.com/Aadi1903', icon: Github },
                      { href: 'https://linkedin.com/in/aadi-jain01/', icon: Linkedin },
                      { href: 'mailto:aadiijain03@gmail.com', icon: Mail },
                      { href: 'https://leetcode.com/u/Aadi0324/', icon: Code },
                    ].map(({ href, icon: Icon }, i) => (
                      <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                        className="p-3 bg-wqf-gray border border-wqf-gray hover:border-wqf-teal hover:text-wqf-teal text-wqf-light/50 transition-all">
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Bio */}
              <ScrollReveal animation="fade-left" className="md:col-span-8">
                <div className="p-8 md:p-10 h-full flex flex-col gap-8 relative group">
                  <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-wqf-orange group-hover:w-full transition-all duration-700" />
                  <div className="bg-[#111] border border-wqf-gray p-5 font-mono text-sm sm:text-base relative shadow-lg">
                    <div className="flex items-center justify-between mb-4 border-b border-wqf-gray pb-2">
                      <span className="text-[10px] text-wqf-light/40 uppercase tracking-widest">cat ~/about_me.txt</span>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                      </div>
                    </div>
                    <div className="text-wqf-light/90 leading-relaxed">
                      I'm a 3rd-year Computer Science student who loves turning ideas into scalable cloud-powered systems.
                      <br /><br />
                      From AWS and Kubernetes to Java backend development, I craft solutions that are efficient, reliable,
                      and meaningful. <span className="text-wqf-teal font-semibold">Always learning. Always building.</span>
                      <span className="inline-block w-2.5 h-4 bg-wqf-teal ml-1 animate-pulse align-middle"></span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 border border-wqf-gray">
                    {[{ v: '10+', l: 'Projects' }, { v: '3+', l: 'Certifications' }, { v: '15+', l: 'Technologies' }].map(({ v, l }) => (
                      <div key={l} className="p-4 md:p-6 border-r border-wqf-gray last:border-r-0 text-center hover:bg-wqf-gray transition-colors">
                        <div className="text-2xl md:text-3xl font-black text-wqf-teal mb-1">{v}</div>
                        <div className="text-[10px] md:text-xs text-wqf-light/40 uppercase tracking-widest font-bold">{l}</div>
                      </div>
                    ))}
                  </div>
                  <a href="/Aadi Jain-CV.pdf" download
                    className="inline-flex w-fit items-center gap-3 px-6 py-3 border border-wqf-gray hover:border-wqf-teal hover:text-wqf-teal text-wqf-light/50 text-xs font-black uppercase tracking-widest transition-all">
                    <Download size={14} /> Download Full CV
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ════════════════ SKILLS ════════════════════════════════════ */}
        <section id="skills" className="section-pad px-4 sm:px-6 bg-[#0a0a0a] border-y border-wqf-gray">
          <div className="max-w-7xl mx-auto">
            <SectionHeading label="What I Know" heading="Technical" accent="Expertise" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 border border-wqf-gray">
              {skills.map((cat, ci) => (
                <ScrollReveal key={ci} animation="fade-up" delay={ci * 100}>
                  <TiltCard className="h-full">
                    <div className="p-8 border-b sm:border-r border-wqf-gray group relative overflow-hidden h-full">
                      <div className="absolute top-0 left-0 w-0 h-0.5 bg-wqf-teal group-hover:w-full transition-all duration-500" />
                      <div className="text-4xl font-black text-wqf-gray/40 mb-4 font-mono leading-none">0{ci + 1}</div>
                      <h3 className="text-sm font-black mb-6 text-white uppercase tracking-widest border-b border-wqf-gray pb-4">{cat.category}</h3>
                      <div className="space-y-3">
                        {cat.items.map((skill, si) => (
                          <div key={si} className="flex items-center gap-3 py-1 hover:bg-wqf-gray px-2 -mx-2 transition-colors group/s">
                            <skill.icon size={15} className="text-wqf-teal/60 flex-shrink-0 group-hover/s:text-wqf-orange transition-colors" />
                            <span className="text-sm font-bold text-wqf-light/70 uppercase tracking-wide flex-1 group-hover/s:text-white transition-colors">{skill.name}</span>
                            <div className="w-16 h-px bg-wqf-gray overflow-hidden flex-shrink-0">
                              <div className="h-full bg-wqf-teal/30 group-hover/s:bg-wqf-teal transition-colors duration-500" style={{ width: `${65 + si * 7}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ PROJECTS ══════════════════════════════════ */}
        <section id="projects" className="section-pad px-4 sm:px-6 bg-wqf-dark">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12 md:mb-16 flex-wrap gap-4">
              <ScrollReveal animation="fade-right">
                <div>
                  <div className="text-wqf-orange text-xs font-black uppercase tracking-widest mb-3">— Selected Work</div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
                    Featured <span className="text-wqf-teal">Projects</span>
                  </h2>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="fade-left">
                <div className="text-right">
                  <div className="text-4xl md:text-5xl font-black text-wqf-gray/30 font-mono">{String(projects.length).padStart(2, '0')}</div>
                  <div className="text-xs font-black uppercase tracking-widest text-wqf-light/30">Projects</div>
                </div>
              </ScrollReveal>
            </div>
            <ProjectList projects={projects} openProject={openProject} />
          </div>
        </section>

        <TechMarquee />

        {/* ════════════════ CERTIFICATIONS ════════════════════════════ */}
        <section id="certifications" className="section-pad px-4 sm:px-6 bg-[#0a0a0a] border-y border-wqf-gray">
          <div className="max-w-7xl mx-auto">
            <SectionHeading label="My Credentials" heading="Certifications" accent="&amp; Badges" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 border border-wqf-gray">
              {certifications.map((cert, idx) => (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
                  <TiltCard className="h-full">
                    <div className={`flex flex-col p-8 border-b sm:border-r border-wqf-gray group relative overflow-hidden h-full ${cert.highlight ? 'bg-wqf-teal/5' : ''}`}>
                      {cert.highlight && <div className="absolute top-0 left-0 right-0 h-0.5 bg-wqf-teal" />}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-wqf-orange group-hover:w-full transition-all duration-500" />
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-wqf-gray text-wqf-teal group-hover:text-wqf-orange transition-colors flex-shrink-0">
                          <cert.icon size={22} />
                        </div>
                        <div>
                          <h3 className="text-sm font-black text-white uppercase tracking-wide leading-tight">{cert.title}</h3>
                          <p className="text-xs text-wqf-teal font-bold mt-1 tracking-widest uppercase">{cert.organization}</p>
                        </div>
                      </div>
                      <p className="text-wqf-light/60 text-sm leading-relaxed flex-grow mb-6">{cert.description}</p>
                      <div className="flex items-center justify-between flex-wrap gap-3 mt-auto">
                        <span className="text-xs font-black text-wqf-dark bg-wqf-light py-1 px-3 uppercase tracking-widest">{cert.issueDate}</span>
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ JOURNEY ═══════════════════════════════════ */}
        <section id="journey" className="section-pad px-4 sm:px-6 bg-wqf-dark border-y border-wqf-gray">
          <div className="max-w-5xl mx-auto" ref={journeyRef}>
            <SectionHeading label="My Story" heading="Career" accent="Journey" />
            <div className="relative">
              {/* Timeline line — hidden on mobile */}
              <div ref={lineRef}
                className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-wqf-teal hidden md:block"
                style={{ transformOrigin: 'top', transform: 'scaleY(0)' }}
              />

              {journey.map((item, idx) => (
                <ScrollReveal key={idx} animation={idx % 2 === 0 ? 'fade-right' : 'fade-left'} delay={idx * 80}>
                  {/* MOBILE: simple stacked card */}
                  <div className="mb-10 md:hidden">
                    <TiltCard>
                      <div className="p-6 border border-wqf-gray hover:border-wqf-teal transition-colors group relative bg-transparent">
                        <div className="absolute top-0 left-0 w-0 h-0.5 bg-wqf-orange group-hover:w-full transition-all duration-500" />
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-wqf-gray border border-wqf-teal">
                            <item.icon size={14} className="text-wqf-teal" />
                          </div>
                          <div className="text-wqf-teal font-black text-xs tracking-widest uppercase">[ {item.year} ]</div>
                        </div>
                        <h3 className="text-base font-black mb-2 text-white uppercase tracking-wide">{item.title}</h3>
                        <div className="bg-[#111] p-3 rounded font-mono text-xs border border-wqf-gray/50 text-wqf-light/90 shadow-inner">
                          <span className="text-wqf-teal mr-2">❯</span>{item.desc}
                        </div>
                      </div>
                    </TiltCard>
                  </div>

                  {/* DESKTOP: alternating timeline */}
                  <div className={`mb-14 hidden md:flex ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center relative`}>
                    <div className="w-1/2" />
                    <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 z-10 bg-wqf-dark border-2 border-wqf-teal flex items-center justify-center">
                      <item.icon size={15} className="text-wqf-teal" />
                    </div>
                    <TiltCard className={`w-1/2 ${idx % 2 === 0 ? 'ml-12' : 'mr-12'}`}>
                      <div className="p-7 border border-wqf-gray hover:border-wqf-teal transition-colors group relative bg-transparent">
                        <div className="absolute top-0 left-0 w-0 h-0.5 bg-wqf-orange group-hover:w-full transition-all duration-500" />
                        <div className="text-wqf-teal font-black text-xs tracking-widest uppercase mb-2">[ {item.year} ]</div>
                        <h3 className="text-lg font-black mb-3 text-white uppercase tracking-wide">{item.title}</h3>
                        <div className="bg-[#111] p-4 rounded font-mono text-sm border border-wqf-gray/50 text-wqf-light/90 shadow-inner mt-2">
                          <span className="text-wqf-teal mr-2">❯</span>{item.desc}
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ CONTACT ═══════════════════════════════════ */}
        <section id="contact" className="section-pad px-4 sm:px-6 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto">
            <SectionHeading label="Let's Talk" heading="Get In" accent="Touch" />
            <div className="grid md:grid-cols-5 border border-wqf-gray">
              {/* Info */}
              <ScrollReveal animation="fade-right" className="md:col-span-2">
                <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-wqf-gray h-full relative group">
                  <div className="absolute top-0 left-0 w-0 h-0.5 bg-wqf-teal group-hover:w-full transition-all duration-700" />

                  <div className="bg-[#111] border border-wqf-gray p-4 font-mono text-xs mb-8">
                    <div className="flex gap-1.5 mb-2 border-b border-wqf-gray pb-2">
                      <div className="w-2 h-2 rounded-full bg-wqf-teal/40"></div>
                      <div className="w-2 h-2 rounded-full bg-wqf-orange/40"></div>
                    </div>
                    <p className="text-wqf-light/90 leading-relaxed">
                      <span className="text-wqf-teal font-bold">$ echo</span> "Open to internships, full-time roles, and exciting side projects.<br />
                      Always happy to have a conversation."
                      <span className="inline-block w-1.5 h-3 bg-wqf-gray ml-1 animate-pulse align-middle"></span>
                    </p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Email', value: 'aadiijain03@gmail.com', href: 'mailto:aadiijain03@gmail.com' },
                      { label: 'LinkedIn', value: '/in/aadi-jain01', href: 'https://linkedin.com/in/aadi-jain01/' },
                      { label: 'GitHub', value: '/Aadi1903', href: 'https://github.com/Aadi1903' },
                    ].map(({ label, value, href }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                        className="flex items-start gap-3 group/l hover:text-wqf-teal transition-colors">
                        <span className="text-xs font-black uppercase tracking-widest text-wqf-gray w-20 flex-shrink-0 pt-0.5">{label}</span>
                        <span className="text-xs text-wqf-light/80 group-hover/l:text-wqf-teal transition-colors font-mono flex items-center gap-1 break-all">
                          {value} <ArrowUpRight size={10} className="flex-shrink-0" />
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Form */}
              <ScrollReveal animation="fade-left" className="md:col-span-3">
                <form action="https://api.web3forms.com/submit" method="POST" className="p-8 md:p-10 space-y-8 relative group">
                  <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-wqf-orange group-hover:w-full transition-all duration-700" />
                  <input type="hidden" name="access_key" value="950c6c6e-ae89-419a-adaf-9a0629049476" />
                  <div className="grid sm:grid-cols-2 gap-8">
                    {[{ f: 'name', t: 'text' }, { f: 'email', t: 'email' }].map(({ f, t }) => (
                      <div key={f}>
                        <label className="block mb-2 text-[10px] font-black uppercase tracking-widest text-wqf-light/40">{f}</label>
                        <input type={t} name={f} required
                          className="w-full px-0 py-3 bg-transparent border-b-2 border-wqf-gray focus:outline-none focus:border-wqf-teal transition-colors text-white placeholder-wqf-light/40 font-mono text-sm caret-wqf-orange"
                          placeholder={`Your ${f}`} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block mb-2 text-[10px] font-black uppercase tracking-widest text-wqf-light/50">Message</label>
                    <textarea rows="4" name="message" required
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-wqf-gray focus:outline-none focus:border-wqf-teal transition-colors text-white resize-none placeholder-wqf-light/40 font-mono text-sm caret-wqf-orange"
                      placeholder="Your message..." />
                  </div>
                  <button type="submit"
                    className="w-full px-10 py-4 bg-wqf-teal text-wqf-dark font-black uppercase tracking-widest hover:bg-wqf-light transition-colors text-sm flex items-center justify-center gap-3 group/btn">
                    Transmit Message
                    <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
                  </button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ════════════════ FOOTER ════════════════════════════════════ */}
        <footer className="bg-wqf-dark py-8 border-t border-wqf-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 border border-wqf-teal flex items-center justify-center font-black text-wqf-teal text-xs">AJ</div>
              <span className="text-wqf-light/60 text-xs font-black uppercase tracking-widest">Aadi Jain © 2026</span>
            </div>
            <p className="text-wqf-light/40 text-xs uppercase tracking-widest">Engineered for Performance & Scale</p>
            <GlitchText text="@AADI1903" className="text-wqf-gray/60 text-xs font-black tracking-widest uppercase" />
          </div>
        </footer>
      </div>

      <ProjectModal project={modalProject} onClose={closeProject} />
    </>
  );
};

export default Portfolio;