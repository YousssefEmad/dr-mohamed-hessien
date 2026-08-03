"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { uiLabels } from "@/data/navigation";

export default function HomeReviews({ reviews = [], sections }) {
  const { pick, t } = useLanguage();

  return (
    <section className="restaurant-tab-area pb-30 mt-60 team-section container-wide position-relative">
      <div className="container">
        <div className="section-title mb-50 text-center">
          <span className="title-tag">{pick(sections, "reviewsTag")}</span>
          <h2>{pick(sections, "reviewsHeading")}</h2>
        </div>

        <div className="tab-content" id="restaurant-tabContent">
          <div className="tab-pane fade show active" role="tabpanel">
            <div className="row">
              <div className="col-lg-4">
                <div className="block-text">
                  <div className="section-title mb-20">
                    <span className="title-tag">
                      {pick(sections, "reviewsSideTag")}
                    </span>
                    <h2>{pick(sections, "reviewsSideHeading")}</h2>
                  </div>
                  <p className="pr-50">{pick(sections, "reviewsSideText")}</p>
                  <Link href="/testimonials/" className="main-btn btn-filled mt-40">
                    {t(uiLabels, "viewMore")}
                  </Link>
                </div>
              </div>

              <div className="px-2 w-100">
                <div className="row team-loop wide-Bureau-post-slider mt-80">
                  {reviews.map((review) => (
                    <div key={review.id} className="col-lg-4 col-md-6">
                      <div className="member-box">
                        <a data-fancybox="reviews" href={review.image}>
                          <div className="member-img">
                            <Image
                              src={review.image}
                              alt={pick(review, "name")}
                              width={400}
                              height={500}
                            />
                          </div>
                        </a>
                        <a
                          href={review.image}
                          data-fancybox="reviews"
                          className="socail-trigger"
                        >
                          <i className="fal fa-eye" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
