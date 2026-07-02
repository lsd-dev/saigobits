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
                        <!-- Project 1: Production Applications (Yellow) -->
                        <a href="projects.html?category=production" class="project-card-link">
                            <article class="project-card yellow-proj" id="project-card-1">
                                <div class="project-visual-wrapper">
                                    <span class="project-badge">Production</span>
                                    <div class="project-visual-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="2" y1="12" x2="22" y2="12"></line>
                                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="project-info">
                                    <h3>Production Applications</h3>
                                    <p>Browse active, secure web portals and interactive computational platforms deployed in the real world with verified user bases.</p>
                                    <span class="project-explore-link yellow-link">
                                        Explore Applications 
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </span>
                                </div>
                            </article>
                        </a>

                        <!-- Project 2: UI/UX Templates (Blue) -->
                        <a href="projects.html?category=ui-ux" class="project-card-link">
                            <article class="project-card blue-proj" id="project-card-2">
                                <div class="project-visual-wrapper">
                                    <span class="project-badge">Templates</span>
                                    <div class="project-visual-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="3" y1="9" x2="21" y2="9"></line>
                                            <line x1="9" y1="21" x2="9" y2="9"></line>
                                        </svg>
                                    </div>
                                </div>
                                <div class="project-info">
                                    <h3>Interactive Web Templates</h3>
                                    <p>High-fidelity, responsive pre-built website templates optimized for conversions, lightweight page sizes, and zero-framework complexity.</p>
                                    <span class="project-explore-link blue-link">
                                        Explore Templates 
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </span>
                                </div>
                            </article>
                        </a>

                        <!-- Project 3: Technical Support (Red/Pink Accent) -->
                        <a href="projects.html?category=technical-support" class="project-card-link">
                            <article class="project-card red-proj" id="project-card-3">
                                <div class="project-visual-wrapper">
                                    <span class="project-badge">Support</span>
                                    <div class="project-visual-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="project-info">
                                    <h3>Technical Support & IT Operations</h3>
                                    <p>Configured desktop OS environments (Ubuntu Desktop LTS with Ubuntu Pro extended security) and custom media/gaming console emulator rigging on Windows.</p>
                                    <span class="project-explore-link red-link">
                                        Explore Support 
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </span>
                                </div>
                            </article>
                        </a>

                        <!-- Project 4: Full-Stack / Consulting (Green) -->
                        <a href="projects.html?category=consulting" class="project-card-link">
                            <article class="project-card green-proj" id="project-card-4">
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
