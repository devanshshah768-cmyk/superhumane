function Footer() {
  return (
    <footer className="bg-secondary text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

        <div className="grid md:grid-cols-3 gap-10">

          {/* BRAND */}
          <div>

            <h2 className="text-3xl font-bold">
              Pedi
              <span className="text-primary">
                Milestones
              </span>
            </h2>

            <p className="mt-4 text-gray-300 leading-relaxed">
              Pediatric growth tracking and developmental
              milestone monitoring platform powered by
              modern technology and AI.
            </p>

          </div>

          {/* LINKS */}
          <div>

            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-300">

              <a href="#">
                Home
              </a>

              <a href="#">
                Growth Charts
              </a>

              <a href="#">
                Milestones
              </a>

              <a href="#">
                Dashboard
              </a>

            </div>

          </div>

          {/* DISCLAIMER */}
          <div>

            <h3 className="text-xl font-semibold mb-4">
              Disclaimer
            </h3>

            <p className="text-gray-300 leading-relaxed">
              This platform is intended for educational
              and tracking purposes only and should not
              replace professional pediatric consultation.
            </p>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">

          © 2026 PediMilestones. All rights reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;