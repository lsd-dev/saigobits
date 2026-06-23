/**
 * SaigoBits - Projects Web Component
 */
class SiteProjects extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="section-padding section-bg-alt" id="projects" aria-labelledby="projects-heading">
                <div class="container">
                    <div class="section-header">
                        <span class="lead-space-tagline" style="margin-bottom: 12px;">Case Studies</span>
                        <h2 id="projects-heading">Featured Portfolio</h2>
                        <p>A selective look at recent project-based solutions designed to drive efficiency and performance.</p>
                    </div>

                    <div class="projects-grid">
                        <!-- Project 1: UI/UX (Blue) -->
                        <a href="projects.html?category=ui-ux" class="project-card-link">
                            <article class="project-card blue-proj" id="project-card-1">
                                <div class="project-visual-wrapper">
                                    <span class="project-badge">UI/UX</span>
                                    <div class="project-visual-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="3" y1="9" x2="21" y2="9"></line>
                                            <line x1="9" y1="21" x2="9" y2="9"></line>
                                        </svg>
                                    </div>
                                </div>
                                <div class="project-info">
                                    <h3>Interactive Frontend Dashboard</h3>
                                    <p>Created a highly responsive, custom dashboard layout displaying critical metrics, client stats, and visual graphs for real-time operation tracking.</p>
                                    <span class="project-explore-link blue-link">
                                        Explore Projects 
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </span>
                                </div>
                            </article>
                        </a>

                        <!-- Project 2: Backend (Red) -->
                        <a href="projects.html?category=backend" class="project-card-link">
                            <article class="project-card red-proj" id="project-card-2">
                                <div class="project-visual-wrapper">
                                    <span class="project-badge">Backend</span>
                                    <div class="project-visual-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                                            <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="project-info">
                                    <h3>API & Database Integration</h3>
                                    <p>Engineered a scalable RESTful API with automated database synchronization to unify customer order streams and inventory databases across multiple vendors.</p>
                                    <span class="project-explore-link red-link">
                                        Explore Projects 
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </span>
                                </div>
                            </article>
                        </a>

                        <!-- Project 3: Full-Stack / Consulting (Green) -->
                        <a href="projects.html?category=consulting" class="project-card-link">
                            <article class="project-card green-proj" id="project-card-3">
                                <div class="project-visual-wrapper">
                                    <span class="project-badge">Consulting</span>
                                    <div class="project-visual-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                            <polyline points="2 17 12 22 22 17"></polyline>
                                            <polyline points="2 12 12 17 22 12"></polyline>
                                        </svg>
                                    </div>
                                </div>
                                <div class="project-info">
                                    <h3>Workflow Transformation Solution</h3>
                                    <p>Developed a secure portal for a local distributor that digitizes manual invoices and automate task assignments, shaving hours off daily administrative overhead.</p>
                                    <span class="project-explore-link green-link">
                                        Explore Projects 
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </span>
                                </div>
                            </article>
                        </a>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('site-projects', SiteProjects);
