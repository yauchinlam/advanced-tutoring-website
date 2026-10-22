import { Closing } from '@/components/closing';
import { siteConfig } from '@/lib/site-config';
import { Header } from '@/components/header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('about');

export default function Page() {
  return (
    <>
      <Header current="about" />
      <main id="main">
        <section className="section page-intro" aria-labelledby="page-title">
          <div className="container">
            <p className="eyebrow">About your tutor</p>
            <h1 id="page-title">Patient teaching. Strong foundations.</h1>
            <p className="intro">
              Get to know the background and experience behind the tutoring, and
              the belief that a clear explanation can change how a subject
              feels.
            </p>
          </div>
        </section>
        <section
          className="section credentials"
          id="credentials"
          aria-labelledby="credentials-title"
        >
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-5">
                <p className="eyebrow">Academic profile</p>
                <img
                  className="tutor-headshot img-fluid"
                  src="/assets/yauchin-lam-headshot.jpg"
                  alt="Portrait of the tutor"
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
                <h2 id="credentials-title">
                  {'Meet '}
                  <span data-business="publicName">
                    {siteConfig.publicName}
                  </span>
                  .
                </h2>
                <p className="profile-title" data-business="professionalTitle">
                  {siteConfig.professionalTitle}
                </p>
                <p>
                  A mathematics graduate of Stevens Institute of Technology with
                  a minor in Physics, I bring approximately four years of prior
                  tutoring experience and a professional background as a Senior
                  Software Engineer, including Microsoft experience.
                </p>
                <p>
                  I enjoy the theory behind mathematics and the way physics puts
                  it to work. My teaching is patient, analytical, and adapted to
                  what each student needs to understand next.
                </p>
                <p>
                  Questions are encouraged. There is no expectation that you
                  already understand the material.
                </p>
              </div>
              <div className="col-lg-7">
                <dl className="profile-details mb-0">
                  <div>
                    <dt>Mathematics education</dt>
                    <dd>
                      B.S. in Pure &amp; Applied Mathematics, Stevens Institute
                      of Technology
                    </dd>
                  </div>
                  <div>
                    <dt>Physics background</dt>
                    <dd>
                      Minor in Physics, with a focus on connecting mathematics
                      to physical application.
                    </dd>
                  </div>
                  <div>
                    <dt>Tutoring experience</dt>
                    <dd>
                      Approximately four years of prior tutoring experience,
                      including high-school and college students.
                    </dd>
                  </div>
                  <div>
                    <dt>Teaching &amp; mentoring</dt>
                    <dd>
                      Teaching and TA experience, one-on-one and group
                      instruction, and mentoring junior software engineers.
                    </dd>
                  </div>
                  <div>
                    <dt>Professional application</dt>
                    <dd>
                      Senior Software Engineer and former Microsoft
                      professional; experience guiding developers through code
                      reviews, pair programming, and technical problem-solving.
                    </dd>
                  </div>
                  <div>
                    <dt>Service background</dt>
                    <dd>
                      U.S. Navy veteran, with experience training and mentoring
                      in technical environments.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
        <Closing />
      </main>
    </>
  );
}
