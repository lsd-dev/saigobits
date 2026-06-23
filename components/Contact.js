/**
 * SaigoBits - Contact Web Component
 */
class SiteContact extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="section-padding section-bg-alt" id="contact" aria-label="Contact Us">
                <div class="container">
                    <div class="contact-simple-container">
                        <!-- Google Form iframe container with precise styling for no-scroll display -->
                        <div class="form-iframe-container" id="googleFormContainer">
                            <iframe 
                                src="https://docs.google.com/forms/d/e/1FAIpQLSd_xZFCEKtyN-3nHd8WAUmr73GokayH_5L2oQoBChiFq8qEGQ/viewform?embedded=true"
                                title="SaigoBits Contact Form"
                                scrolling="no"
                                id="gFormIframe">
                                Loading…
                            </iframe>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('site-contact', SiteContact);
