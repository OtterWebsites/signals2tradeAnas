import React from 'react'
// import { HeroScrollDemo } from "@/components/vidoe-scroll";
import Hero from "@/components/hero";
import CreateAccountSection from "@/components/CreateAccountSection";
import {TestimonialsSection} from "@/components/testimonials-section";
import MemberInterviewsSection from "@/components/MemberInterviewsSection";
import GlobalStudentsVideos from "@/components/GlobalStudentsVideos";

const page = () => {
  return (
    <div>
      {/* <HeroScrollDemo /> */}
      <Hero />
      <CreateAccountSection />
      <TestimonialsSection />
      <MemberInterviewsSection />
      <GlobalStudentsVideos />
    </div>
  )
}

export default page
