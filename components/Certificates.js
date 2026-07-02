/**
 * SaigoBits - Certificates Web Component
 */
class SiteCertificates extends HTMLElement {
    connectedCallback() {
        const certificates = [
            {
                title: "Google Analytics Academy",
                issuer: "Google Analytics",
                description: "Advanced web analytics, user behavior analysis, conversion tracking, and data-driven reporting.",
                image: "images/certificates/Google Analytics Academy.png"
            },
            {
                title: "Project Initiation: Starting a Successful Project",
                issuer: "Google Career Certificates",
                description: "Foundational project management methodologies, defining goals, project scopes, and project charters.",
                image: "images/certificates/Google Project Initiation Starting a Successful Project.png"
            },
            {
                title: "Project Planning: Putting It All Together",
                issuer: "Google Career Certificates",
                description: "Deep dive into project scheduling, milestones, resource planning, risk management, and communication strategies.",
                image: "images/certificates/Google Project Planning Putting It All Together.png"
            }
        ];

        const cardsHTML = certificates.map((cert, index) => `
            <article class="cert-card yellow-cert" id="cert-card-${index + 1}">
                <a href="${encodeURI(cert.image)}" target="_blank" rel="noopener noreferrer" class="cert-image-link" aria-label="View larger version of ${cert.title}">
                    <div class="cert-visual-wrapper">
                        <span class="cert-badge">${cert.issuer}</span>
                        <img src="${encodeURI(cert.image)}" alt="${cert.title} preview" class="cert-preview-img" loading="lazy">
                    </div>
                </a>
                <div class="cert-info">
                    <h3>${cert.title}</h3>
                    <p>${cert.description}</p>
                    <a href="${encodeURI(cert.image)}" target="_blank" rel="noopener noreferrer" class="cert-link">
                        View Certificate 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>
            </article>
        `).join('');

        this.innerHTML = `
            <section class="section-padding" id="certificates" aria-labelledby="certificates-heading">
                <div class="container">
                    <div class="section-header">
                        <h2 id="certificates-heading">Professional Certifications</h2>
                        <p>Industry-recognized qualifications validating analytical capability, digital optimization skills, and structured project governance.</p>
                    </div>
                    <div class="certs-grid">
                        ${cardsHTML}
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('site-certificates', SiteCertificates);
