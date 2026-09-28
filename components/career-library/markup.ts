// Body markup of the Career Garage Career Library prototype (index.html).
// Rendered once by career-library.tsx; library-app.js wires it up.
export const libraryMarkup = `<div class="announcement">Career Garage Career Library <span>•</span> Explore. Compare. Plan. Build.</div>
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Career Garage home">
      <span class="brand-mark">CG</span>
      <span class="brand-copy"><strong>Career Garage</strong><small>Career Library</small></span>
    </a>
    <nav class="desktop-nav">
      <a href="#library">Explore Careers</a>
      <a href="#categories">Categories</a>
      <a href="#future">Future Careers</a>
      <button class="nav-link" id="openSavedBtn">Saved <span id="savedCount">0</span></button>
    </nav>
    <button class="primary-btn compact" id="assessmentBtn">Find My Career</button>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-orb orb-one"></div><div class="hero-orb orb-two"></div>
      <div class="hero-inner">
        <div class="eyebrow">CAREER GARAGE CAREER UNIVERSE</div>
        <h1>Discover the career that<br/><span>fits your future.</span></h1>
        <p>Explore careers, pathways, courses, exams, skills and opportunities in one intelligent career discovery library.</p>
        <div class="search-shell">
          <span class="search-icon">⌕</span>
          <input id="heroSearch" type="search" placeholder="Search career, field, skill or industry…" autocomplete="off" />
          <button id="heroSearchBtn">Search careers</button>
          <div id="searchSuggestions" class="suggestions hidden"></div>
        </div>
        <div class="quick-links">
          <span>Popular:</span>
          <button data-search="Artificial Intelligence Engineer">AI Engineer</button>
          <button data-search="Clinical Psychologist">Psychologist</button>
          <button data-search="Chartered Accountant">CA</button>
          <button data-search="Commercial Pilot">Pilot</button>
          <button data-search="Civil Services Officer">Civil Services</button>
        </div>
        <div class="hero-metrics">
          <div><strong id="careerMetric">120+</strong><span>Career profiles</span></div>
          <div><strong>30+</strong><span>Career families</span></div>
          <div><strong>1</strong><span>Integrated career journey</span></div>
        </div>
      </div>
    </section>

    <section class="journey-strip">
      <div class="journey-item"><b>01</b><span><strong>Discover</strong><small>Explore possibilities</small></span></div>
      <i>→</i>
      <div class="journey-item"><b>02</b><span><strong>Compare</strong><small>Understand differences</small></span></div>
      <i>→</i>
      <div class="journey-item"><b>03</b><span><strong>Assess</strong><small>Match your strengths</small></span></div>
      <i>→</i>
      <div class="journey-item"><b>04</b><span><strong>Plan</strong><small>Build your pathway</small></span></div>
      <i>→</i>
      <div class="journey-item"><b>05</b><span><strong>Experience</strong><small>Learn, intern & connect</small></span></div>
    </section>

    <section class="section categories" id="categories">
      <div class="section-heading">
        <div><span class="eyebrow dark">BROWSE YOUR WAY</span><h2>Explore by career family</h2></div>
        <p>Start broad, then narrow down to the roles that match your interests.</p>
      </div>
      <div id="categoryTiles" class="category-tiles"></div>
    </section>

    <section class="section future-banner" id="future">
      <div>
        <span class="eyebrow">CAREERS OF THE FUTURE</span>
        <h2>Explore roles being shaped by AI, climate tech, space, robotics and the new economy.</h2>
      </div>
      <button class="light-btn" data-category="Emerging & Future Careers">Explore future careers →</button>
    </section>

    <section class="library section" id="library">
      <div class="section-heading library-heading">
        <div><span class="eyebrow dark">CAREER DIRECTORY</span><h2>Find your next possibility</h2></div>
        <div class="result-meta"><strong id="resultCount">0</strong> careers found</div>
      </div>
      <div class="library-layout">
        <aside class="filters">
          <div class="filter-title"><strong>Filters</strong><button id="clearFilters">Clear all</button></div>
          <label class="filter-label">Search</label>
          <div class="mini-search"><span>⌕</span><input id="librarySearch" placeholder="Career or keyword" /></div>

          <label class="filter-label">Career family</label>
          <select id="categoryFilter"><option value="">All career families</option></select>

          <label class="filter-label">Recommended stream</label>
          <select id="streamFilter">
            <option value="">All streams</option><option>Any Stream</option><option>PCM</option><option>PCB</option><option>Commerce</option><option>Humanities</option><option>Arts / Design</option>
          </select>

          <label class="filter-label">Future outlook</label>
          <select id="growthFilter">
            <option value="">All outlooks</option><option>Very High</option><option>High</option><option>Stable</option><option>Competitive</option>
          </select>

          <label class="filter-label">Work style</label>
          <select id="workFilter">
            <option value="">All work styles</option><option>Technology</option><option>People</option><option>Creative</option><option>Field</option><option>Research</option><option>Business</option>
          </select>

          <div class="filter-cta">
            <span>Not sure what to filter?</span>
            <strong>Let your assessment guide you.</strong>
            <button id="sidebarAssessment">Take Career Assessment →</button>
          </div>
        </aside>

        <div class="results-area">
          <div class="toolbar">
            <div id="activeFilters" class="active-filters"></div>
            <label>Sort by <select id="sortSelect"><option value="popularity">Popularity</option><option value="name">Name A–Z</option><option value="growth">Future outlook</option></select></label>
          </div>
          <div id="careerGrid" class="career-grid"></div>
          <button id="loadMoreBtn" class="load-more">Load more careers</button>
        </div>
      </div>
    </section>

    <section class="section ecosystem">
      <div class="ecosystem-copy">
        <span class="eyebrow dark">MORE THAN A LIBRARY</span>
        <h2>Turn career information into a real action plan.</h2>
        <p>Every Career Garage profile is designed to connect discovery with assessments, counselling, courses, scholarships, internships, mentorship and community support.</p>
        <button class="primary-btn" id="ecosystemAssessment">Build my career plan</button>
      </div>
      <div class="ecosystem-map">
        <div class="eco-node core">Career<br/>Library</div>
        <div class="eco-node n1">Assessment</div><div class="eco-node n2">Counselling</div><div class="eco-node n3">Courses</div><div class="eco-node n4">Scholarships</div><div class="eco-node n5">Internships</div><div class="eco-node n6">Mentors</div><div class="eco-node n7">Connect</div>
      </div>
    </section>
  </main>

  <div id="compareTray" class="compare-tray hidden">
    <div><strong>Compare careers</strong><span id="compareHint">Choose up to 3 careers</span></div>
    <div id="compareItems" class="compare-items"></div>
    <button id="compareNowBtn" class="primary-btn compact" disabled>Compare</button>
    <button id="clearCompareBtn" class="icon-btn">×</button>
  </div>

  <div id="modalBackdrop" class="modal-backdrop hidden"></div>
  <section id="careerModal" class="career-modal hidden" aria-modal="true" role="dialog"></section>
  <section id="compareModal" class="career-modal compare-modal hidden" aria-modal="true" role="dialog"></section>
  <div id="toast" class="toast hidden"></div>
`;
