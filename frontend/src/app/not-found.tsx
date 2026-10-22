import { Header } from '@/components/header';

export default function NotFound() {
  return (
    <>
      <Header current="" />
      <main id="main" className="section">
        <div className="container">
          <h1>Page not found.</h1>
          <p>The page you requested could not be found.</p>
          <a href="/">Return to the homepage</a>
        </div>
      </main>
    </>
  );
}
