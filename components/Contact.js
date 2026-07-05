/**
 * SaigoBits - Contact Web Component
 */
class SiteContact extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="section-padding section-bg-alt" id="contact" aria-labelledby="contact-heading">
                <div class="container">
                    <div class="contact-simple-container">
                        <div class="section-header text-center">
                            <h2 id="contact-heading">Contact Us</h2>
                            <p>Have a project in mind or need technical support? Send a message and I will get back to you shortly.</p>
                        </div>
                        <div class="custom-contact-card" id="contactCard">
                            <form class="custom-contact-form" id="contactForm">
                                <div class="form-group">
                                    <label for="contact-name">Full Name</label>
                                    <input type="text" id="contact-name" class="form-control" placeholder="e.g. John Doe" required>
                                </div>
                                <div class="form-group">
                                    <label for="contact-email">Email Address</label>
                                    <input type="email" id="contact-email" class="form-control" placeholder="e.g. john@example.com" required>
                                </div>
                                <div class="form-group">
                                    <label for="contact-message">Description</label>
                                    <textarea id="contact-message" class="form-control" rows="5" placeholder="Describe the project scope, timing requirements, and target outcomes..." required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary submit-btn" id="submitBtn">
                                    <span class="btn-text">Submit Request</span>
                                    <span class="btn-spinner" style="display: none;">
                                        <svg class="spinner-svg" viewBox="0 0 24 24" width="18" height="18" style="stroke: currentColor; fill: none; stroke-width: 3; animation: rotateSpinner 1s linear infinite; margin-right: 8px; vertical-align: middle;">
                                            <circle cx="12" cy="12" r="10"></circle>
                                        </svg>
                                        Sending...
                                    </span>
                                </button>
                            </form>
                            
                            <!-- Success Message Panel -->
                            <div class="form-success-panel" id="successPanel" style="display: none;">
                                <div class="success-icon-wrapper">
                                    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                </div>
                                <h3>Request Sent Successfully!</h3>
                                <p>Thank you for reaching out. Your request has been securely recorded. I will get in touch with you within 24 hours to align on your requirements.</p>
                                <button class="btn btn-secondary" id="resetBtn">Send Another Message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        this.setupForm();
    }

    setupForm() {
        const form = this.querySelector('#contactForm');
        const submitBtn = this.querySelector('#submitBtn');
        const btnText = this.querySelector('.btn-text');
        const btnSpinner = this.querySelector('.btn-spinner');
        const successPanel = this.querySelector('#successPanel');
        const resetBtn = this.querySelector('#resetBtn');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Disable submit button and show spinner
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnSpinner.style.display = 'inline-flex';

            const name = this.querySelector('#contact-name').value.trim();
            const email = this.querySelector('#contact-email').value.trim();
            const message = this.querySelector('#contact-message').value.trim();

            const formData = new FormData();
            formData.append('entry.2116052852', name);
            formData.append('entry.1558582620', email);
            formData.append('entry.288713975', message);

            try {
                // Submit to the verified Google Form using no-cors mode
                await fetch('https://docs.google.com/forms/d/e/1FAIpQLSd_xZFCEKtyN-3nHd8WAUmr73GokayH_5L2oQoBChiFq8qEGQ/formResponse', {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData
                });

                // Display success transition
                form.style.display = 'none';
                successPanel.style.display = 'block';

            } catch (err) {
                console.error('Submission error:', err);
                alert('We encountered an error sending your message. Please try again.');
                
                // Re-enable button on failure
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnSpinner.style.display = 'none';
            }
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                form.reset();
                form.style.display = 'flex';
                successPanel.style.display = 'none';
                
                // Reset button states
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnSpinner.style.display = 'none';
            });
        }
    }
}

customElements.define('site-contact', SiteContact);
