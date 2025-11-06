import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jeffrey Lepelblad - The Soul Behind the Sound',
  description: 'Jeffrey Lepelblad is a distinguished composer and producer based in Amsterdam, specializing in creating authentic, soul-based music for visual media.',
};

export default function PortfolioPage() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Montserrat:wght@300;400;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Montserrat', sans-serif;
          background: #000000;
          color: #ffffff;
          line-height: 1.8;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        }

        /* COVER SECTION */
        .cover {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 60px 40px;
          background: linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%),
                      url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%23000000"/></svg>');
          background-size: cover;
          background-position: center;
          border-bottom: 3px solid #D4AF37;
        }

        .cover::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          bottom: 20px;
          border: 2px solid #D4AF37;
          pointer-events: none;
        }

        .logo {
          width: 120px;
          height: 120px;
          margin: 0 auto 30px;
          background: radial-gradient(circle, #D4AF37 0%, #B8960C 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          font-weight: 900;
          color: #000;
          box-shadow: 0 10px 40px rgba(212, 175, 55, 0.4);
          animation: glow 3s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 10px 40px rgba(212, 175, 55, 0.4); }
          50% { box-shadow: 0 10px 60px rgba(212, 175, 55, 0.7); }
        }

        h1 {
          font-family: 'Playfair Display', serif;
          font-size: 72px;
          font-weight: 900;
          color: #D4AF37;
          margin-bottom: 20px;
          letter-spacing: 4px;
          text-shadow: 0 4px 20px rgba(212, 175, 55, 0.5);
        }

        .tagline {
          font-size: 28px;
          font-weight: 300;
          color: #ffffff;
          margin-bottom: 50px;
          font-style: italic;
        }

        .hero-image {
          width: 100%;
          max-width: 600px;
          height: 400px;
          object-fit: cover;
          border: 3px solid #D4AF37;
          border-radius: 8px;
          margin: 40px auto;
          box-shadow: 0 20px 60px rgba(212, 175, 55, 0.3);
        }

        .contact-overlay {
          margin-top: 40px;
          font-size: 14px;
          color: #D4AF37;
          font-weight: 400;
        }

        .contact-overlay a {
          color: #D4AF37;
          text-decoration: none;
          margin: 0 15px;
          transition: all 0.3s;
        }

        .contact-overlay a:hover {
          color: #FFD700;
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
        }

        /* CONTENT SECTIONS */
        section {
          padding: 80px 60px;
          border-bottom: 1px solid #333;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          color: #D4AF37;
          margin-bottom: 30px;
          text-align: center;
          font-weight: 700;
        }

        .quote-box {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border: 2px solid #D4AF37;
          border-radius: 12px;
          padding: 40px;
          margin: 40px 0;
          position: relative;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .quote-box::before {
          content: '"';
          position: absolute;
          top: -20px;
          left: 30px;
          font-size: 120px;
          color: #D4AF37;
          font-family: 'Playfair Display', serif;
          opacity: 0.3;
        }

        .quote-text {
          font-size: 22px;
          font-style: italic;
          color: #ffffff;
          line-height: 1.8;
          text-align: center;
        }

        .bio-text {
          font-size: 18px;
          line-height: 2;
          color: #cccccc;
          margin-bottom: 30px;
        }

        .values {
          display: flex;
          justify-content: space-around;
          margin-top: 50px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .value-item {
          text-align: center;
          padding: 30px;
          background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
          border: 2px solid #D4AF37;
          border-radius: 12px;
          flex: 1;
          min-width: 200px;
          transition: all 0.3s;
        }

        .value-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(212, 175, 55, 0.3);
        }

        .value-icon {
          font-size: 42px;
          margin-bottom: 15px;
        }

        .value-title {
          font-size: 14px;
          font-weight: 700;
          color: #D4AF37;
          letter-spacing: 1px;
          line-height: 1.4;
        }

        /* TRACK CARDS */
        .tracks-grid {
          display: grid;
          gap: 40px;
          margin-top: 50px;
        }

        .track-card {
          background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
          border: 3px solid #D4AF37;
          border-radius: 16px;
          padding: 40px;
          transition: all 0.4s;
          position: relative;
          overflow: hidden;
        }

        .track-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
          transition: left 0.6s;
        }

        .track-card:hover::before {
          left: 100%;
        }

        .track-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(212, 175, 55, 0.4);
          border-color: #FFD700;
        }

        .track-number {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 72px;
          font-weight: 900;
          color: rgba(212, 175, 55, 0.1);
          font-family: 'Playfair Display', serif;
        }

        .track-title {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          color: #D4AF37;
          margin-bottom: 25px;
          font-weight: 700;
        }

        .track-detail {
          margin-bottom: 20px;
        }

        .track-label {
          font-size: 14px;
          color: #D4AF37;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .track-content {
          font-size: 16px;
          color: #cccccc;
          line-height: 1.8;
        }

        .listen-btn {
          display: inline-block;
          margin-top: 25px;
          padding: 15px 40px;
          background: linear-gradient(135deg, #D4AF37 0%, #B8960C 100%);
          color: #000000;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 700;
          font-size: 16px;
          transition: all 0.3s;
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        }

        .listen-btn:hover {
          background: linear-gradient(135deg, #FFD700 0%, #D4AF37 100%);
          box-shadow: 0 15px 40px rgba(212, 175, 55, 0.5);
          transform: scale(1.05);
        }

        /* CONTACT SECTION */
        .contact-section {
          background: linear-gradient(135deg, #0a0a0a 0%, #000000 100%);
          text-align: center;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }

        .contact-item {
          padding: 30px;
          background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
          border: 2px solid #D4AF37;
          border-radius: 12px;
        }

        .contact-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }

        .contact-label {
          font-size: 14px;
          color: #D4AF37;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .contact-value {
          font-size: 18px;
          color: #ffffff;
          font-weight: 400;
        }

        .contact-value a {
          color: #ffffff;
          text-decoration: none;
          transition: color 0.3s;
        }

        .contact-value a:hover {
          color: #D4AF37;
        }

        .final-quote {
          margin-top: 80px;
          padding: 60px 40px;
          background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
          border: 3px solid #D4AF37;
          border-radius: 16px;
        }

        .final-quote-text {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          color: #D4AF37;
          text-align: center;
          font-weight: 700;
          font-style: italic;
          text-shadow: 0 4px 20px rgba(212, 175, 55, 0.5);
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          h1 { font-size: 48px; }
          .tagline { font-size: 20px; }
          .section-title { font-size: 32px; }
          .track-title { font-size: 28px; }
          .final-quote-text { font-size: 32px; }
          section { padding: 60px 30px; }
        }

        @media print {
          .container {
            max-width: 100%;
          }
          .track-card, .contact-item {
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="container">
        {/* COVER */}
        <div className="cover">
          <div className="logo">JL</div>
          <h1>JEFFREY LEPELBLAD</h1>
          <p className="tagline">The Soul Behind the Sound</p>

          <div style={{
            width: '100%',
            maxWidth: '600px',
            height: '400px',
            background: '#1a1a1a',
            border: '3px solid #D4AF37',
            borderRadius: '8px',
            margin: '40px auto',
            boxShadow: '0 20px 60px rgba(212, 175, 55, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img
              src="https://i.imgur.com/RKVGj3L.jpeg"
              alt="Jeffrey Lepelblad Live Performance"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div className="contact-overlay">
            <a href="mailto:infojflabs@gmail.com">infojflabs@gmail.com</a> |
            <a href="tel:+31644142489">+31 6 44142489</a>
          </div>
        </div>

        {/* PHILOSOPHY & BIOGRAPHY */}
        <section>
          <h2 className="section-title">THE SOUND OF A STORY 🎶</h2>

          <div className="quote-box">
            <p className="quote-text">
              In advertising, it&apos;s not about what you&apos;re selling, but how you make the viewer feel.
              My sound is the emotional signature that connects the brand to the listener&apos;s soul.
            </p>
          </div>

          <h3 style={{
            fontSize: '32px',
            color: '#D4AF37',
            margin: '60px 0 30px',
            textAlign: 'center',
            fontFamily: "'Playfair Display', serif"
          }}>
            About Jeffrey Lepelblad
          </h3>

          <p className="bio-text">
            <strong>Jeffrey Lepelblad</strong> is a distinguished composer and producer based in <strong>Amsterdam</strong>,
            specializing in creating authentic, <strong>soul-based</strong> music for visual media.
          </p>

          <p className="bio-text">
            With a deep understanding of storytelling and brand identity, Jeffrey translates concepts into soundtracks
            that guarantee resonance and depth. His work seamlessly bridges <strong>classic soul, jazz,
            R&amp;B, and modern electronic music</strong>, resulting in a unique, warm, and <em>uplifting</em> sound.
          </p>

          <p className="bio-text">
            He delivers music that not only supports the message but anchors it in the collective memory of the target audience.
          </p>

          <div className="values">
            <div className="value-item">
              <div className="value-icon">✨</div>
              <div className="value-title">AUTHENTICITY</div>
            </div>
            <div className="value-item">
              <div className="value-icon">❤️</div>
              <div className="value-title">EMOTIONAL DEPTH</div>
            </div>
            <div className="value-item">
              <div className="value-icon">🎵</div>
              <div className="value-title">UPLIFTING GROOVE</div>
            </div>
          </div>
        </section>

        {/* SELECTED TRACKS */}
        <section>
          <h2 className="section-title">SELECTED TRACKS: Sound &amp; Strategy</h2>

          <div className="tracks-grid">
            {/* Track 1 */}
            <div className="track-card">
              <div className="track-number">01</div>
              <h3 className="track-title">🥇 Coca-Cola Vibe</h3>

              <div className="track-detail">
                <div className="track-label">Core Sound</div>
                <div className="track-content">
                  Positive, soulful sound with an <strong>uplifting groove</strong>.
                </div>
              </div>

              <div className="track-detail">
                <div className="track-label">Strategic Advantage</div>
                <div className="track-content">
                  Radiates universal happiness and a &apos;feel-good&apos; atmosphere. Ideal for increasing brand affinity.
                </div>
              </div>

              <div className="track-detail">
                <div className="track-label">Perfect For</div>
                <div className="track-content">
                  Consumer Goods (FMCG), Travel, Summer/Festival Campaigns.
                </div>
              </div>

              <a href="https://youtu.be/-Ot1wjVTblM" target="_blank" rel="noopener noreferrer" className="listen-btn">
                ▶ LISTEN ON YOUTUBE
              </a>
            </div>

            {/* Track 2 */}
            <div className="track-card">
              <div className="track-number">02</div>
              <h3 className="track-title">📖 Rise Again</h3>

              <div className="track-detail">
                <div className="track-label">Core Sound</div>
                <div className="track-content">
                  Authentic, warm, and <strong>inspiring</strong>, ideal for storytelling.
                </div>
              </div>

              <div className="track-detail">
                <div className="track-label">Strategic Advantage</div>
                <div className="track-content">
                  Builds credibility and trust. Perfect for campaigns conveying a human,
                  transformative message.
                </div>
              </div>

              <div className="track-detail">
                <div className="track-label">Perfect For</div>
                <div className="track-content">
                  Corporate Branding, Non-profit, Social Campaigns, Luxury Automobiles (emotion-driven).
                </div>
              </div>

              <a href="https://youtu.be/Sr0RjEvmXww" target="_blank" rel="noopener noreferrer" className="listen-btn">
                ▶ LISTEN ON YOUTUBE
              </a>
            </div>

            {/* Track 3 */}
            <div className="track-card">
              <div className="track-number">03</div>
              <h3 className="track-title">🏙️ Flow Motion</h3>

              <div className="track-detail">
                <div className="track-label">Core Sound</div>
                <div className="track-content">
                  Rhythmic, modern, and <strong>powerful</strong>, perfect for city &amp; lifestyle brands.
                </div>
              </div>

              <div className="track-detail">
                <div className="track-label">Strategic Advantage</div>
                <div className="track-content">
                  Brings energy and dynamism. Positions a brand as <em>cutting-edge</em> and relevant
                  to a young, urban audience.
                </div>
              </div>

              <div className="track-detail">
                <div className="track-label">Perfect For</div>
                <div className="track-content">
                  City &amp; Lifestyle Brands, Sportswear, New Technology, Fintech.
                </div>
              </div>

              <a href="https://youtu.be/yfQl0zxMVa4" target="_blank" rel="noopener noreferrer" className="listen-btn">
                ▶ LISTEN ON YOUTUBE
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact-section">
          <h2 className="section-title">CREATE SYNERGY &amp; CONTACT</h2>

          <p style={{
            fontSize: '22px',
            color: '#cccccc',
            margin: '30px 0 50px',
            lineHeight: '1.8'
          }}>
            Ready to inject soul into your next campaign?<br />
            Let&apos;s discover the perfect sound synergy for your brand.
          </p>

          <div className="contact-grid">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div className="contact-label">Email</div>
              <div className="contact-value">
                <a href="mailto:infojflabs@gmail.com">infojflabs@gmail.com</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div className="contact-label">Phone</div>
              <div className="contact-value">
                <a href="tel:+31644142489">+31 6 44142489</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-label">Location</div>
              <div className="contact-value">Amsterdam, Netherlands</div>
            </div>
          </div>

          <div className="final-quote">
            <p className="final-quote-text">⚜️ Every sound tells a story ⚜️</p>
          </div>
        </section>
      </div>
    </>
  );
}
