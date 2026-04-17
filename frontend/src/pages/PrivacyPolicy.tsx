import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileBottomBar from "@/components/MobileBottomBar";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <section className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-10">
            {/* Header */}
            <div className="border-b border-border pb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Privacy Policy</p>
              <h1 className="mt-3 text-4xl font-extrabold text-foreground sm:text-5xl">Your privacy matters.</h1>
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">Last Updated: April 16, 2026</p>
            </div>

            <div className="mt-8 space-y-10 text-sm leading-7 text-muted-foreground sm:text-base">

              {/* 1. Introduction */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">1. Introduction</h2>
                <p className="mt-3">
                  Approval On Spot ("we," "us," "our") is committed to protecting your privacy and personal information.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
                  visit{" "}
                  <a href="https://www.approvalonspot.ca" className="text-primary underline underline-offset-2">
                    www.approvalonspot.ca
                  </a>{" "}
                  and use our services to connect with automotive financing options through our network of dealership
                  partners and lenders.
                </p>
                <p className="mt-3">
                  By accessing or using our website and services, you agree to this Privacy Policy. If you do not agree,
                  please do not use our services.
                </p>
              </section>

              {/* 2. Information We Collect */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">2. Information We Collect</h2>
                <p className="mt-3">We collect information you voluntarily provide when you:</p>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Complete our pre-approval application</li>
                  <li>Contact us via phone, SMS, email, or social media</li>
                  <li>Submit lead forms (Facebook, Instagram, website)</li>
                  <li>Engage with our ads or marketing campaigns</li>
                </ul>

                <p className="mt-5 font-semibold text-foreground">Personal Information Includes:</p>

                <div className="mt-3 space-y-4">
                  <div>
                    <p className="font-medium text-foreground">Identity Information</p>
                    <ul className="mt-1 list-disc pl-6 space-y-1">
                      <li>Full name, date of birth, ID details</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Contact Information</p>
                    <ul className="mt-1 list-disc pl-6 space-y-1">
                      <li>Phone number, email, address, postal code</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Financial Information</p>
                    <ul className="mt-1 list-disc pl-6 space-y-1">
                      <li>Employment, income, employer details</li>
                      <li>Credit situation (including self-declared credit status)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Vehicle Preferences</p>
                    <ul className="mt-1 list-disc pl-6 space-y-1">
                      <li>Budget, vehicle type, trade-in details</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Eligibility Information</p>
                    <ul className="mt-1 list-disc pl-6 space-y-1">
                      <li>Residency status, driver's license</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Technical Data</p>
                    <ul className="mt-1 list-disc pl-6 space-y-1">
                      <li>IP address, cookies, device/browser data</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">3. How We Use Your Information</h2>
                <p className="mt-3">We use your information to:</p>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Process your car loan pre-approval</li>
                  <li>Match you with dealerships &amp; lenders</li>
                  <li>Help secure best possible approval (all credit welcome)</li>
                  <li>Communicate via call, SMS, email, or WhatsApp</li>
                  <li>Verify identity &amp; prevent fraud</li>
                  <li>Improve website performance &amp; ads</li>
                  <li>Meet legal &amp; regulatory requirements</li>
                  <li>Send promotional offers (with your consent)</li>
                </ul>
              </section>

              {/* 4. Consent to Contact */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">4. Consent to Contact (IMPORTANT – Meta Compliance)</h2>
                <p className="mt-3">
                  By submitting your information on our website or ads, you expressly consent to be contacted by:
                </p>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Approval On Spot</li>
                  <li>Our dealership partners</li>
                  <li>Our financing partners</li>
                </ul>
                <p className="mt-4">Via:</p>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Phone call</li>
                  <li>SMS / text message</li>
                  <li>Email</li>
                  <li>Automated systems</li>
                </ul>
                <p className="mt-4 font-medium text-foreground">
                  Message &amp; data rates may apply. You can opt out anytime.
                </p>
              </section>

              {/* 5. Disclosure */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">5. Disclosure of Your Information</h2>
                <p className="mt-3">
                  By applying, you agree that your information may be shared with:
                </p>

                <div className="mt-5 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">5.1 Dealership Partners</h3>
                    <p className="mt-2">We share your information with authorized dealerships to:</p>
                    <ul className="mt-2 list-disc pl-6 space-y-1">
                      <li>Approve financing</li>
                      <li>Match you with vehicles</li>
                      <li>Contact you with offers</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground">5.2 Lenders &amp; Financial Institutions</h3>
                    <p className="mt-2">Banks and lenders use your info to:</p>
                    <ul className="mt-2 list-disc pl-6 space-y-1">
                      <li>Evaluate credit</li>
                      <li>Approve financing</li>
                      <li>Set interest rates &amp; terms</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground">5.3 Credit Reporting Agencies</h3>
                    <p className="mt-2">
                      You authorize us and our partners to check your credit through:
                    </p>
                    <ul className="mt-2 list-disc pl-6 space-y-1">
                      <li>Equifax Canada</li>
                      <li>TransUnion Canada</li>
                    </ul>
                    <p className="mt-2 font-medium text-foreground">This may include soft or hard inquiries.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground">5.4 Service Providers</h3>
                    <p className="mt-2">We may use third parties for:</p>
                    <ul className="mt-2 list-disc pl-6 space-y-1">
                      <li>Email &amp; SMS services</li>
                      <li>CRM systems</li>
                      <li>Analytics &amp; ads (Meta Pixel, Google tools)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground">5.5 Legal Requirements</h3>
                    <p className="mt-2">
                      We may disclose information if required by law or to protect safety and rights.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. Credit Check */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">6. Credit Check Authorization</h2>
                <p className="mt-3">By submitting an application, you explicitly authorize:</p>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Credit checks by multiple lenders</li>
                  <li>Sharing of your credit profile with partners</li>
                  <li>Use of your information to secure financing</li>
                </ul>
                <p className="mt-4 font-medium text-foreground">
                  You understand this may impact your credit score.
                </p>
              </section>

              {/* 7. Data Retention */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">7. Data Retention</h2>
                <p className="mt-3">We keep your information only as long as necessary to:</p>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Complete your application</li>
                  <li>Meet legal requirements</li>
                  <li>Improve services</li>
                </ul>
                <p className="mt-3">Partners may retain data under their own policies.</p>
              </section>

              {/* 8. Your Rights */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">8. Your Privacy Rights (PIPEDA – Canada)</h2>
                <p className="mt-3">You have the right to:</p>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Access your data</li>
                  <li>Correct inaccuracies</li>
                  <li>Withdraw consent</li>
                  <li>File complaint with Privacy Commissioner</li>
                </ul>
                <p className="mt-3 font-medium text-foreground">
                  Once shared, you must contact lenders/dealers directly.
                </p>
              </section>

              {/* 9. Cookies */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">9. Cookies &amp; Tracking</h2>
                <p className="mt-3">We use:</p>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Cookies</li>
                  <li>Meta Pixel</li>
                  <li>Google Analytics</li>
                </ul>
                <p className="mt-4">To:</p>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Improve website performance</li>
                  <li>Track ad results</li>
                  <li>Optimize marketing</li>
                </ul>
                <p className="mt-3">You can disable cookies in your browser.</p>
              </section>

              {/* 10. Data Security */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">10. Data Security</h2>
                <p className="mt-3">We use:</p>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>SSL encryption</li>
                  <li>Secure servers</li>
                  <li>Access controls</li>
                </ul>
                <p className="mt-3">However, no system is 100% secure.</p>
              </section>

              {/* 11. Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">11. Limitation of Liability</h2>
                <p className="mt-3">Approval On Spot acts as a connection platform.</p>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>We do NOT guarantee approval</li>
                  <li>Decisions are made by lenders &amp; dealers</li>
                  <li>We are not responsible for third-party actions</li>
                </ul>
              </section>

              {/* 12. Third-Party Links */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">12. Third-Party Links</h2>
                <p className="mt-3">
                  Our website may link to external sites. We are not responsible for their privacy policies.
                </p>
              </section>

              {/* 13. Age Restriction */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">13. Age Restriction</h2>
                <p className="mt-3">Our services are for individuals 18+ only.</p>
              </section>

              {/* 14. Updates */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">14. Updates to Policy</h2>
                <p className="mt-3">
                  We may update this policy anytime. Changes are effective immediately upon posting.
                </p>
              </section>

              {/* 15. Governing Law */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">15. Governing Law</h2>
                <p className="mt-3">This policy follows the laws of:</p>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>British Columbia, Canada</li>
                </ul>
              </section>

              {/* 16. Contact Us */}
              <section>
                <h2 className="text-2xl font-extrabold text-foreground">16. Contact Us</h2>
                <div className="mt-3 space-y-1">
                  <p className="font-semibold text-foreground">Approval On Spot</p>
                  <p>Surrey, British Columbia</p>
                  <p>
                    Phone:{" "}
                    <a href="tel:+17789177003" className="text-primary underline underline-offset-2">
                      778-917-7003
                    </a>
                  </p>
                  <p>
                    Website:{" "}
                    <a href="https://www.approvalonspot.ca" className="text-primary underline underline-offset-2">
                      www.approvalonspot.ca
                    </a>
                  </p>
                </div>
              </section>

              {/* Consent Acknowledgment */}
              <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
                <h2 className="text-xl font-extrabold text-foreground">Consent Acknowledgment</h2>
                <p className="mt-3">By submitting your application, you:</p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-primary font-bold">✓</span>
                    <span>Agree to this Privacy Policy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-primary font-bold">✓</span>
                    <span>Consent to credit checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-primary font-bold">✓</span>
                    <span>Allow sharing with lenders &amp; dealerships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-primary font-bold">✓</span>
                    <span>Agree to be contacted via phone, SMS, and email</span>
                  </li>
                </ul>
              </section>

            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomBar />
      <FloatingWhatsApp />
    </div>
  );
};

export default PrivacyPolicy;
