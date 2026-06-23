/**
 * SaigoBits - Navbar Web Component
 */
class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="header" id="header" role="banner">
                <div class="container nav-container">
                    <a href="index.html" class="logo" aria-label="SaigoBits Home">
                        <img src="images/logo.png" alt="SaigoBits logo">
                        <span class="logo-text">Saigo<span>Bits</span></span>
                    </a>
                    
                    <button class="mobile-nav-toggle" aria-label="Toggle menu" aria-controls="primary-navigation" aria-expanded="false" id="mobileNavToggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <nav id="primary-navigation">
                        <ul class="nav-menu" id="navMenu">
                            <li><a href="index.html#services" class="nav-link">Services</a></li>
                            <li><a href="index.html#projects" class="nav-link">Projects</a></li>
                            <li><a href="index.html#certificates" class="nav-link">Certifications</a></li>
                            <li><a href="index.html#about" class="nav-link">About Us</a></li>
                            <li><a href="index.html#contact" class="nav-link">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;
    }
}

customElements.define('site-header', SiteHeader);
