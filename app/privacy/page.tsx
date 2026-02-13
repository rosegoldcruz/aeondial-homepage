import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24">
        <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <h1 className="font-mono text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: February 13, 2026</p>

          <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
              <p className="mt-2">We may collect account details, contact and call metadata, usage analytics, and billing information.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">2. How We Use Information</h2>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Provide, secure, and improve AEONDial services.</li>
                <li>Process transactions and manage subscriptions.</li>
                <li>Support compliance, fraud prevention, and abuse detection.</li>
                <li>Communicate product updates, support, and service notices.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">3. Data Sharing</h2>
              <p className="mt-2">
                We may share data with trusted subprocessors, telecom carriers, and service providers required to operate
                the platform, as well as when legally required.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">4. Data Retention</h2>
              <p className="mt-2">
                We retain data for as long as necessary to provide services, meet legal obligations, resolve disputes,
                and enforce agreements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">5. Security</h2>
              <p className="mt-2">
                We implement administrative, technical, and physical safeguards to protect information. No method of
                transmission or storage is completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">6. Your Rights</h2>
              <p className="mt-2">
                Depending on your location, you may have rights to access, correct, delete, or restrict processing of
                your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">7. International Transfers</h2>
              <p className="mt-2">
                If data is transferred across borders, we use appropriate safeguards required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">8. Contact</h2>
              <p className="mt-2">
                For privacy requests or questions, email 
                <a href="mailto:privacy@aeondial.com" className="text-accent hover:underline"> privacy@aeondial.com</a>.
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
