import { Navigate } from "react-router-dom";

import { motion } from "framer-motion";

import { useAuth } from "../context/AuthContext";

import MainLayout from "../layouts/MainLayout";

function Home() {

  const {
    user,
    loading,
  } = useAuth();

  /* LOADING */
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">

        Loading...

      </div>

    );

  }

  /* AUTO REDIRECT */
  if (user) {

    return (
      <Navigate to="/dashboard" />
    );

  }

  return (

    <MainLayout>

      <div className="bg-background overflow-hidden">

        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center overflow-hidden">

          {/* BACKGROUND IMAGE */}
          <div
            className="
              absolute inset-0
              bg-cover
              bg-center
              scale-105
              animate-float
            "
            style={{
              backgroundImage: "url('/hero-bg.png')",
            }}
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-secondary/70"></div>

          {/* GLOW EFFECTS */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary opacity-20 blur-3xl rounded-full animate-slowPulse"></div>

          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent opacity-20 blur-3xl rounded-full animate-slowPulse"></div>

          {/* MAIN CONTENT */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">

            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* LEFT CONTENT */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-3xl"
              >

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white">

                  Cherishing Every Step,
                  <span className="text-accent">
                    {" "}Celebrating Every Milestone.
                  </span>

                </h1>

                <p className="mt-8 text-xl text-gray-200 leading-relaxed max-w-2xl">

                  A modern pediatric platform designed to help parents
                  and pediatricians monitor developmental milestones,
                  growth patterns, and childhood progress with confidence.

                </p>

                {/* BUTTONS */}
                <div className="flex flex-wrap gap-5 mt-12">

                  <button className="px-8 py-4 rounded-2xl bg-primary text-white font-semibold shadow-2xl hover:scale-105 transition duration-300">

                    Get Started

                  </button>

                  <button className="px-8 py-4 rounded-2xl border border-white/30 text-white backdrop-blur-md hover:bg-white hover:text-secondary transition duration-300">

                    Learn More

                  </button>

                </div>

              </motion.div>

              {/* RIGHT GLASS CARD */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="relative"
              >

                {/* FLOATING GLOW */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  className="absolute -top-10 -right-6 w-28 h-28 bg-accent/20 rounded-full blur-2xl"
                />

                {/* CARD */}
                <div
                  className="
                    backdrop-blur-2xl
                    bg-white/10
                    border
                    border-white/20
                    rounded-[36px]
                    p-8
                    shadow-2xl
                  "
                >

                  {/* HEADER */}
                  <div className="flex justify-between items-center mb-8">

                    <div>

                      <h2 className="text-2xl font-bold text-white">
                        Development Overview
                      </h2>

                      <p className="text-gray-300 text-sm mt-1">
                        Last updated today
                      </p>

                    </div>

                    <div className="px-4 py-2 rounded-full bg-primary/20 text-white text-sm font-semibold backdrop-blur-md border border-white/10">

                      Active Tracking

                    </div>

                  </div>

                  {/* SCROLLABLE AREA */}
                  <div
                    className="
                      h-64
                      rounded-3xl
                      bg-white/5
                      border
                      border-white/10
                      p-6
                      overflow-y-auto
                    "
                  >

                    <div className="flex items-center justify-between mb-6">

                      <div>

                        <h3 className="text-xl font-bold text-white">
                          Pending Milestones
                        </h3>

                        <p className="text-gray-300 text-sm mt-1">
                          Developmental observations
                        </p>

                      </div>

                      <div className="px-3 py-2 rounded-full bg-accent/20 text-white text-sm backdrop-blur-md border border-white/10">

                        5 Pending

                      </div>

                    </div>

                    {/* MILESTONE LIST */}
                    <div className="space-y-4">

                      {[
                        ["Responds To Name", "Expected by 6 months", "🧠"],
                        ["Sits Without Support", "Expected by 8 months", "👶"],
                        ["Transfers Objects", "Expected by 7 months", "✋"],
                        ["Crawls Forward", "Expected by 9 months", "🚼"],
                        ["Waves Bye-Bye", "Expected by 10 months", "👋"],
                      ].map((item, index) => (

                        <motion.div
                          key={index}
                          animate={{
                            x: [0, index % 2 === 0 ? 5 : -5, 0],
                          }}
                          transition={{
                            duration: 4 + index,
                            repeat: Infinity,
                          }}
                          className="
                            flex
                            items-center
                            justify-between
                            bg-white/10
                            border
                            border-white/10
                            rounded-2xl
                            px-5
                            py-4
                            backdrop-blur-md
                          "
                        >

                          <div>

                            <h4 className="text-white font-semibold">
                              {item[0]}
                            </h4>

                            <p className="text-gray-300 text-sm mt-1">
                              {item[1]}
                            </p>

                          </div>

                          <span className="text-2xl">
                            {item[2]}
                          </span>

                        </motion.div>

                      ))}

                    </div>

                  </div>

                </div>

              </motion.div>

            </div>

          </div>

        </section>

        {/* FROM THE DOCTOR */}
        <section className="bg-secondary py-24">

          <div className="max-w-7xl mx-auto px-6 lg:px-12">

            <div className="grid lg:grid-cols-[320px_1fr] gap-14 items-start">

              {/* LEFT */}
              <div className="flex flex-col items-center">

                <motion.img
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9-4S_ljsTGShfO_GSIZfPBip38oUxE9CI8w&s"
                  alt="Dr. Samir Shah"
                  className="
                    w-[260px]
                    h-[260px]
                    object-cover
                    rounded-full
                    border-[6px]
                    border-primary
                    shadow-2xl
                  "
                />

                <button
                  className="
                    mt-10
                    px-10
                    py-4
                    rounded-2xl
                    bg-primary
                    text-white
                    font-semibold
                    shadow-xl
                    hover:scale-105
                    hover:shadow-2xl
                    transition
                    duration-300
                  "
                >

                  Learn More

                </button>

              </div>

              {/* RIGHT */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >

                <h3 className="text-4xl font-bold text-white mb-2">

                  From the Desk of Dr. Samir Shah

                </h3>

                <p className="text-primary uppercase tracking-widest font-semibold mb-8">

                  Pediatrician • 22+ Years Experience

                </p>

                <p className="text-gray-300 text-lg leading-relaxed mb-6">

                  "As a pediatrician, I've shared in the joy and concern
                  of countless parents. While every child develops at
                  their own unique pace, tracking milestones is an
                  invaluable tool."

                </p>

                <p className="text-gray-300 text-lg leading-relaxed mb-6">

                  It not only helps in the early identification of
                  potential concerns but also empowers parents to
                  celebrate each wonderful new skill and achievement.

                </p>

                <p className="text-gray-300 text-lg leading-relaxed">

                  This platform was created to be a reliable,
                  reassuring, and simple resource to help families
                  document this incredible developmental journey.

                </p>

              </motion.div>

            </div>

          </div>

        </section>

        {/* FROM THE DEVELOPER */}
        <section className="bg-background py-24">

          <div className="max-w-7xl mx-auto px-6 lg:px-12">

            <div className="flex flex-col lg:flex-row-reverse items-center gap-14">

              {/* IMAGE */}
              <motion.img
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                src="/dev.jpg"
                alt="Developer"
                className="
                  w-[320px]
                  h-[320px]
                  object-cover
                  rounded-[32px]
                  shadow-2xl
                  border
                  border-white/20
                  flex-shrink-0
                "
              />

              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex-1"
              >

                <div className="inline-block px-5 py-2 rounded-full bg-accent/10 text-accent font-semibold mb-6">

                  From the Developer

                </div>

                <h3 className="text-4xl lg:text-5xl font-bold text-secondary leading-tight mb-8">

                  Bridging
                  <span className="text-accent">
                    {" "}Medicine & Technology.
                  </span>

                </h3>

                <p className="text-gray-600 text-lg leading-relaxed mb-6">

                  Hi — I’m Devansh Shah.
                  When I’m not buried in MBBS textbooks or clinical postings,
                  I’m usually building technology that solves real healthcare problems.

                </p>

                <p className="text-gray-600 text-lg leading-relaxed mb-6">

                  PediMilestones was born from a simple observation:
                  parents often struggle to understand developmental milestones
                  and growth charts despite how important they truly are.

                </p>

                <p className="text-gray-600 text-lg leading-relaxed mb-6">

                  I wanted to create something different —
                  a platform that feels modern, reassuring, medically meaningful,
                  and genuinely easy to use.

                </p>

                <p className="text-gray-600 text-lg leading-relaxed mb-10">

                  Built with privacy, clinical accuracy, and thoughtful design
                  at its core, PediMilestones aims to make pediatric development
                  tracking simpler, smarter, and more human.

                </p>

                <button
                  className="
                    px-8
                    py-4
                    rounded-2xl
                    bg-accent
                    text-white
                    font-semibold
                    shadow-xl
                    hover:scale-105
                    hover:shadow-2xl
                    transition
                    duration-300
                  "
                >

                  Learn More

                </button>

              </motion.div>

            </div>

          </div>

        </section>

      </div>

    </MainLayout>

  );

}

export default Home;