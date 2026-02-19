"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ArrowRight, User, Settings, Layout, Users, ShieldCheck, Database, Star, ChevronRight } from "lucide-react";
import { useProducts } from "./context/ProductContext";
import { getProductImage } from "./data/products";

export default function Home() {
  const { products } = useProducts();

  // Dynamically slice from the live database products
  const collectedByMany = products.slice(0, 3);
  const shopCollection = products.slice(3, 12);

  return (
    <main className="min-h-screen bg-[#FDFCF8] text-[#1a1a1a]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="/images/heropage.jpg" // Local image from public folder
          alt="Classic Art Ceiling"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient for text readability - slightly darker to ensure text pops without shadow */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10 pt-20">
          <h1 className="font-serif font-semibold text-[50px] md:text-[96px] text-white mb-6 leading-[1.2] md:leading-[120px] tracking-[2px] md:tracking-[4.8px] max-w-[1200px]">
            Art that lives with you
          </h1>
          <p className="font-sans text-white font-light text-lg md:text-[24px] leading-relaxed md:leading-[39px] tracking-normal mb-12 max-w-[1000px]">
            Curated artworks created to be seen, felt, and lived with — not just displayed.
          </p>
          <Link href="/shop">
            <button className="w-[258px] h-[56px] bg-[#F3F0EA] border-2 border-white text-black text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center transform hover:translate-y-[-2px] transition-all hover:bg-white hover:border-transparent">
              EXPLORE THE COLLECTION
            </button>
          </Link>
        </div>
      </section>

      {/* Collected By Many Section */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <div className="relative flex flex-col md:flex-row items-center justify-center mb-16">
          <h2 className="font-serif font-normal text-[32px] md:text-[48px] leading-tight md:leading-[60px] text-[#2A2A2A] text-center">
            Collected by many
          </h2>
          <Link href="/shop" className="hidden md:block absolute right-0 font-serif font-normal text-[18px] leading-[21.6px] tracking-normal underline decoration-1 underline-offset-4 text-[#2A2A2A] hover:text-gray-600 transition-colors">
            View all Art
          </Link>
          {/* Mobile only link */}
          <Link href="/shop" className="md:hidden mt-4 font-serif font-normal text-[18px] leading-[21.6px] tracking-normal underline decoration-1 underline-offset-4 text-[#2A2A2A] hover:text-gray-600 transition-colors">
            View all Art
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collectedByMany.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group block">
              <div className="relative w-full h-[370px] overflow-hidden bg-gray-100">
                <Image
                  src={getProductImage(product.images[0])}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-serif font-normal text-[20px] leading-[24px] text-[#2A2A2A]">
                {product.name}
              </h3>
              <p className="mt-1 font-sans font-normal text-[18px] leading-[21.6px] text-[#2A2A2A]">
                $ {product.price.toFixed(2)} USD
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Intimacy/Promotion Section */}
      <section className="w-full bg-[#EBEBEC] h-[393px] flex flex-col items-center justify-center px-4">
        <p className="font-serif font-normal text-[24px] md:text-[36px] leading-relaxed md:leading-[48px] text-center text-[#2A2A2A] max-w-[626px] mb-8">
          A sense of intimacy, togetherness, an inner warmth, a world lit by candles and snuggled under blankets. Bring an enchanting scent to the home.
        </p>
        <Link href="/shop" className="font-serif font-normal text-[24px] leading-[21.6px] underline decoration-1 underline-offset-4 text-[#2A2A2A] hover:text-gray-600 transition-colors">
          Shop Now
        </Link>
      </section>

      {/* Shop Our Collection Section */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <h2 className="font-serif font-normal text-[32px] md:text-[48px] leading-tight md:leading-[60px] text-[#2A2A2A] text-center mb-16">
          Shop Our Collection
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {shopCollection.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group block h-[454px] flex flex-col">
              <div className="relative w-full flex-1 overflow-hidden bg-gray-100">
                <Image
                  src={getProductImage(product.images[0])}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-serif font-normal text-[20px] leading-[24px] text-[#2A2A2A]">
                  {product.name}
                </h3>
                <p className="mt-1 font-sans font-normal text-[18px] leading-[21.6px] text-[#2A2A2A]">
                  $ {product.price.toFixed(2)} USD
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto bg-[#FDFCF8]">
        <div className="max-w-[960px] mx-auto text-center mb-16">
          <h2 className="font-serif font-medium text-[32px] md:text-[48px] leading-none text-[#2A2A2A]">
            We focus on providing the best platform for artists to share and grow.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 xl:gap-20">
          {/* Left Column - Features */}
          <div className="flex flex-col justify-between h-[773px]">
            {/* Feature 1 */}
            <div className="w-[420px] h-[160px] bg-white border border-[#2A2A2A] flex flex-col justify-center px-10 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="relative w-[42px] h-[42px] shrink-0">
                  <Image src="/images/Frame 2121453497.svg" alt="Icon" fill className="object-contain" />
                </div>
                <h3 className="font-serif font-semibold text-[24px] leading-none text-black">User-Friendly Interface</h3>
              </div>
              <p className="font-sans font-medium text-[13px] tracking-wide text-black leading-tight">
                Intuitive design that makes navigation seamless for all users, regardless of tech-savviness.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="w-[420px] h-[160px] bg-white border border-[#2A2A2A] flex flex-col justify-center px-10 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="relative w-[42px] h-[42px] shrink-0">
                  <Image src="/images/Frame 2121453498.svg" alt="Icon" fill className="object-contain" />
                </div>
                <h3 className="font-serif font-semibold text-[24px] leading-none text-black">High Customizability</h3>
              </div>
              <p className="font-sans font-medium text-[13px] tracking-wide text-black leading-tight">
                Allows users to tailor their experience with various settings and personalization options.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="w-[420px] h-[160px] bg-white border border-[#2A2A2A] flex flex-col justify-center px-10 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="relative w-[42px] h-[42px] shrink-0">
                  <Image src="/images/Frame 2121453499.svg" alt="Icon" fill className="object-contain" />
                </div>
                <h3 className="font-serif font-semibold text-[24px] leading-none text-black">Responsive Design</h3>
              </div>
              <p className="font-sans font-medium text-[13px] tracking-wide text-black leading-tight">
                Optimized for both desktop and mobile, providing a consistent experience across all devices.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="w-[420px] h-[160px] bg-white border border-[#2A2A2A] flex flex-col justify-center px-10 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="relative w-[42px] h-[42px] shrink-0">
                  <Image src="/images/Frame 2121453084.svg" alt="Icon" fill className="object-contain" />
                </div>
                <h3 className="font-serif font-semibold text-[24px] leading-none text-black">Integrated Community</h3>
              </div>
              <p className="font-sans font-medium text-[13px] tracking-wide text-black leading-tight">
                Foster connections and growth within a vibrant community of like-minded artists.
              </p>
            </div>
          </div>

          {/* Right Column - Large Image */}
          <div className="w-full lg:w-[653px] h-[500px] lg:h-[773px] relative bg-gray-100">
            <Image
              src="/images/Frame 2121453297.svg"
              alt="Platform Features"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative w-full h-[700px] bg-[#2A2A2A]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/415f55ad013de90965507e42d553bf48dd2f48e3.jpg"
            alt="Gallery Background"
            fill
            className="object-cover opacity-80"
            priority
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative h-full max-w-[1440px] mx-auto flex items-center px-6">
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 lg:pl-32 z-10">
            <h2 className="font-serif font-normal text-[50px] leading-[60px] text-white mb-6 max-w-[456px]">
              Our customers talk about their experiences.
            </h2>

            {/* Stars */}
            <div className="flex gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-white text-white" />
              ))}
            </div>

            <p className="font-sans font-normal text-[24px] leading-tight text-white mb-8 max-w-[549px]">
              “Candle N' Calm candles make great gifts for any occasion, so encourage customers to share how they gifted their candle and how it was received.”
            </p>

            <p className="font-serif text-[32px] text-white">
              Ram Curren
            </p>
          </div>

          {/* Right Person Image */}
          <div className="hidden lg:block absolute right-32 top-1/2 -translate-y-1/2 w-[500px] h-[600px]">
            <div className="relative w-full h-full">
              <Image
                src="/images/Background.svg"
                alt="Ram Curren"
                fill
                className="object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Stories Section */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* Sticky Left Column */}
          <div className="w-full lg:w-1/3 sticky top-32 h-fit flex flex-col items-start gap-10">
            <h2 className="font-serif font-normal text-[50px] leading-[60px] text-[#2A2A2A]">
              Latest from our stories
            </h2>
            <Link
              href="/blog"
              className="font-sans text-[16px] font-normal text-[#2A2A2A] border border-[#2A2A2A] px-[20px] py-[13px] hover:bg-[#2A2A2A] hover:text-white transition-colors"
            >
              View all articles
            </Link>
          </div>

          {/* Right Column - Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {/* Story 1 */}
            <Link href="/blog/perfect-painting-living-room" className="group cursor-pointer block">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <Image
                  src="/images/unsplash_nimElTcTNyY.png"
                  alt="The Art of Selecting"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-[24px] text-[#2A2A2A] mt-6 mb-2">The Art of Selecting Art</h3>
              <p className="font-sans text-[15px] text-gray-500 mb-4 line-clamp-2">Discover how to choose artwork that complements your space and reflects your personality.</p>
              <div className="text-black text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all w-fit border-b border-transparent hover:border-black pb-1">
                Read More <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Story 2 */}
            <Link href="/blog/modern-minimalist-art-guide" className="group cursor-pointer block">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <Image
                  src="/images/unsplash_nimElTcTNyY (1).png"
                  alt="Modern Minimalist Art"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-[24px] text-[#2A2A2A] mt-6 mb-2">Minimalist Art Guide</h3>
              <p className="font-sans text-[15px] text-gray-500 mb-4 line-clamp-2">Everything you need to know about the growing trend of minimalist art and design.</p>
              <div className="text-black text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all w-fit border-b border-transparent hover:border-black pb-1">
                Read More <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Story 3 */}
            <Link href="/blog/sustainability-contemporary-art" className="group cursor-pointer block">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <Image
                  src="/images/unsplash_nimElTcTNyY (2).png"
                  alt="Sustainability in Art"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-[24px] text-[#2A2A2A] mt-6 mb-2">Sustainable Art</h3>
              <p className="font-sans text-[15px] text-gray-500 mb-4 line-clamp-2">Exploring the intersection of creativity and environmental consciousness in art.</p>
              <div className="text-black text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all w-fit border-b border-transparent hover:border-black pb-1">
                Read More <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Story 4 */}
            <Link href="/blog/top-emerging-artists-2024" className="group cursor-pointer block">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <Image
                  src="/images/unsplash_MO5qO9xpZhA.png"
                  alt="Emerging Artists"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-[24px] text-[#2A2A2A] mt-6 mb-2">Artists to Watch</h3>
              <p className="font-sans text-[15px] text-gray-500 mb-4 line-clamp-2">Our curated selection of emerging talents who are redefining contemporary art.</p>
              <div className="text-black text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all w-fit border-b border-transparent hover:border-black pb-1">
                Read More <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section (Find art that belongs with you) */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <div className="w-full max-w-[1282px] mx-auto h-[277px] bg-[#FDFCF8] border border-[#2A2A2A] flex flex-col justify-center items-center gap-8 px-4">
          <div className="text-center space-y-3">
            <h2 className="font-serif font-semibold text-[36px] leading-tight text-[#2A2A2A]">
              Find art that belongs with you
            </h2>
            <p className="font-sans font-medium text-[20px] leading-tight text-[#6B6B6B] max-w-[460px] mx-auto">
              Carefully curated pieces designed to live naturally in your space
            </p>
          </div>

          <Link href="/shop">
            <button className="w-full md:w-[382px] h-[56px] bg-white border border-[#2A2A2A] flex items-center justify-center gap-2 font-sans font-medium text-[16px] text-[#2A2A2A] hover:bg-[#2A2A2A] hover:text-white transition-colors">
              Explore the full collection <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main >
  );
}
