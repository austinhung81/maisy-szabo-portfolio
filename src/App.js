// Portfolio.jsx – nav refined: elegant top-right buttons on desktop, Google Fonts now loaded via index.html
import React, { useEffect, useState } from 'react';

const useScrollY = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return y;
};

const ParallaxBlock = ({ color, speed, scrollY }) => (
  <div
    aria-hidden
    className="fixed inset-0 -z-10 will-change-transform"
    style={{ backgroundColor: color, transform: `translateY(${scrollY * speed}px)` }}
  />
);

const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`min-h-screen flex items-center ${className}`}>{children}</section>
);

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const PROJECTS = [
  { title: 'Project Alpha', year: '2024', desc: 'Positioning & naming for a climate‑tech pioneer.' },
  { title: 'Storyline Co.', year: '2023', desc: 'Long‑form editorial for a global creative agency.' },
  { title: 'Nomad Goods', year: '2022', desc: 'Omnichannel launch campaign copy.' },
];

export default function Portfolio() {
  const scrollY = useScrollY();
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handler = () => {
      const found = SECTIONS.find(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 120 && bottom >= 120;
      });
      if (found) setActive(found.id);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="scroll-smooth font-[Inter] selection:bg-red-600 selection:text-white">
      <ParallaxBlock color="#0000ff" speed={0.25} scrollY={scrollY} />
      <ParallaxBlock color="#C10016" speed={0.15} scrollY={scrollY} />

      {/* NAVIGATION: elegant top-right desktop, horizontal scroll mobile */}
      <nav className="fixed z-50 w-full">
        {/* Desktop top-right 
        <div className="hidden md:flex fixed top-6 right-6 gap-8">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`uppercase text-sm tracking-widest px-4 py-2 rounded-full transition-colors backdrop-blur font-medium hover:bg-black hover:text-white ${
                active === id ? 'bg-black text-white' : 'text-neutral-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>*/}

        {/* Mobile horizontal */}
        <div className="fixed top-0 inset-x-0 flex overflow-x-auto gap-6 bg-white/80 backdrop-blur border-b border-gray-200 px-4 py-3 z-50">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`whitespace-nowrap text-sm uppercase tracking-widest transition-colors ${
                active === id ? 'text-red-600 font-semibold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <Section id="home" className="pt-32 md:pt-24">
        <div className="px-6 lg:px-12 w-full text-white">
          <h1 className="text-6xl sm:text-8xl lg:text-[9rem] leading-[0.85] font-black" style={{ fontFamily: 'Playfair Display, serif' }}>
            Maisy&nbsp;Szabó
          </h1>
          <p className="mt-10 max-w-xl text-lg sm:text-2xl text-white/90 font-light">
            Writer / Strategist / Creative.
          </p>
          <button
            onClick={() => scrollTo('work')}
            className="mt-14 inline-flex items-center gap-4 uppercase tracking-widest text-sm font-medium group text-white"
          >
            Explore Work
            <span className="block w-24 h-px bg-white group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </Section>

      <Section id="work" className="bg-white py-32">
        <div className="px-6 lg:px-12 w-full">
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-16" style={{ fontFamily: 'Playfair Display, serif' }}>
            Selected <span className="text-blue-600">Work</span>
          </h2>
          <div className="grid gap-24">
            {PROJECTS.map(({ title, year, desc }) => (
              <article key={title} className="group flex flex-col md:flex-row gap-8 justify-between cursor-pointer">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-semibold group-hover:underline decoration-2 underline-offset-4 mb-3">
                    {title}
                  </h3>
                  <p className="text-neutral-600 max-w-xl">{desc}</p>
                </div>
                <span className="text-lg font-medium text-neutral-500 md:pt-2">{year}</span>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="about" className="py-32 bg-transparent">
        <div className="px-6 lg:px-12 w-full md:w-2/3 lg:w-1/2 text-white md:text-neutral-800">
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-12" style={{ fontFamily: 'Playfair Display, serif' }}>
            About
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            I’m Maisy - a native English content writer and strategist based in Copenhagen. 
          </p>
          <p className="text-lg leading-relaxed">
            With 6+ years of experience in pharma and a background working in London across agency, in-house, and UK government roles, I specialise in creating clear, compelling content that resonates - helping clients communicate with impact.
          </p>
        </div>
      </Section>

      <Section id="contact" className="bg-white py-32">
        <div className="px-6 lg:px-12 w-full text-center">
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-10" style={{ fontFamily: 'Playfair Display, serif' }}>
            Let’s <span className="text-red-600">Talk</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-neutral-700 mb-14">
            I’m always open to new collaborations, projects and conversations. Drop a line or schedule a chat.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a href="mailto:hello@maisyszabo.com" className="px-8 py-4 border border-black rounded-full uppercase text-sm tracking-widest hover:bg-black hover:text-white transition-colors">
              Email Me
            </a>
            <a href="https://calendly.com/maisyszabo/chat" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-red-600 text-white uppercase text-sm tracking-widest hover:bg-red-700 transition-colors">
              Schedule Call
            </a>
          </div>
          <p className="text-sm text-neutral-400">© {new Date().getFullYear()} Maisy Szabó. All rights reserved.</p>
        </div>
      </Section>
    </div>
  );
}
