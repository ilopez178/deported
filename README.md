# Should You Get Deported? 🚨

**Live at [irvinglopez.com/deported](https://irvinglopez.com/deported)**

A satirical U.S. citizenship test quiz. Answer 10 random civics questions — you need 7 right to stay in America. Get them wrong and you're deported. Your results go on the global leaderboard.

---

## Features

- **10 random questions** from a pool of 100 actual U.S. citizenship test questions
- **Hard distractors** — wrong answers are real historical facts, nearby numbers, same-era figures
- **60-second global countdown** — one timer for the whole quiz, not per question
- **Residency Status meter** — drains red as you get answers wrong
- **Global leaderboard** — powered by Supabase; one entry per player (most recent result)
- **$1 paywall** — deported players pay $1 via Venmo to retry (joke, but the Venmo link is real)
- **Play count** — tracks total attempts in the database
- **Share modal** — copy link or text a friend directly from the home screen
- **SEO optimized** — meta tags, JSON-LD schema, sitemap, robots.txt

---

## Stack

| Layer | Tech |
|---|---|
| UI | React 18 + TypeScript |
| Build | Vite |
| Styling | Inline styles + `src/styles/global.css` |
| Database | Supabase (PostgreSQL) |
| Deploy | GitHub Actions → GitHub Pages |
| Domain | irvinglopez.com (custom domain via CNAME) |

---

## Local Development

> Requires Node via [mise](https://mise.jdx.dev/). Adjust the path if you use nvm or system Node.

```bash
# Install dependencies
PATH="$HOME/.local/share/mise/installs/node/lts/bin:$PATH" npm install

# Start dev server
PATH="$HOME/.local/share/mise/installs/node/lts/bin:$PATH" npm run dev

# Production build
PATH="$HOME/.local/share/mise/installs/node/lts/bin:$PATH" npm run build
```

### Environment Variables

Create a `.env` file in the project root (never commit this):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These are also set as **GitHub Secrets** (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) so the CI build can inject them at deploy time.

---

## Supabase Setup

Two tables are required. Run these in the **Supabase SQL Editor**:

### Leaderboard table

```sql
create table leaderboard (
  name text not null,
  score int not null,
  time_seconds int,
  passed bool not null,
  date bigint not null
);

alter table leaderboard enable row level security;

create policy "anon select" on leaderboard for select to anon using (true);
create policy "anon insert" on leaderboard for insert to anon with check (true);
create policy "anon delete" on leaderboard for delete to anon using (true);
```

### Plays table (attempt logging)

```sql
create table plays (
  id bigserial primary key,
  played_at timestamptz default now(),
  name text,
  score int not null,
  passed bool not null
);

alter table plays enable row level security;

create policy "anon insert" on plays for insert to anon with check (true);
create policy "anon select" on plays for select to anon using (true);
```

> If you already created the table without the `name` column, add it with:
> ```sql
> alter table plays add column name text;
> ```

### Useful queries

```sql
-- Total attempts
select count(*) from plays;

-- Pass vs deported breakdown
select passed, count(*) from plays group by passed;

-- Average score
select round(avg(score::numeric), 2) as avg_score from plays;

-- Who played and when
select name, score, passed, played_at from plays order by played_at desc;

-- Leaderboard snapshot
select * from leaderboard order by score desc, time_seconds asc;
```

---

## Project Structure

```
citizenship-test/
├── public/
│   ├── og.png          # 1200×630 Open Graph image (PNG — Twitter requires PNG, not SVG)
│   ├── og.svg          # Source SVG for the OG image
│   ├── sitemap.xml     # SEO sitemap
│   └── robots.txt      # Crawler instructions
├── src/
│   ├── App.tsx         # All UI components (single-file architecture)
│   ├── main.tsx        # Entry point
│   ├── lib/
│   │   └── supabase.ts # Supabase client
│   ├── styles/
│   │   └── global.css  # Keyframes, button classes, mobile media queries
│   ├── utils/
│   │   └── helpers.ts  # shuffleArray (Fisher-Yates)
│   ├── types/
│   │   └── index.ts    # TypeScript types (Question, QuestionCategory, etc.)
│   └── data/
│       └── questions.ts # 100 citizenship test questions with distractors
├── index.html          # SEO meta tags, OG tags, JSON-LD schema
├── vite.config.ts      # base: '/deported/' for GitHub Pages subpath
└── .github/
    └── workflows/
        └── deploy.yml  # CI: build → GitHub Pages
```

---

## Screen Flow

```
menu → name → quiz → result
                        ↓ (if failed)
                     paywall → quiz (if paid) or menu (if declined)

menu / result → leaderboard
```

---

## Design System

All colors are CSS variables defined in `global.css`:

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#080808` | Page background |
| `--surface` | `#0f0f0f` | Input backgrounds, list rows |
| `--card` | `#141414` | Card backgrounds |
| `--border` | `#1c1c1c` | Borders |
| `--text` | `#c8c8c8` | Body text |
| `--muted` | `#5a5a5a` | Secondary/disabled text |
| `--white` | `#f2f2f2` | Headings, emphasis |
| `--accent` | `#0ea5e9` | Progress bar, hover states, leaderboard times |

**Button colors:**
- Red (`#ef4444`) — danger CTAs, "Begin Screening", failed retry
- Green (`#16a34a`) — safe CTAs, in-quiz next/submit, passed retry
- Ghost red — `border: 1px solid #ef444455; color: #ef4444`
- Ghost green — `border: 1px solid #16a34a55; color: #16a34a`

---

## Deploy

Pushing to `main` triggers GitHub Actions automatically:

```bash
git add .
git commit -m "your message"
git push
```

Check deploy status:
```bash
curl -s "https://api.github.com/repos/ilopez178/deported/actions/runs?per_page=1" \
  | python3 -c "import sys,json; d=json.load(sys.stdin)['workflow_runs'][0]; print(d['status'], d.get('conclusion',''), d['head_commit']['message'])"
```

---

## SEO

- Canonical URL: `https://irvinglopez.com/deported/`
- JSON-LD `WebApplication` schema in `index.html`
- Sitemap at `/deported/sitemap.xml`
- To request Google indexing: [Google Search Console](https://search.google.com/search-console) → URL Inspection → Request Indexing
