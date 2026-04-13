import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileBottomBar from "@/components/MobileBottomBar";

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "Full name, date of birth, email address, and phone number",
      "Residential address, postal code, and province",
      "Employment information (employer, income, years employed, profession)",
      "Credit score range and financial details (monthly budget, down payment)",
      "Vehicle preferences and trade-in information",
      "Any additional information you voluntarily provide",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "Process and evaluate your pre-approval application",
      "Connect you with licensed dealership partners and lenders",
      "Communicate with you regarding your application status",
      "Improve our services and website experience",
      "Comply with legal and regulatory obligations",
      "Send you relevant offers and updates (with your consent)",
    ],
  },
  {
    title: "3. Credit Check Consent",
    paragraph:
      "By submitting a pre-approval application, you consent to a credit check being performed by our licensed lending partners. This may include a soft or hard credit inquiry depending on the stage of your application. A hard inquiry may temporarily affect your credit score.",
  },
  {
    title: "4. Information Sharing",
    content: [
      "Licensed dealership partners — to facilitate vehicle financing",
      "Financial institutions and lenders — to process your credit application",
      "Service providers — who assist us in operating our website and services (e.g., email, analytics)",
      "Legal authorities — when required by law or to protect our rights",
    ],
    intro: "We do not sell your personal information. We may share your information with:",
  },
  {
    title: "5. Data Security",
    paragraph:
      "We implement industry-standard security measures to protect your personal information, including SSL encryption, secure servers, and restricted access controls. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "6. Cookies & Tracking",
    paragraph:
      "Our website may use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings.",
  },
  {
    title: "7. Your Rights",
    intro: "Under applicable Canadian privacy laws (including PIPEDA), you have the right to:",
    content: [
      "Access the personal information we hold about you",
      "Request correction of inaccurate information",
      "Withdraw consent for certain uses of your data",
      "Request deletion of your personal information",
    ],
  },
  {
    title: "8. Data Retention",
    paragraph:
      "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. When no longer needed, data is securely deleted or anonymized.",
  },
  {
    title: "9. Third-Party Links",
    paragraph:
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these sites and encourage you to review their privacy policies.",
  },
  {
    title: "10. Changes to This Policy",
    paragraph:
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.",
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <section className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-10">
            <div className="border-b border-border pb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Privacy Policy</p>
              <h1 className="mt-3 text-4xl font-extrabold text-foreground sm:text-5xl">Your privacy matters.</h1>
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                Last updated: April 13, 2026
              </p>
            </div>

            <div className="mt-8 space-y-8">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-extrabold text-foreground">{section.title}</h2>
                  {section.intro && (
                    <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{section.intro}</p>
                  )}
                  {section.paragraph && (
                    <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{section.paragraph}</p>
                  )}
                  {section.content && (
                    <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground sm:text-base">
                      {section.content.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <section>
                <h2 className="text-2xl font-extrabold text-foreground">11. Contact Us</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  If you have any questions about this Privacy Policy or how we handle your personal information, please contact us:
                </p>
                <div className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground sm:text-base">
                  <p>Email: info@approvalonspot.ca</p>
                  <p>Phone: (778) 917-7003</p>
                  <p>Address: 6786 King George Blvd, Surrey, BC V3W 4Z5</p>
                </div>
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
