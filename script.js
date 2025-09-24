// --- Data (edit these) ---------------------------------------------------
const BIO = `
I am a PhD student in Computer Science at <a href="https://ucr.edu/" target="_blank">UC Riverside</a>.<br>
My research interests span high-performance networking and operating systems.<br>
I am fortunate to be advised by <a href="https://kknetsyslab.cs.ucr.edu/" target="_blank">Prof. K. K. Ramakrishnan</a>.
`;

const EDUCATION = [
    { 
        degree: "Ph.D., Computer Science", 
        place: {
            name: "UC Riverside",
            url: "https://ucr.edu",
        }, 
        years: "2025–present",
        advisors: [
            { name: "Prof. K. K. Ramakrishnan", url: "https://kknetsyslab.cs.ucr.edu/" },
        ]
    },
    { 
        degree: "B. Tech., Computer Science", 
        place: {
            name: "IIT Bhubaneswar",
            url: "https://iitbbs.ac.in",
        }, 
        years: "2017–2021",
        advisors: [
            { name: "Prof. Sudipta Saha", url: "https://secs.iitbbs.ac.in/index.php/sudipta/" },
        ]
    },
];

const EXPERIENCE = [
    { role: "Software Engineer", org: {name: "Narrative (Y-Combinator'23)", url: "https://www.trynarrative.com/"}, years: "2024–2025", blurb: "Worked on ML pipelines and AI-agents for automated QA of web applications." },
    { role: "Software Engineer", org: {name: "D. E. Shaw & Co.", url: "https://www.deshawindia.com/"}, years: "2021–2023", blurb: "Worked on Data and Analytics infrastructure for Human Capital datasets." },
];

const PUBLICATIONS = [
    {
        title: "Concurrent transmission for multi-robot coordination",
        authors: "Sourabha Bharadwaj, Karunakar Gonnabathula, Sudipta Saha, Chayan Sarkar, Rekha Raja",
        venue: "CCNC 2022",
        links: { pdf: "https://arxiv.org/pdf/2112.00273" }
    },
];

// BLOG INDEX now links out to Medium (no in-page rendering)
const POSTS = [
  { title: "Hello, World (PhD)", date: "2025-09-01", url: "https://medium.com/@your-handle/hello-world" , excerpt: "Why I started this blog and what I plan to write about." },
  { title: "Notes on Systems Reading", date: "2025-09-15", url: "https://medium.com/@your-handle/reading-notes", excerpt: "A lightweight method for reading and retaining systems papers." },
];

// --- Render helpers ------------------------------------------------------
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children])
    .filter(Boolean)
    .forEach(ch => node.appendChild(typeof ch === 'string' ? document.createTextNode(ch) : ch));
  return node;
}

function link(href, text) {
  const a = document.createElement('a');
  a.href = href; a.textContent = text; a.target = '_blank'; a.rel = 'noopener';
  return a;
}

function renderHome() {
  const center = document.getElementById('center');
  const right = document.getElementById('right');

  // Center content
  center.innerHTML = '';

  // About (BIO as HTML so <a> tags work)
  center.appendChild(el('section', { class: 'card' }, [
    el('h2', {}, ['About']),
    el('p', { html: BIO.trim() })
  ]));

  // Education
  center.appendChild(el('section', { class: 'card' }, [
    el('h2', {}, ['Education']),
    el('ul', { class: 'list' }, EDUCATION.map(e => {
      const li = el('li');
      const line = el('div');
      line.append(
        document.createTextNode(`${e.degree}, `),
        link(e.place.url, e.place.name),
        document.createTextNode(` — ${e.years}`)
      );
      li.appendChild(line);
      if (e.advisors && e.advisors.length) {
        const sub = el('ul', { class: 'list' }, e.advisors.map(a => {
          const s = el('li');
          s.append('Advisor: ');
          s.append(link(a.url, a.name));
          return s;
        }));
        li.appendChild(sub);
      }
      return li;
    }))
  ]));

  // Experience
  center.appendChild(el('section', { class: 'card' }, [
    el('h2', {}, ['Experience']),
    el('ul', { class: 'list' }, EXPERIENCE.map(x => {
      const li = el('li');
      const line = el('div');
      line.append(
        document.createTextNode(`${x.role}, `),
        link(x.org.url, x.org.name),
        document.createTextNode(` — ${x.years}`)
      );
      const blurb = el('div', { class: 'muted' }, [ x.blurb ]);
      li.append(line, blurb);
      return li;
    }))
  ]));

  // Right publications
  right.innerHTML = '';
  right.appendChild(el('div', { class: 'card' }, [
    el('h2', {}, ['Latest Publications']),
    ...PUBLICATIONS.map(p => el('article', { class: 'pub' }, [
      el('div', { class: 'pub-title' }, [ p.title ]),
      el('div', { class: 'pub-authors muted' }, [ p.authors ]),
      el('div', { class: 'pub-venue' }, [ p.venue ]),
      el('div', {}, [
        p.links?.pdf ? el('a', { href: p.links.pdf, target: '_blank', rel: 'noopener' }, ['PDF']) : null,
        (p.links?.pdf && p.links?.code) ? document.createTextNode(' · ') : null,
        p.links?.code ? el('a', { href: p.links.code, target: '_blank', rel: 'noopener' }, ['Code']) : null
      ])
    ]))
  ]));

  right.style.display = '';
}

function renderBlogIndex() {
  const center = document.getElementById('center');
  const right = document.getElementById('right');

  center.innerHTML = '';
  center.appendChild(el('section', { class: 'card' }, [
    el('h2', {}, ['Blog (WIP!)']),
    ...POSTS.map(post => el('div', { class: 'post' }, [
      el('div', { style: 'font-weight:600' }, [ post.title ]),
      el('div', { class: 'muted' }, [ new Date(post.date).toDateString() ]),
      el('p', {}, [ post.excerpt ]),
      // Direct to Medium (new tab)
      el('a', { href: post.url, target: '_blank', rel: 'noopener' }, ['Read on Medium →'])
    ]))
  ]));

  // Hide right column to give focus to blog content
  right.style.display = 'none';
}

function route() {
  const hash = (location.hash || '#home').toLowerCase();
  if (hash.startsWith('#blog')) {
    renderBlogIndex();
  } else {
    renderHome();
  }
}

window.addEventListener('hashchange', route);
document.addEventListener('DOMContentLoaded', route);

