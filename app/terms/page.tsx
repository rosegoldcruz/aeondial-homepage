import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24">
        <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <h1 className="font-mono text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: February 13, 2026</p>

          <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p className="mt-2">
                By accessing or using AEONDial and related websites, you agree to these Terms of Service. If you do not
                agree, do not use the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">2. Service Access</h2>
              <p className="mt-2">
                You may use AEONDial only in compliance with applicable laws and telecom regulations, including consent,
                call recording notice, and anti-spam requirements in your operating jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">3. Accounts and Security</h2>
              <p className="mt-2">
                You are responsible for safeguarding account credentials and for all activities that occur under your
                account. Notify us immediately of any unauthorized access.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">4. Acceptable Use</h2>
              <p className="mt-2">You agree not to use the service for unlawful, abusive, deceptive, or fraudulent activity.</p>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>Do not place calls without required consent.</li>
                <li>Do not violate local, state, federal, or international law.</li>
                <li>Do not attempt to interfere with service integrity or availability.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">5. Billing and Subscription</h2>
              <p className="mt-2">
                Paid plans renew according to your billing cycle unless cancelled. You are responsible for usage-based
                charges, carrier fees, taxes, and third-party pass-through costs.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">6. Intellectual Property</h2>
              <p className="mt-2">
                AEONDial, its software, and related branding are owned by AEONDial and licensors. These Terms do not
                grant you ownership rights in our intellectual property.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">7. Disclaimers</h2>
              <p className="mt-2">
                Services are provided on an “as is” and “as available” basis to the fullest extent permitted by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">8. Limitation of Liability</h2>
              <p className="mt-2">
                To the maximum extent permitted by law, AEONDial is not liable for indirect, incidental, special,
                consequential, or punitive damages arising from use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">9. Termination</h2>
              <p className="mt-2">
                We may suspend or terminate access for violations of these Terms, legal requirements, or to protect the
                service, users, or third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">10. Contact</h2>
              <p className="mt-2">
                For legal questions regarding these Terms, contact us at 
                <a href="mailto:legal@aeondial.com" className="text-accent hover:underline"> legal@aeondial.com</a>.
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
