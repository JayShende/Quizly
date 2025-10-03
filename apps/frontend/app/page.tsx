import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { interFont, openSansFont } from "@/app/fonts/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  LuBrain,
  LuClock,
  LuChartBar,
  LuUsers,
  LuShield,
  LuZap,
  LuArrowRight,
} from "react-icons/lu";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
             repeating-linear-gradient(
                  to right,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
                repeating-linear-gradient(
                  to bottom,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
                radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
          `,
          WebkitMaskImage: `
    repeating-linear-gradient(
                  to right,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
                repeating-linear-gradient(
                  to bottom,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
                radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 py-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div
              className={cn(
                "text-2xl font-bold text-indigo-600",
                interFont.className
              )}
            >
              Quizly
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <button className="px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors">
                  Sign In
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h1
              className={cn(
                "text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight",
                interFont.className
              )}
            >
              Master Your Knowledge with
              <span className="text-indigo-600 block">Smart Quizzes</span>
            </h1>
            <p
              className={cn(
                "text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed",
                openSansFont.className
              )}
            >
              Create, take, and track quizzes with our intelligent platform.
              Perfect for students, educators, and professionals looking to
              enhance their learning experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/login">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg rounded-md transition-colors flex items-center">
                  Start Learning Now
                  <LuArrowRight className="ml-2" />
                </button>
              </Link>
              <Link href="#features">
                <button className="px-8 py-4 text-lg border border-gray-300 hover:bg-gray-50 rounded-md transition-colors">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className={cn(
                  "text-4xl font-bold text-gray-900 mb-4",
                  interFont.className
                )}
              >
                Why Choose Quizly?
              </h2>
              <p
                className={cn(
                  "text-xl text-gray-600 max-w-2xl mx-auto",
                  openSansFont.className
                )}
              >
                Everything you need to create engaging quizzes and track your
                progress
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LuBrain className="w-8 h-8 text-indigo-600" />
                  </div>
                  <CardTitle
                    className={cn("text-xl text-gray-900", interFont.className)}
                  >
                    Smart Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription
                    className={cn(
                      "text-gray-600 text-center",
                      openSansFont.className
                    )}
                  >
                    Create intelligent quizzes with multiple question types and
                    adaptive difficulty levels.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LuClock className="w-8 h-8 text-indigo-600" />
                  </div>
                  <CardTitle
                    className={cn("text-xl text-gray-900", interFont.className)}
                  >
                    Timed Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription
                    className={cn(
                      "text-gray-600 text-center",
                      openSansFont.className
                    )}
                  >
                    Set time limits and create pressure-free learning
                    environments with our timer system.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LuUsers className="w-8 h-8 text-indigo-600" />
                  </div>
                  <CardTitle
                    className={cn("text-xl text-gray-900", interFont.className)}
                  >
                    Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription
                    className={cn(
                      "text-gray-600 text-center",
                      openSansFont.className
                    )}
                  >
                    Compete with others and climb the leaderboard to showcase
                    your knowledge and achievements.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LuZap className="w-8 h-8 text-indigo-600" />
                  </div>
                  <CardTitle
                    className={cn("text-xl text-gray-900", interFont.className)}
                  >
                    Instant Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription
                    className={cn(
                      "text-gray-600 text-center",
                      openSansFont.className
                    )}
                  >
                    Get immediate feedback and scores to accelerate your
                    learning journey.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className={cn(
                "text-4xl font-bold text-gray-900 mb-6",
                interFont.className
              )}
            >
              Ready to Start Learning?
            </h2>
            <p
              className={cn(
                "text-xl text-gray-600 mb-8 max-w-2xl mx-auto",
                openSansFont.className
              )}
            >
              Join thousands of learners who are already improving their
              knowledge with Quizly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/auth/login">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg rounded-md transition-colors flex items-center">
                  Get Started Free
                  <LuArrowRight className="ml-2" />
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="px-8 py-4 text-lg border border-gray-300 hover:bg-gray-50 rounded-md transition-colors bg-white">
                  View Demo
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div
                className={cn(
                  "text-2xl font-bold mb-4 md:mb-0",
                  interFont.className
                )}
              >
                Quizly
              </div>
              <div className="flex items-center gap-6">
                <Link
                  href="/auth/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="#features"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className={cn("text-gray-400", openSansFont.className)}>
                © 2024 Quizly. All rights reserved. Built with ❤️ By 
                <Link href="https://unseenjs.xyz">
                Jay Shende
                </Link>
                .
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
