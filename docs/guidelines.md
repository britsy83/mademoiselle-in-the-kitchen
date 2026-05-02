# Mademoiselle in the kitchen website

Repository:  
`git@github.com:britsy204/mademoiselle-in-the-kitchen.git`

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

1. Verify the user is on `main` branch. If not, switch to it with `git switch main`.
2. Remove dead references related to previously deleted remote branches with `git fetch --prune`. 
2. Pull the latest code from GitHub with `git pull origin main` to ensure the local `main` is up to date.
3. Create a feature branch with an explicit name related to the task with `git switch -c feature-branch`.
4. Do not modify `main` directly. All changes must be implemented on the feature branch.
5. Implement changes.
6. Commit with clear message.
7. Ask user if another task should be done on this branch. If yes, iterate through items 5, 6 and 7 until user has no more tasks for this feature branch.
8. Push branch to origin. Never push directly to `main`.
9. Create Pull Request: attempt using `gh pr create` if the `gh` CLI is available. If not installed, provide a structured PR summary for the user to open the PR manually in GitHub, including:
   - What changed
   - Why
   - UX impact
   - SEO impact
   - Any notable performance considerations
10. Once the PR merge has been confirmed by the user:
   - Switch the user back to `main` branch locally
   - Delete the feature branch locally
11. After the PR is merged, the remote feature branch will be deleted by the repository owner.

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
- PR created with summary
- User switched back to main branch locally and feature branch deleted locally

---