/**
 * SaigoBits - Footer Web Component
 */
class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="footer" role="contentinfo">
                <div class="container">
                    <div class="footer-top">
                        <div class="footer-brand">
                            <a href="index.html" class="logo" style="margin-bottom: 8px;">
                                <img src="images/logo.png" alt="SaigoBits logo footer">
                                <span class="logo-text">Saigo<span>Bits</span></span>
                            </a>
                            <p>Delivering premium, project-focused frontend development, backend systems, and IT consulting to empower growing businesses.</p>
                        </div>
                        
                        <div class="footer-links-col">
                            <h4>Navigation</h4>
                            <ul class="footer-links">
                                <li class="footer-link"><a href="index.html#services">Services</a></li>
                                <li class="footer-link"><a href="index.html#projects">Projects</a></li>
                                <li class="footer-link"><a href="index.html#certificates">Certifications</a></li>
                                <li class="footer-link"><a href="index.html#about">About Us</a></li>
                                <li class="footer-link"><a href="index.html#contact">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <p>&copy; 2026 SaigoBits. All rights reserved.</p>
                        <div class="footer-bottom-links">
                            <a href="privacy.html">Privacy Policy</a>
                            <a href="terms.html">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('site-footer', SiteFooter);
