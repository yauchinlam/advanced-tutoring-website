import { Closing } from '@/components/closing';
import { BookingLink } from '@/components/booking-link';
import { siteConfig } from '@/lib/site-config';
import { Header } from '@/components/header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('index');

export default function Page() {
  return (
    <>
      <Header current="index" />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="hero-copy col-lg-6">
                <p className="eyebrow">
                  High-school &amp; college · Mathematics &amp; physics
                </p>
                <h1 id="hero-title">
                  Advanced mathematics.
                  <br />
                  <span>Physics made clear.</span>
                </h1>
                <p>
                  Patient, adaptive tutoring for students tackling difficult
                  coursework, missing foundations, or an explanation that hasn’t
                  clicked yet. You do not need to already be good at math to
                  begin.
                </p>
                <p>
                  From algebra and geometry through advanced calculus and
                  physics, build understanding at your own pace, with guidance
                  that helps you solve problems independently.
                </p>
                <p className="service-location" data-business="locationText">
                  {siteConfig.locationText}
                </p>
                <div className="actions d-flex flex-wrap gap-3">
                  <BookingLink className="btn btn-primary button">
                    <span data-business="primaryCta">
                      {siteConfig.primaryCta}
                    </span>{' '}
                    <span aria-hidden="true">↗</span>
                  </BookingLink>
                  <a
                    className="btn btn-outline-secondary button secondary"
                    href="#expertise"
                  >
                    {'Explore Subjects '}
                    <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="notebook" aria-hidden="true">
                  <div className="notebook-label">
                    <span>THE LANGUAGE OF UNDERSTANDING</span>
                    <span>01 / NOTES</span>
                  </div>
                  <div className="equation">
                    ∫<sub>a</sub>
                    <sup>b</sup>
                    {' f′(x) dx = f(b) − f(a)'}
                  </div>
                  <div className="graph">
                    <span className="axis-x">x</span>
                    <span className="axis-y">y</span>
                  </div>
                  <p className="notebook-note">
                    CONCEPT → CONNECTION → SOLUTION
                  </p>
                </div>
              </div>
            </div>
            <div
              className="trust-row d-flex flex-wrap"
              aria-label="Tutoring features"
            >
              <span>1-on-1 Instruction</span>
              <span>High-School &amp; College</span>
              <span>Online &amp; In Person</span>
              <span>Structured Problem Solving</span>
            </div>
          </div>
        </section>
        <section className="audience" aria-labelledby="audience-title">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-4">
                <h2 id="audience-title">
                  A different explanation can make a difference.
                </h2>
              </div>
              <div className="col-lg-8">
                <p>
                  Whether you’re a student working to catch up or a parent
                  looking for thoughtful academic support, the starting point is
                  what the student understands now.
                </p>
                <ul className="tags d-flex flex-wrap gap-2">
                  <li>High-school students</li>
                  <li>Honors &amp; AP students</li>
                  <li>College &amp; university students</li>
                  <li>Mathematics &amp; physics students</li>
                  <li>Engineering &amp; STEM students</li>
                  <li>Math coursework for other majors</li>
                  <li>Graduate students: case-by-case</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section
          className="section expertise"
          id="expertise"
          aria-labelledby="expertise-title"
        >
          <div className="container">
            <div className="section-top">
              <p className="eyebrow">Core expertise</p>
              <h2 id="expertise-title">
                Rigorous subjects.
                <br />
                Clear explanations.
              </h2>
              <p className="intro">
                Build the foundations, connect the ideas, and learn how to
                approach unfamiliar problems with a method.
              </p>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <div className="col">
                <article className="subject card h-100">
                  <span className="symbol" aria-hidden="true">
                    x
                  </span>
                  <h3>Algebra</h3>
                  <p>
                    Strengthen the prerequisite skills that make later
                    mathematics more approachable.
                  </p>
                  <ul className="topic-list">
                    <li>Equations &amp; inequalities</li>
                    <li>Functions &amp; graphs</li>
                    <li>Symbolic reasoning</li>
                  </ul>
                </article>
              </div>
              <div className="col">
                <article className="subject card h-100">
                  <span className="symbol" aria-hidden="true">
                    △
                  </span>
                  <h3>Geometry</h3>
                  <p>Connect diagrams, relationships, and logical reasoning.</p>
                  <ul className="topic-list">
                    <li>Geometric relationships</li>
                    <li>Coordinate geometry</li>
                    <li>Proof &amp; reasoning</li>
                  </ul>
                </article>
              </div>
              <div className="col">
                <article className="subject card h-100">
                  <span className="symbol" aria-hidden="true">
                    θ
                  </span>
                  <h3>Trigonometry</h3>
                  <p>
                    Understand the relationships behind trigonometric methods.
                  </p>
                  <ul className="topic-list">
                    <li>Angles &amp; the unit circle</li>
                    <li>Trigonometric functions</li>
                    <li>Identities &amp; equations</li>
                  </ul>
                </article>
              </div>
              <div className="col">
                <article className="subject card h-100">
                  <span className="symbol" aria-hidden="true">
                    ƒ
                  </span>
                  <h3>Precalculus</h3>
                  <p>
                    Build a connected foundation for the transition into
                    calculus.
                  </p>
                  <ul className="topic-list">
                    <li>Functions &amp; transformations</li>
                    <li>Exponential &amp; logarithmic functions</li>
                    <li>Preparation for calculus</li>
                  </ul>
                </article>
              </div>
              <div className="col">
                <article className="subject card h-100">
                  <span className="symbol" aria-hidden="true">
                    ∫
                  </span>
                  <h3>Calculus</h3>
                  <p>
                    Connect rates of change and accumulation, from introductory
                    to advanced undergraduate work.
                  </p>
                  <ul className="topic-list">
                    <li>Calculus I &amp; II</li>
                    <li>Calculus III / Multivariable Calculus</li>
                    <li>Differential Equations</li>
                  </ul>
                </article>
              </div>
              <div className="col">
                <article className="subject card h-100">
                  <span className="symbol" aria-hidden="true">
                    P
                  </span>
                  <h3>Statistics</h3>
                  <p>
                    Develop careful reasoning about data, uncertainty, and
                    inference.
                  </p>
                  <ul className="topic-list">
                    <li>Probability &amp; distributions</li>
                    <li>Estimation</li>
                    <li>Hypothesis testing</li>
                  </ul>
                </article>
              </div>
              <div className="col">
                <article className="subject card h-100">
                  <span className="symbol" aria-hidden="true">
                    ψ
                  </span>
                  <h3>Physics</h3>
                  <p>
                    Connect mathematical reasoning to theory and physical
                    application.
                  </p>
                  <ul className="topic-list">
                    <li>Mechanics</li>
                    <li>Electricity &amp; magnetism</li>
                    <li>Oscillations &amp; waves</li>
                  </ul>
                </article>
              </div>
              <div className="col">
                <aside className="subject-note h-100">
                  <p className="eyebrow">Beyond the core courses</p>
                  <h3>Taking advanced college mathematics?</h3>
                  <p>
                    Share your syllabus and the topics you need help with.
                    Advanced undergraduate requests and graduate coursework are
                    considered individually.
                  </p>
                </aside>
              </div>
            </div>
          </div>
        </section>
        <section
          className="section"
          id="approach"
          aria-labelledby="approach-title"
        >
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-5">
                <p className="eyebrow">Teaching approach</p>
                <h2 id="approach-title">
                  Understand the why.
                  <br />
                  Then solve the how.
                </h2>
                <p className="intro">
                  A useful session goes beyond the answer to a single problem.
                  The focus is on the concepts, decisions, and reasoning you can
                  use on the next one.
                </p>
                <p className="principle">
                  Successful tutoring should eventually make the tutor
                  unnecessary. The goal is understanding and independent
                  problem-solving, with progressively less assistance.
                </p>
              </div>
              <div className="col-lg-7">
                <ol className="steps mb-0">
                  <li>
                    <div>
                      <h3>Identify the conceptual gap.</h3>
                      <p>
                        Start with your questions. If you cannot identify what
                        is confusing, work backward to what you do understand
                        and find where the gap begins.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Rebuild the underlying concept.</h3>
                      <p>
                        Repair missing prerequisites before moving forward.
                        Adapt the explanation, examples, and pace to the
                        student.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Work through representative problems.</h3>
                      <p>
                        Connect theory to practice, then have the student work
                        through problems with decreasing assistance.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Explain the reasoning yourself.</h3>
                      <p>
                        Talk through the solution and test your understanding
                        with guiding questions.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Develop an independent strategy.</h3>
                      <p>
                        Identify patterns, practice a related problem, and
                        decide what to work on next.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="section" aria-labelledby="about-preview-title">
          <div className="container">
            <p className="eyebrow">Meet your tutor</p>
            <h2 id="about-preview-title">
              A patient guide through difficult material.
            </h2>
            <p className="intro">
              Learn about the teaching experience, mathematics education, and
              professional background behind each session.
            </p>
            <a href="/about.html">
              {'Get to know your tutor '}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
        <Closing />
      </main>
    </>
  );
}
