"use client";

import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";
import { uiLabels } from "@/data/navigation";

export default function DoctorPageView({ doctor }) {
  const { pick, t, lang } = useLanguage();
  const credentials =
    lang === "en" ? doctor.credentialsEn : doctor.credentialsAr;

  return (
    <>
      <Breadcrumb titleAr={doctor.nameAr} titleEn={doctor.nameEn} />
      <section className="about-section pt-115 pb-115">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-40">
              <Image
                src={doctor.image}
                alt={pick(doctor, "name")}
                width={600}
                height={750}
                className="img-fluid"
              />
            </div>
            <div className="col-lg-6">
              <div className="section-title mb-30">
                <span className="title-tag">{pick(doctor, "title")}</span>
                <h2>{pick(doctor, "name")}</h2>
              </div>
              <p className="mb-30">{pick(doctor, "bio")}</p>
              <ul className="list-icon mb-40">
                {credentials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href="/contact/" className="main-btn btn-filled">
                {t(uiLabels, "bookNow")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
