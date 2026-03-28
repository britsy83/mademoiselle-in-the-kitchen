# Mademoiselle in the kitchen website

Repository:  
`git@github.com:britsy83/mademoiselle-in-the-kitchen.git`

Production branch: `main`  
All changes must go through feature branches and Pull Requests into `main`.

---

# 1. Technical Constraints

The site is:

- Static HTML / CSS / JS only
- Hosted on GitHub Pages
- No backend
- No frameworks
- No build tools

Rules:

1. No frameworks unless explicitly requested.
2. No external CDNs unless explicitly requested.
3. All assets must be local, organized under `/assets/` with subfolders: `images/`, `fonts/`, `css/`, `js/`.
4. Semantic HTML only.
5. Mobile-first responsive design.
6. Maintain accessibility:
   - `alt` attributes
   - ARIA labels
   - Focus states
7. Maintain SEO:
   - Proper `<title>`
   - Meta description
   - Structured heading hierarchy
8. Clean CSS:
   - No duplication
   - No inline styles unless justified
   - Logical structure

---

# 2. Git Workflow (Mandatory)

1. Do not modify `main` directly. 
2. Create feature branch with an explicit name related to the task.
3. Implement changes.
4. Commit with clear message.
5. Push branch to origin. Never push directly to `main`.
6. Provide structured PR summary including:
- What changed
- Why
- UX impact
- SEO impact
- Any notable performance considerations
7. Instruct the user to create the PR manually in GitHub
8. After the PR is merged, the feature branch will be deleted by the repository owner.

---

# 3. Design Standards (UI-related tasks)

Must be compliant with brand-book.html

---

# 4. Validation Checklist (Before Completion)

- Opens correctly via `index.html`
- No broken asset references
- No external Wix/CDN links
- Alt attributes present on all images
- ARIA labels present where needed
- Focus states visible on interactive elements
- No console errors
- No layout break on mobile
- No regression on desktop
- Clean git diff (no unrelated changes)

---

# 5. Deliverables

- Updated files
- Feature branch created
- Branch pushed to GitHub
- PR summary provided
- User instructed to finish the Git workflow in GitHub by opening the PR

---