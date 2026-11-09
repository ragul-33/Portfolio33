/* ---------------------------------------------------------------------------
 * Content data. Repeated content lives here as plain arrays so components stay
 * small and easy to edit. Nothing here is invented proof of work: these are
 * capability statements and descriptions, not client results or statistics.
 *
 * STATUS VOCABULARY — used by the capability lanes and services:
 *   Demonstrated    — visible in the work in this portfolio
 *   Working knowledge — used in practice, at a supported level
 *   Developing      — actively learning, not claimed as expertise
 *   Exploring       — early curiosity, no professional claim
 * ------------------------------------------------------------------------- */

export const CAPABILITIES = [
  {
    id: '01',
    title: 'UI / UX DESIGN',
    note: 'Screens, flows and systems',
    text: 'Structuring interfaces so they stay clear and usable — from first wireframe through to a component library someone else can pick up.',
    glyph: 'grid',
  },
  {
    id: '02',
    title: 'WEB DESIGN',
    note: 'Layout, hierarchy, rhythm',
    text: 'Editorial page layouts that decide what matters first, then make that order impossible to miss on any screen.',
    glyph: 'bars',
  },
  {
    id: '03',
    title: 'WEB DEVELOPMENT',
    note: 'HTML, CSS, JavaScript, React',
    text: 'Turning the design into a real, responsive experience — semantic markup, clean CSS and interactions that stay smooth.',
    glyph: 'brackets',
  },
  {
    id: '04',
    title: 'BRANDING',
    note: 'Marks, type, colour logic',
    text: 'Building identity pieces that belong together: a mark, a typographic voice, a colour system and the rules holding them together.',
    glyph: 'rings',
  },
  {
    id: '05',
    title: 'GRAPHIC DESIGN',
    note: 'Posters, graphics, illustration',
    text: 'Flat communication — layouts, key visuals, vector work and illustration built to carry a message on its own.',
    glyph: 'squares',
  },
  {
    id: '06',
    title: 'INFORMATION DESIGN',
    note: 'Reports, layouts, visual logic',
    text: 'Organising information so the important signal is visible first — the same discipline a clear report or dashboard layout depends on.',
    glyph: 'stack',
  },
  {
    id: '07',
    title: 'CONTENT CREATION',
    note: 'Ideas, assets, storytelling',
    text: 'Working out what to actually say, then designing the assets that let it travel further than a single image.',
    glyph: 'waves',
  },
  {
    id: '08',
    title: 'CREATIVE DIRECTION',
    note: 'Coherence across channels',
    text: 'Keeping one idea intact while it moves between formats, screens and people — so nothing drifts off on the way.',
    glyph: 'orbit',
  },
];

/* ---------------------------------------------------------------------------
 * The three connected practices. Each lane states what is demonstrated, what
 * is working knowledge, and what is still being developed. Honest by design.
 * ------------------------------------------------------------------------- */
export const DISCIPLINES = [
  {
    id: 'data',
    label: 'DATA',
    title: 'Data analysis',
    accent: '#00d2ff',
    glyph: 'bars',
    summary:
      'Reading structure in information — organising it, checking it, and turning patterns into something a person can act on.',
    note: 'A developing practice, built on a foundation of visual structure and documentation.',
    groups: [
      {
        status: 'Working knowledge',
        items: ['Microsoft Excel', 'Spreadsheet organisation', 'Microsoft Office', 'Structured documentation'],
      },
      {
        status: 'Developing',
        items: [
          'Data cleaning & validation',
          'Data structuring',
          'KPI reporting',
          'Dashboard layout concepts',
          'Data visualisation',
          'Pattern identification',
          'Insight summaries',
        ],
      },
    ],
  },
  {
    id: 'business',
    label: 'BUSINESS',
    title: 'Business analysis',
    accent: '#8b7dff',
    glyph: 'orbit',
    summary:
      'Making the problem explicit before solving it — understanding how work moves, who it affects and what a clear requirement looks like.',
    note: 'Developing practical capability through structured research, documentation and process thinking.',
    groups: [
      {
        status: 'Working knowledge',
        items: ['Written communication', 'Structured documentation', 'Google Workspace'],
      },
      {
        status: 'Developing',
        items: [
          'Research & synthesis',
          'Requirements gathering',
          'Stakeholder communication',
          'Process mapping',
          'Workflow analysis',
          'Use-case thinking',
          'Functional documentation',
          'Problem definition',
        ],
      },
    ],
  },
  {
    id: 'creative',
    label: 'CREATIVE',
    title: 'Creative & digital',
    accent: '#7dd3fc',
    glyph: 'grid',
    summary:
      'The visible craft: interfaces, identities and digital experiences, made with an eye for hierarchy, clarity and detail.',
    note: 'Demonstrated across the work in this portfolio.',
    groups: [
      {
        status: 'Demonstrated',
        items: [
          'UI / UX design',
          'Web design',
          'Front-end build',
          'Branding & identity',
          'Graphic design',
          'Social content',
          'Content creation',
          'Creative direction',
        ],
      },
      {
        status: 'Exploring',
        items: ['AI-assisted workflows', 'AI-assisted prototyping'],
      },
    ],
  },
];

/* Real, recognisable tools. No invented software. */
export const TOOLS = [
  {
    id: 'figma',
    name: 'Figma',
    group: 'Interface & systems',
    logo: 'figma',
    text: 'Where the layout work happens — wireframes, components, auto-layout and interactive prototypes in one file.',
    place: [50, 13],
  },
  {
    id: 'illustrator',
    name: 'Adobe Illustrator',
    group: 'Vector & identity',
    logo: 'illustrator',
    text: 'Vector marks, illustration and precise line work, kept editable so the identity can keep growing.',
    place: [82, 27],
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    group: 'Image & compositing',
    logo: 'photoshop',
    text: 'Raster work, compositing and lighting — building atmosphere and texture that vector alone will not give.',
    place: [91, 52],
  },
  {
    id: 'canva',
    name: 'Canva',
    group: 'Quick content',
    logo: 'canva',
    text: 'Quick, clean layouts for the content that has to exist today — social sets, banners, exports in every size.',
    place: [80, 77],
  },
  {
    id: 'html',
    name: 'HTML',
    group: 'Structure',
    logo: 'html',
    text: 'Semantic structure first: correct elements, sensible reading order, markup that holds up to real content.',
    place: [58, 89],
  },
  {
    id: 'css',
    name: 'CSS',
    group: 'Styling & motion',
    logo: 'css',
    text: 'Layout, responsive behaviour and motion — grid and flex done properly, transitions that feel deliberate.',
    place: [36, 80],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    group: 'Behaviour',
    logo: 'javascript',
    text: 'The interaction layer: state, events and small pieces of logic that make an interface respond.',
    place: [19, 58],
  },
  {
    id: 'react',
    name: 'React',
    group: 'Component building',
    logo: 'react',
    text: 'Reusable components so a design system survives outside the tool it was drawn in.',
    place: [20, 28],
  },
  {
    id: 'github',
    name: 'GitHub',
    group: 'Version control',
    logo: 'github',
    text: 'Version history and hosting — the work stays organised and reviewable instead of living in one folder.',
    place: [33, 12],
  },
  {
    id: 'google',
    name: 'Google Workspace',
    group: 'Docs & collaboration',
    logo: 'google',
    text: 'Briefs, feedback, shared files — writing and reviewing in the same place the work lives.',
    place: [10, 38],
  },
  {
    id: 'office',
    name: 'Microsoft Office',
    group: 'Documents & reporting',
    logo: 'office',
    text: 'Excel-based reporting structure, documents and presentations — where the thinking gets written down and organised before it is presented.',
    place: [8, 10],
  },
];

export const PROCESS = [
  { id: '01', title: 'OBSERVE', text: 'Understand the idea, context and audience.' },
  { id: '02', title: 'QUESTION', text: 'Challenge assumptions and find what matters.' },
  { id: '03', title: 'EXPLORE', text: 'Generate visual directions and possibilities.' },
  { id: '04', title: 'DESIGN', text: 'Turn the strongest direction into a clear visual system.' },
  { id: '05', title: 'REFINE', text: 'Remove noise and improve the details.' },
  { id: '06', title: 'BUILD', text: 'Bring the idea into a real digital experience.' },
];

/* ---------------------------------------------------------------------------
 * Services are grouped by practice and described at the level they are actually
 * offered. Analytical and business work is framed as developing capability;
 * nothing here promises a delivered data product or a fake client outcome.
 * ------------------------------------------------------------------------- */
export const SERVICE_GROUPS = [
  {
    id: 'data',
    label: 'Data & Reporting',
    note: 'Structure first, presentation second.',
    accent: '#00d2ff',
  },
  {
    id: 'business',
    label: 'Business Analysis & Process Support',
    note: 'Clarify the problem before building the answer.',
    accent: '#8b7dff',
  },
  {
    id: 'creative',
    label: 'Creative & Digital',
    note: 'The visible craft, carried through to the build.',
    accent: '#7dd3fc',
  },
];

export const SERVICES = [
  {
    id: '01',
    group: 'data',
    title: 'SPREADSHEET REPORTING',
    text: 'Excel-based reporting, data cleaning, structuring and validation — with clear labels, documented logic and a layout someone else can follow.',
  },
  {
    id: '02',
    group: 'data',
    title: 'KPI & DASHBOARD CONCEPTS',
    text: 'Reporting layouts and visual hierarchy for KPIs. Offered as design concepts and structures — not as live analytics products.',
  },
  {
    id: '03',
    group: 'data',
    title: 'INSIGHT COMMUNICATION',
    text: 'Turning patterns and findings into plain-language summaries, structured notes and presentation-ready information.',
  },
  {
    id: '04',
    group: 'business',
    title: 'REQUIREMENTS DOCUMENTATION',
    text: 'Turning a business problem into clear requirements, assumptions and use cases that a designer or developer can act on.',
  },
  {
    id: '05',
    group: 'business',
    title: 'PROCESS & WORKFLOW MAPPING',
    text: 'Mapping how work actually moves, where it stalls, and what a simpler current or future state could look like.',
  },
  {
    id: '06',
    group: 'business',
    title: 'RESEARCH & PROBLEM DEFINITION',
    text: 'Structured research and framing before a solution is designed — defining the real question rather than guessing at it.',
  },
  {
    id: '07',
    group: 'creative',
    title: 'UI / UX DESIGN',
    text: 'Interface structure, user flows and design systems — clear screens that hold up beyond the first mockup.',
  },
  {
    id: '08',
    group: 'creative',
    title: 'WEB DESIGN & FRONT-END',
    text: 'Responsive page design carried through to a semantic, maintainable front-end build.',
  },
  {
    id: '09',
    group: 'creative',
    title: 'VISUAL & INFORMATION DESIGN',
    text: 'Identity, typography, layout and information presentation — one visual voice across formats.',
  },
];
