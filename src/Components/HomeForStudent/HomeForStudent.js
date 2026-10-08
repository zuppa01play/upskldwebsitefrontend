import React, { useEffect, useRef } from 'react';
import "./HomeForStudent.css";
import StudentImage from "./Student.png";

const HomeForStudent = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("for_student_ho_pg_visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("for_student_ho_pg_visible");
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="for_student_ho_pg_section" ref={sectionRef}>
      {/* Animated background */}
      <div className="for_student_ho_pg_bg" aria-hidden="true">
        <span className="for_student_ho_pg_blob for_student_ho_pg_blob_one" />
        <span className="for_student_ho_pg_blob for_student_ho_pg_blob_two" />
        <span className="for_student_ho_pg_blob for_student_ho_pg_blob_three" />
        <span className="for_student_ho_pg_dots" />
      </div>

      <div className="for_student_ho_pg_container">
         
        <h2 className="for_student_ho_pg_title">
          For students: turn uncertainty into a career advantage.
        </h2>
        <span className="for_student_ho_pg_underline" />

        <p className="for_student_ho_pg_quote">
          &ldquo;I may not be a tech person — but I can still be AI-ready.&rdquo;
        </p>

        <div className="for_student_ho_pg_content">
          <div className="for_student_ho_pg_image_wrap">
            <img
              className="for_student_ho_pg_image"
              src={StudentImage}
              alt="Students learning AI skills together on a laptop"
              loading="lazy"
            />
          </div>

          <div className="for_student_ho_pg_right">
            <p className="for_student_ho_pg_lead">
              From knowing AI tools... to showing employers what you can actually do.
            </p>

            <div className="for_student_ho_pg_card_light">
              <span className="for_student_ho_pg_label_dark">
                IN THE INTERVIEW, NOT JUST SAYING
              </span>
              <h3 className="for_student_ho_pg_say">&ldquo;I know AI.&rdquo;</h3>
            </div>

            <div className="for_student_ho_pg_card_dark">
              <span className="for_student_ho_pg_label_light">BUT PROVING</span>
              <h3 className="for_student_ho_pg_prove">
                &ldquo;Here is how I use it.&rdquo;
              </h3>
              <p className="for_student_ho_pg_example">
                &ldquo;Used AI to analyse 500 customer reviews and present three
                product recommendations to the team.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeForStudent;