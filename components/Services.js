/**
 * SaigoBits - Services Web Component
 */
class SiteServices extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="section-padding" id="services" aria-labelledby="services-heading">
                <div class="container">
                    <div class="section-header">
                        <span class="lead-space-tagline" style="margin-bottom: 12px;">Expertise</span>
                        <h2 id="services-heading">Tailored Solutions for Your Business</h2>
                        <p>High-quality engineering and strategic support without the overhead of a full-time hire.</p>
                    </div>
                    
                    <div class="services-grid">
                        <!-- Card 1: Websites (Blue Accent) -->
                        <article class="service-card blue-card" id="service-card-1">
                            <div class="service-icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <polyline points="16 18 22 12 16 6"></polyline>
                                    <polyline points="8 6 2 12 8 18"></polyline>
                                    <line x1="14" y1="4" x2="10" y2="20"></line>
                                </svg>
                            </div>
                            <h3>Websites</h3>
                            <p>Custom, responsive frontend development for websites, dashboards, and modern UI. Optimized for speed, accessibility, and high conversion.</p>
                            <a href="projects.html?category=ui-ux" class="service-link">
                                Explore Websites 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </article>

                        <!-- Card 2: Tech Support (Red Accent) -->
                        <article class="service-card red-card" id="service-card-2">
                            <div class="service-icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                                </svg>
                            </div>
                            <h3>Technical Support</h3>
                            <p>Proactive troubleshooting, maintenance, data backups, and strategic system upgrades. Keeping your operations secure and running 24/7.</p>
                            <a href="projects.html?category=backend" class="service-link">
                                Explore Support 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </article>

                        <!-- Card 3: Consulting (Green Accent) -->
                        <article class="service-card green-card" id="service-card-3">
                            <div class="service-icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                                </svg>
                            </div>
                            <h3>Consulting</h3>
                            <p>Expert advice for small businesses navigating digital transformation, system integrations, and selecting cost-efficient software stacks.</p>
                            <a href="projects.html?category=consulting" class="service-link">
                                Explore Consulting 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </article>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('site-services', SiteServices);
