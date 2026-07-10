/**
 * SaigoBits - About Web Component
 */
class SiteAbout extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="section-padding" id="about" aria-labelledby="about-heading">
                <div class="container about-layout">
                    <div class="about-text">
                        <h2 id="about-heading">The SaigoBits Approach</h2>
                        <p>SaigoBits delivers senior-level engineering capability and IT advisory structured to meet the agility demands of modern enterprises. We specialize in building robust frontend interfaces, secure backend services, and resilient system integrations. By partnering directly with a dedicated engineer, organizations accelerate product timelines, optimize cloud infrastructure, and eliminate the corporate overhead of agency middlemen.</p>
                        
                        <div class="about-features">
                            <div class="about-feature-item">
                                <div class="about-feature-title">Outcome-Driven Delivery</div>
                                <div class="about-feature-desc">Fixed scopes, transparent milestones, and SLA-aligned commitments.</div>
                            </div>
                            <div class="about-feature-item">
                                <div class="about-feature-title">Engineering Partnerships</div>
                                <div class="about-feature-desc">Direct collaboration with a senior engineer to ensure high-fidelity implementation.</div>
                            </div>
                            <div class="about-feature-item">
                                <div class="about-feature-title">Capital Efficiency</div>
                                <div class="about-feature-desc">Optimize resource allocation by paying strictly for high-impact deliverables.</div>
                            </div>
                            <div class="about-feature-item">
                                <div class="about-feature-title">Scalable Architecture</div>
                                <div class="about-feature-desc">Utilizing modern, standards-compliant stacks designed for longevity.</div>
                            </div>
                        </div>
                    </div>

                    <!-- CSS-only Vector Highlights List -->
                    <div class="about-visual-side" aria-hidden="true">
                        <div class="about-glow-blob"></div>
                        <div class="about-card-stack">
                            <div class="about-visual-card blue-highlight">
                                <h4>Software Engineering</h4>
                                <p>High-performance, custom-tailored web applications, responsive user interfaces, and robust backend systems engineered for cloud environments.</p>
                            </div>
                            <div class="about-visual-card green-highlight">
                                <h4>System Integration</h4>
                                <p>Seamless API orchestrations, real-time database synchronizations, and automated data pipelines to unify enterprise operations.</p>
                            </div>
                            <div class="about-visual-card red-highlight">
                                <h4>Strategic Advisory</h4>
                                <p>Comprehensive architecture audits, cloud migration strategies, and cost-optimization roadmaps to maximize technology ROI.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('site-about', SiteAbout);
