"use client";

import { useTranslation } from "@/lib/i18n/language-context";
import Image from "next/image";

export function CharityClient() {
  const { t } = useTranslation();

  const charityEvents = [
    {
      image: "/images/charity-elderly.jpg",
      title: t["charity.event1.title"],
      desc: t["charity.event1.desc"],
    },
    {
      image: "/images/charity-children.jpg",
      title: t["charity.event2.title"],
      desc: t["charity.event2.desc"],
    },
    {
      image: "/images/charity-group.jpg",
      title: t["charity.event3.title"],
      desc: t["charity.event3.desc"],
    },
    {
      image: "/images/charity-mountain-medical.jpg",
      title: t["charity.event4.title"],
      desc: t["charity.event4.desc"],
    },
    {
      image: "/images/charity-mountain-ginseng.jpg",
      title: t["charity.event5.title"],
      desc: t["charity.event5.desc"],
    },
    {
      image: "/images/charity-mountain-nursing.jpg",
      title: t["charity.event6.title"],
      desc: t["charity.event6.desc"],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#8B0000] to-[#6B0000] text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">{t["charity.title"]}</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">{t["charity.subtitle"]}</p>
        </div>
      </section>

      {/* 公益理念 */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#8B0000] mb-4">{t["charity.mission.title"]}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">{t["charity.mission.desc"]}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-[#F5F0E8] rounded-lg">
              <div className="text-5xl mb-4">️</div>
              <h3 className="text-xl font-bold text-[#8B0000] mb-2">{t["charity.value1.title"]}</h3>
              <p className="text-gray-600">{t["charity.value1.desc"]}</p>
            </div>
            <div className="text-center p-6 bg-[#F5F0E8] rounded-lg">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-[#8B0000] mb-2">{t["charity.value2.title"]}</h3>
              <p className="text-gray-600">{t["charity.value2.desc"]}</p>
            </div>
            <div className="text-center p-6 bg-[#F5F0E8] rounded-lg">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-[#8B0000] mb-2">{t["charity.value3.title"]}</h3>
              <p className="text-gray-600">{t["charity.value3.desc"]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 公益活动 */}
      <section className="py-16 bg-[#F5F0E8]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#8B0000] mb-12">{t["charity.events.title"]}</h2>

          <div className="space-y-12">
            {charityEvents.map((event, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={600}
                      height={400}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-[#8B0000] mb-4">{event.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{event.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 公益承诺 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#8B0000] mb-6">{t["charity.promise.title"]}</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">{t["charity.promise.desc"]}</p>
          <div className="bg-[#F5F0E8] p-8 rounded-lg border-l-4 border-[#8B0000]">
            <p className="text-xl text-[#8B0000] font-medium italic">{t["charity.promise.quote"]}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{t["charity.cta.title"]}</h2>
          <p className="text-xl opacity-90 mb-8">{t["charity.cta.desc"]}</p>
          <a
            href="https://wa.me/85265131587"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#8B0000] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            {t["charity.cta.button"]}
          </a>
        </div>
      </section>
    </div>
  );
}
