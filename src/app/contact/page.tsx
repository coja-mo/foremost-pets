'use client';

import React, { useState, useRef, useEffect } from 'react';
import StorefrontHeader from '@/components/StorefrontHeader';
import StorefrontFooter from '@/components/StorefrontFooter';
import {
  Mail, Phone, MapPin, Clock, Send, ChevronDown, ChevronUp,
  PawPrint, MessageCircle, HelpCircle, Heart, CheckCircle,
} from 'lucide-react';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Section({ children }: { children: React.ReactNode }) {
  const ref = useScrollReveal();
  return <div ref={ref} className="sf-section">{children}</div>;
}

const FAQ_ITEMS = [
  {
    q: 'What brands do you carry?',
    a: 'We stock premium brands including Fromm, GO! Solutions, ACANA, ORIJEN, Stella & Chewy\'s, Open Farm, Ziwi Peak, and Nulo. We\'re always happy to special order products too.',
  },
  {
    q: 'Can I return a product my pet didn\'t like?',
    a: 'Absolutely! We offer hassle-free returns on unopened products within 30 days. For opened food products, we work with our brand partners to arrange satisfaction guarantees.',
  },
  {
    q: 'Do you offer pet nutrition consultations?',
    a: 'Yes! Our team is trained in pet nutrition and can help you find the right food for your pet\'s breed, age, activity level, and any special dietary needs — all at no charge.',
  },
  {
    q: 'How does the Paw Rewards program work?',
    a: 'Simply sign up for free at either location. You\'ll earn 10 points per $1 spent. Points can be redeemed for discounts, and you unlock exclusive perks as you reach higher tiers.',
  },
  {
    q: 'Do you sell fish and aquarium supplies?',
    a: 'Yes! Our Second Line location carries a selection of freshwater fish, aquarium supplies, food, and accessories. Visit us or call to check current stock.',
  },
  {
    q: 'What are your store hours?',
    a: 'Both locations are open Monday through Saturday from 9am to 6pm, and Sunday from 11am to 4pm. Holiday hours may vary — follow us on social media for updates.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--fp-bg)' }}>
      <StorefrontHeader />

      {/* ===== HERO ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        padding: '64px 24px 80px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', bottom: '-30%', left: '-10%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 65%)',
          }} />
        </div>
        <div style={{
          maxWidth: 700, margin: '0 auto', textAlign: 'center',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: 'var(--radius-full)', padding: '6px 16px',
            fontSize: 13, fontWeight: 600, color: '#f59e0b', marginBottom: 24,
          }}>
            <MessageCircle size={14} /> Get in Touch
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 44, fontWeight: 900,
            color: 'white', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16,
          }}>We&apos;d Love to Hear From You</h1>
          <p style={{
            fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7,
            maxWidth: 480, margin: '0 auto',
          }}>
            Questions about products, nutrition advice, or just want to chat about pets?
            We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* ===== CONTACT FORM + INFO ===== */}
      <Section>
        <section style={{ padding: '64px 24px' }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto',
            display: 'grid', gridTemplateColumns: '1fr 400px', gap: 48,
            alignItems: 'flex-start',
          }}>
            {/* Form */}
            <div style={{
              background: 'white', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--fp-gray-100)',
              padding: '36px 32px',
            }}>
              {submitted ? (
                <div className="animate-scale-in" style={{
                  textAlign: 'center', padding: '40px 0',
                }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: '#dcfce7', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', margin: '0 auto 16px',
                  }}>
                    <CheckCircle size={32} color="#16a34a" />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800,
                    color: 'var(--fp-navy)', marginBottom: 8,
                  }}>Message Sent!</h3>
                  <p style={{ color: 'var(--fp-gray-400)', fontSize: 14, lineHeight: 1.7 }}>
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{
                    fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800,
                    color: 'var(--fp-navy)', marginBottom: 24,
                  }}>Send Us a Message</h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--fp-gray-500)', marginBottom: 6, display: 'block' }}>Name *</label>
                      <input
                        required className="fp-input"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--fp-gray-500)', marginBottom: 6, display: 'block' }}>Email *</label>
                      <input
                        required type="email" className="fp-input"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--fp-gray-500)', marginBottom: 6, display: 'block' }}>Phone</label>
                      <input
                        className="fp-input"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(705) 000-0000"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--fp-gray-500)', marginBottom: 6, display: 'block' }}>Subject</label>
                      <select
                        className="fp-input"
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      >
                        <option value="">Select a topic...</option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="nutrition-advice">Nutrition Advice</option>
                        <option value="order-question">Order Question</option>
                        <option value="loyalty-program">Paw Rewards</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--fp-gray-500)', marginBottom: 6, display: 'block' }}>Message *</label>
                    <textarea
                      required className="fp-input"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" style={{
                    width: '100%', padding: '14px 24px',
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(135deg, var(--fp-amber), var(--fp-amber-dark))',
                    color: 'white', border: 'none', cursor: 'pointer',
                    fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}>
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Quick contact */}
              <div style={{
                background: 'white', borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--fp-gray-100)', padding: '28px 24px',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 800,
                  color: 'var(--fp-navy)', marginBottom: 16,
                }}>Quick Contact</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 'var(--radius-md)',
                      background: 'var(--fp-amber-glow)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}><Phone size={16} color="var(--fp-amber-dark)" /></div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--fp-navy)' }}>Second Line</div>
                      <div style={{ color: 'var(--fp-gray-400)', fontSize: 13 }}>(705) 759-1234</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 'var(--radius-md)',
                      background: 'var(--fp-amber-glow)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}><Phone size={16} color="var(--fp-amber-dark)" /></div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--fp-navy)' }}>Trunk Road</div>
                      <div style={{ color: 'var(--fp-gray-400)', fontSize: 13 }}>(705) 949-2559</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 'var(--radius-md)',
                      background: 'var(--fp-amber-glow)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}><Mail size={16} color="var(--fp-amber-dark)" /></div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--fp-navy)' }}>Email</div>
                      <div style={{ color: 'var(--fp-gray-400)', fontSize: 13 }}>hello@foremostpetfoods.ca</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store hours */}
              <div style={{
                background: 'white', borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--fp-gray-100)', padding: '28px 24px',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 800,
                  color: 'var(--fp-navy)', marginBottom: 16,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <Clock size={16} color="var(--fp-amber)" /> Store Hours
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
                  {[
                    { day: 'Monday – Saturday', hours: '9:00 AM – 6:00 PM' },
                    { day: 'Sunday', hours: '11:00 AM – 4:00 PM' },
                    { day: 'Holidays', hours: 'Hours may vary' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: i < 2 ? '1px solid var(--fp-gray-100)' : 'none',
                    }}>
                      <span style={{ fontWeight: 600, color: 'var(--fp-navy)' }}>{item.day}</span>
                      <span style={{ color: 'var(--fp-gray-400)' }}>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loyalty CTA */}
              <div style={{
                background: 'linear-gradient(135deg, #1e293b, #334155)',
                borderRadius: 'var(--radius-xl)', padding: '28px 24px',
                textAlign: 'center',
              }}>
                <PawPrint size={28} color="#f59e0b" style={{ marginBottom: 12 }} />
                <h4 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 800,
                  color: 'white', marginBottom: 6,
                }}>Join Paw Rewards</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 16 }}>
                  Earn points on every purchase — it&apos;s free!
                </p>
                <a href="/loyalty" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '10px 20px', borderRadius: 'var(--radius-full)',
                  background: '#f59e0b', color: 'white', fontSize: 13,
                  fontWeight: 700, textDecoration: 'none',
                }}>
                  <Heart size={14} /> Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
      </Section>

      {/* ===== FAQ ===== */}
      <Section>
        <section style={{ padding: '64px 24px', background: 'white' }}>
          <div style={{ maxWidth: 740, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 700, color: 'var(--fp-amber-dark)',
                textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8,
              }}>
                <HelpCircle size={14} /> FAQ
              </div>
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800,
                color: 'var(--fp-navy)',
              }}>Frequently Asked Questions</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} style={{
                  border: '1px solid var(--fp-gray-100)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%', padding: '18px 20px',
                      background: openFaq === i ? 'var(--fp-gray-50)' : 'white',
                      border: 'none', cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      fontSize: 15, fontWeight: 600, color: 'var(--fp-navy)',
                      textAlign: 'left',
                    }}
                  >
                    {item.q}
                    {openFaq === i ? <ChevronUp size={18} color="var(--fp-amber)" /> : <ChevronDown size={18} color="var(--fp-gray-300)" />}
                  </button>
                  {openFaq === i && (
                    <div className="animate-fade-in" style={{
                      padding: '0 20px 18px',
                      fontSize: 14, color: 'var(--fp-gray-500)', lineHeight: 1.8,
                      background: 'var(--fp-gray-50)',
                    }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      <StorefrontFooter />
    </div>
  );
}
