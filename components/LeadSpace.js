/**
 * SaigoBits - Lead Space Web Component (Enterprise Header Banner)
 */
class SiteLeadSpace extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="lead-space" id="lead-space" aria-label="Introduction">
                <div class="lead-space-shapes">
                    <div class="lead-space-shape lead-space-shape-1"></div>
                    <div class="lead-space-shape lead-space-shape-2"></div>
                </div>
                
                <div class="container lead-space-content">
                    <h1>Your Last, <span class="text-gradient">Stop.</span></h1>
                    <h2>We deliver high-quality, project-based technical solutions that help small businesses reduce costs, streamline operations, and drive growth.</h2>
                    <div class="lead-space-ctas">
                        <a href="#contact" class="btn btn-primary">Get a Project Estimate</a>
                        <a href="#services" class="btn btn-secondary">Explore Services</a>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('site-lead-space', SiteLeadSpace);
