import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export interface YachtDetail {
  name: string;
  subtitle: string;
  icon: string;
  tag: string;
  tagColor: string;
  desc: string;
  fullDesc: string;
  specs: string[];
  detailedSpecs: { label: string; value: string }[];
  price: string;
  priceNote: string;
  highlight: boolean;
  img: string;
  gallery: string[];
}

interface YachtModalProps {
  yacht: YachtDetail | null;
  onClose: () => void;
  onBook: () => void;
}

export default function YachtModal({ yacht, onClose, onBook }: YachtModalProps) {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (yacht) {
      setActiveImg(0);
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [yacht]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!yacht) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setActiveImg((p) => (p + 1) % allImages.length);
      if (e.key === "ArrowLeft") setActiveImg((p) => (p - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  if (!yacht) return null;

  const allImages = [yacht.img, ...yacht.gallery];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, #112240 0%, #0d1f3c 100%)",
          border: "1px solid rgba(38,201,195,0.2)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full transition-colors"
          style={{ color: "#fff", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
        >
          <Icon name="X" size={20} />
        </button>

        <div className="relative">
          <div className="relative h-72 md:h-96 overflow-hidden">
            <img
              src={allImages[activeImg]}
              alt={yacht.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(13,31,60,1) 0%, rgba(13,31,60,0) 60%)" }}
            />

            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImg((p) => (p - 1 + allImages.length) % allImages.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all hover:scale-110"
                  style={{ background: "rgba(0,0,0,0.5)", color: "#fff", backdropFilter: "blur(8px)" }}
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button
                  onClick={() => setActiveImg((p) => (p + 1) % allImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all hover:scale-110"
                  style={{ background: "rgba(0,0,0,0.5)", color: "#fff", backdropFilter: "blur(8px)" }}
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </>
            )}

            <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1.5">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: activeImg === i ? 24 : 8,
                    height: 8,
                    background: activeImg === i ? "var(--teal)" : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 px-6 -mt-10 relative z-10 overflow-x-auto pb-2 scrollbar-hide">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className="flex-shrink-0 rounded-xl overflow-hidden transition-all"
                style={{
                  width: 72,
                  height: 48,
                  border: activeImg === i ? "2px solid var(--teal)" : "2px solid transparent",
                  opacity: activeImg === i ? 1 : 0.6,
                }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: `${yacht.tagColor}20`, color: yacht.tagColor, border: `1px solid ${yacht.tagColor}40` }}
            >
              {yacht.tag}
            </span>
            <span className="text-xs tracking-widest uppercase" style={{ color: yacht.tagColor }}>
              {yacht.subtitle}
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
            }}
          >
            {yacht.icon} {yacht.name}
          </h2>

          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            {yacht.fullDesc}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {yacht.detailedSpecs.map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-3 text-center"
                style={{ background: "rgba(38,201,195,0.06)", border: "1px solid rgba(38,201,195,0.1)" }}
              >
                <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                  {s.label}
                </div>
                <div className="text-sm font-semibold" style={{ color: "var(--teal)" }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 mb-6">
            {yacht.specs.map((s) => (
              <div key={s} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--teal)" }}>✓</span> {s}
              </div>
            ))}
          </div>

          <div
            className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl p-5"
            style={{ background: "rgba(38,201,195,0.06)", border: "1px solid rgba(38,201,195,0.15)" }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  color: yacht.highlight ? "var(--teal)" : "var(--text-primary)",
                }}
              >
                {yacht.price}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                {yacht.priceNote}
              </div>
            </div>
            <button
              onClick={onBook}
              className="w-full md:w-auto px-8 py-3 rounded-full text-sm font-semibold btn-teal flex items-center justify-center gap-2"
              style={{ color: "var(--sea-deep)" }}
            >
              Забронировать <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}