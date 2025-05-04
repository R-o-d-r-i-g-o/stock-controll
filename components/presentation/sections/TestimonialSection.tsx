"use client";

import React from "react";
import Slider from "react-slick";
import Header from "../common/Header";
import TestimonialCard from "../cards/TestimonialCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TestimonialSection() {
  const appReviewData = [
    {
      id: 0,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Rayhan Curran",
      review: "Get a fully retina ready site when you build with Startup Framework. Websites look sharper and more gorgeous on devices with retina display support",
    },
    {
      id: 1,
      imageUrl: "/images/kayley.jpg",
      reviewerName: "Kayley Frame",
      review: "As a business targeting high net worth individuals, we were looking for a slick, cool and mini-malistic design for our website",
    },
    {
      id: 2,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Gene Whitfield",
      review: "The most important part of the Startup Framework is the samples",
    },
    {
      id: 3,
      imageUrl: "/images/alan.jpg",
      reviewerName: "Allan Kim",
      review: "I've built my website with Startup just in one day, and it was ready-to-go. ",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 250,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="mt-[9rem] py-10">
      <Header title="testemunhas" subtitle="O que nossos usuários comentam" />
      <div className="mt-8 mx-auto max-w-sm md:max-w-screen-md lg:max-w-screen-lg">
        <Slider {...settings}>
          {appReviewData.map((review) => (
            <div key={review.id}>
              <TestimonialCard imageUrl={review.imageUrl} review={review.review} reviewerName={review.reviewerName} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default TestimonialSection;
