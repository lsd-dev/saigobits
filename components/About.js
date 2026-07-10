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
                        <p>SaigoBits was founded on the idea that high-quality technical expertise should be accessible, transparent, and strictly project-focused. I specialize in frontend development, backend logic, and IT consulting to help your business operate more efficiently. Partner directly with an engineer to launch products and secure systems without the commitment and overhead of a full-time hire.</p>
                        
                        <div class="about-features">
                            <div class="about-feature-item">
                                <div class="about-feature-title">Project-Focused</div>
                                <div class="about-feature-desc">Clear scopes, milestones, and deliverable commitments.</div>
                            </div>
                            <div class="about-feature-item">
                                <div class="about-feature-title">Direct Collaboration</div>
                                <div class="about-feature-desc">Partner directly with an expert, bypassing agency middlemen.</div>
                            </div>
                            <div class="about-feature-item">
                                <div class="about-feature-title">No Overhead Cost</div>
                                <div class="about-feature-desc">Pay only for the exact digital results you need.</div>
                            </div>
                            <div class="about-feature-item">
                                <div class="about-feature-title">Future-Proof Tech</div>
                                <div class="about-feature-desc">Using modern, standards-based stacks that scale easily.</div>
                            </div>
                        </div>
                    </div>

                    <!-- CSS-only Vector Highlights List -->
                    <div class="about-visual-side" aria-hidden="true">
                        <div class="about-glow-blob"></div>
                        <div class="about-card-stack">
                            <div class="about-visual-card blue-highlight">
                                <h4>Software Engineering</h4>
                                <p>Custom-tailored web interfaces, integrated interactive features, and robust backend structures built to scale.</p>
                            </div>
                            <div class="about-visual-card green-highlight">
                                <h4>System Integration</h4>
                                <p>Seamless API connections, database synchronizations, and data pipelines to unify your digital operations.</p>
                            </div>
                            <div class="about-visual-card red-highlight">
                                <h4>Strategic Consulting</h4>
                                <p>Expert advice on system audits, cloud infrastructure migration, and cost-efficient software selection.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('site-about', SiteAbout);
