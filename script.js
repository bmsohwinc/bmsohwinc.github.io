// --- Data (edit these) ---------------------------------------------------
const BIO = `
I am a Computer Science PhD student at <a href="https://ucr.edu/" target="_blank">UC Riverside</a> interested in high-performance networking and operating systems.<br>
I am fortunate to be advised by <a href="https://kknetsyslab.cs.ucr.edu/" target="_blank">Prof. K. K. Ramakrishnan</a>.
`;

const CURRENT_RESEARCH = `
My current work explores high-speed packet processing with DPDK and reducing data movement across network functions using OpenNetVM. I am also studying multi-agent systems.
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
            url: "https://www.iitbbs.ac.in/",
        }, 
        years: "2017–2021",
        advisors: [
            { name: "Prof. Sudipta Saha", url: "https://sites.google.com/iitbbs.ac.in/sudiptasaha" },
        ]
    },
];

const EXPERIENCE = [
    { role: "Software Engineer", org: {name: "Narrative (Y Combinator '23)", url: "https://www.trynarrative.com/"}, years: "2024–2025", blurb: "Built Django/Python data pipelines and quality checks for 22 freight carriers and $20M in monthly invoices; shipped invoice workflows saving a client about $75K per month; integrated Textract and LLM-based invoice parsing." },
    { role: "Software Engineer", org: {name: "D. E. Shaw & Co.", url: "https://www.deshawindia.com/"}, years: "2021–2023", blurb: "Built Java/SQL ETL pipelines, GraphQL APIs, and React analytics for human-capital data; replaced five years of manual attrition reporting with automated reports and improved pivot-table computation by 30%." },
];

const PUBLICATIONS = [
    {
        title: "Concurrent transmission for multi-robot coordination",
        authors: "Sourabha Bharadwaj, Karunakar Gonnabathula, Sudipta Saha, Chayan Sarkar, Rekha Raja",
        venue: "IEEE CCNC / RoboCom 2022",
        award: "Best Paper Award",
        coverage: [
          { name: "TechXplore", url: "https://techxplore.com/news/2022-01-concurrent-transmission-strategy-multi-robot-cooperation.html" },
          { name: "NewsAzi" },
        ],
        links: { pdf: "https://arxiv.org/pdf/2112.00273" }
    },
];

// Blog posts link to local pages.
const POSTS = [
  { title: "Mininet on Apple M4 using UTM with Ubuntu 24.04", date: "2026-08-09", url: "blog/mininet/guide.html", excerpt: "A guide to setting up Mininet on Apple M4 using UTM with Ubuntu 24.04." },
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

  center.appendChild(el('section', { class: 'card' }, [
    el('h2', {}, ['Current Research']),
    el('p', {}, [CURRENT_RESEARCH.trim()])
  ]));

  // Education
  center.appendChild(el('section', { class: 'card' }, [
    el('h2', {}, ['Education']),
    el('ul', { class: 'list' }, EDUCATION.map(e => {
      const li = el('li');
      const line = el('div');
      line.append(
        document.createTextNode(`${e.degree}, `),
        link(e.place.url, e.place.name)
      );
      li.append(line, el('div', { class: 'muted date-range' }, [e.years]));
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
    el('h2', {}, ['Work Experience']),
    el('ul', { class: 'list' }, EXPERIENCE.map(x => {
      const li = el('li');
      const line = el('div');
      line.append(
        document.createTextNode(`${x.role}, `),
        link(x.org.url, x.org.name)
      );
      const blurb = el('div', { class: 'muted' }, [ x.blurb ]);
      li.append(line, el('div', { class: 'muted date-range' }, [x.years]), blurb);
      return li;
    }))
  ]));

  // Right publications
  right.innerHTML = '';
  right.appendChild(el('div', { class: 'card' }, [
    el('h2', {}, ['Selected Publications']),
    ...PUBLICATIONS.map(p => el('article', { class: 'pub' }, [
      p.links?.pdf
        ? el('a', { href: p.links.pdf, class: 'pub-title', target: '_blank', rel: 'noopener' }, [p.title])
        : el('div', { class: 'pub-title' }, [p.title]),
      el('div', { class: 'pub-authors muted' }, [ p.authors ]),
      el('div', { class: 'pub-venue' }, [ p.venue ]),
      p.award ? el('div', { class: 'pub-award' }, [p.award]) : null,
      p.coverage?.length ? el('div', { class: 'pub-coverage muted' }, [
        document.createTextNode('Coverage: '),
        ...p.coverage.flatMap((item, index) => [
          index ? document.createTextNode(' · ') : null,
          item.url
            ? el('a', { href: item.url, target: '_blank', rel: 'noopener' }, [item.name])
            : document.createTextNode(item.name)
        ])
      ]) : null
    ]))
  ]));

  right.appendChild(el('div', { class: 'card' }, [
    el('h2', {}, ['Latest Blogs']),
    ...[...POSTS]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(post => el('article', { class: 'pub' }, [
        el('a', { href: post.url, class: 'pub-title' }, [post.title]),
        el('div', { class: 'muted post-date' }, [new Date(post.date).toDateString()])
      ]))
  ]));

  right.style.display = '';
}

function renderBlogIndex() {
  const center = document.getElementById('center');
  const right = document.getElementById('right');

  center.innerHTML = '';
  center.appendChild(el('section', { class: 'card' }, [
    el('h2', {}, ['Blog']),
    ...POSTS.map(post => el('div', { class: 'post' }, [
      el('div', { style: 'font-weight:600' }, [ post.title ]),
      el('div', { class: 'muted post-date' }, [ new Date(post.date).toDateString() ]),
      el('p', {}, [ post.excerpt ]),
      el('a', { href: post.url }, ['Read post →'])
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
