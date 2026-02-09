import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ArrowRight, User, Settings, Layout, Users, ShieldCheck, Database } from "lucide-react";

// Using Unsplash IDs that closely match the design aesthetic - NOW PULLED FROM DATA/PRODUCTS.TS
import { products, getProductImage } from "./data/products";

export default function Home() {
  const collectedByMany = products.slice(0, 3);
  const shopCollection = products.slice(3, 9); // items 4-9

  return (
    <main className="min-h-screen bg-[#FDFCF8] text-[#1a1a1a]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src={getProductImage("/images/unsplash_nimElTcTNyY.png")} // Fresco style replacement
          alt="Classic Art Ceiling"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10 pt-20">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.1] tracking-tight drop-shadow-lg">
            Art that lives with you
          </h1>
          <p className="font-sans text-white/90 text-sm md:text-base max-w-lg mb-12 tracking-wide font-light drop-shadow-md">
            Curated artworks created to be seen, felt, and lived with — not just displayed.
          </p>
          <Link href="/shop">
            <button className="bg-white text-black px-10 py-4 text-xs font-bold tracking-[0.2em] transform hover:translate-y-[-2px] transition-transform uppercase shadow-xl hover:bg-gray-100">
              Explore the Collection
            </button>
          </Link>
        </div>
      </section>

      {/* Collected By Many Section */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-baseline mb-16 border-b border-gray-200 pb-4">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a]">Collected by many</h2>
          <Link href="/shop" className="text-sm border-b border-black pb-1 hover:text-gray-600 transition-colors">
            View all Art
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-12">
          {collectedByMany.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group block">
              <div className="relative aspect-square overflow-hidden mb-6 bg-[#f4f4f5]">
                <Image
                  src={getProductImage(product.images[0])}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <h3 className="font-serif text-xl text-[#1a1a1a] group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
                <p className="text-sm text-gray-500 font-medium">$ {product.price.toFixed(2)} USD</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-[#f2f0ea] py-32 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="font-serif text-3xl md:text-5xl text-[#1a1a1a] leading-tight mb-10">
            A sense of intimacy, togetherness, an inner warmth, a world lit by <span className="italic">art</span> and snuggled under blankets. Bring an enchanting scent to the home.
          </p>
          <Link href="/shop" className="text-[#1a1a1a] border-b border-black pb-1 hover:text-gray-600 transition-colors uppercase text-xs tracking-widest font-bold">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Shop Our Collection Grid */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-[#1a1a1a] mb-20">Shop Our Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {shopCollection.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-[#f4f4f5]">
                <Image
                  src={getProductImage(product.images[0])}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-xl mb-1 group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
                  <p className="text-sm text-gray-500">$ {product.price.toFixed(2)} USD</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto bg-[#faf9f6]">
        <h2 className="font-serif text-4xl md:text-5xl text-center text-[#1a1a1a] mb-20 leading-tight border-b border-gray-200 pb-10">
          We focus on providing the best platform for<br /> artists to share and grow.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-4">
            {/* Feature 1 */}
            <div className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow flex items-start space-x-6">
              <div className="p-3 bg-gray-50 rounded-full flex-shrink-0">
                <Users className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg mb-2">User Friendly Interface</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Navigating the platform is smooth and intuitive, allowing artists to focus on what matters most.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow flex items-start space-x-6">
              <div className="p-3 bg-gray-50 rounded-full flex-shrink-0">
                <ShieldCheck className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg mb-2">High Security</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We verify all users and transactions to ensure a safe environment for everyone.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow flex items-start space-x-6">
              <div className="p-3 bg-gray-50 rounded-full flex-shrink-0">
                <Database className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg mb-2">Secure Data</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Your data is encrypted and stored securely, giving you peace of mind.
                </p>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow flex items-start space-x-6">
              <div className="p-3 bg-gray-50 rounded-full flex-shrink-0">
                <Layout className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg mb-2">Intuitive Design</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Designed with the user in mind, making it easy to manage your collection.
                </p>
              </div>
            </div>

          </div>

          <div className="relative h-[650px] w-full sticky top-10">
            <Image
              src="/images/unsplash_MO5qO9xpZhA (1).png" // Mountain Landscape replacement
              alt="Landscape Painting"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-black text-white relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Text Content */}
          <div className="p-16 lg:p-24 flex flex-col justify-center relative bg-[url('/images/unsplash_nimElTcTNyY (1).png')] bg-cover bg-blend-overlay bg-black/70">
            <h2 className="font-serif text-4xl md:text-5xl mb-12 leading-tight">
              Our customers talk about their experiences.
            </h2>
            <div className="flex space-x-1 mb-8">
              {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-[#d4a373] text-2xl">★</span>)}
            </div>
            <p className="text-gray-300 mb-10 font-sans font-light text-xl leading-relaxed italic">
              &quot;The quality of the art pieces I received was absolutely astounding. They bring such a unique warmth to my living space.&quot;
            </p>
            <div className="mt-auto">
              <p className="font-serif text-2xl">Ram Curren</p>
              <p className="text-sm text-gray-400 uppercase tracking-wider mt-1">Art Collector</p>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[500px] lg:h-auto min-h-[500px]">
            <Image
              src="/images/unsplash_nimElTcTNyY (2).png"
              alt="Customer"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Latest Stories Section */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3 flex flex-col justify-between sticky top-32 h-fit">
            <div>
              <h2 className="font-serif text-5xl md:text-6xl text-[#1a1a1a] mb-8 leading-[1.1]">Latest from<br /> our stories</h2>
              <p className="text-gray-500 mb-10 text-lg">Dive into the world of art, inspiration, and creativity.</p>
            </div>
            <Link href="/shop">
              <button className="border border-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                View all articles
              </button>
            </Link>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Story 1 */}
            <div className="space-y-4 group cursor-pointer">
              <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                <Image
                  src={getProductImage(products[0].images[0])}
                  alt="Story 1"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-xl pt-2">The beauty of Texture</h3>
            </div>
            {/* Story 2 */}
            <div className="space-y-4 group cursor-pointer mt-0 md:mt-16">
              <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                <Image
                  src={getProductImage(products[4].images[0])}
                  alt="Story 2"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-xl pt-2">Natural Landscapes</h3>
            </div>
            {/* Story 3 */}
            <div className="space-y-4 group cursor-pointer">
              <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                <Image
                  src={getProductImage(products[6].images[0])}
                  alt="Story 3"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-xl pt-2">Botany in Art</h3>
            </div>
            {/* Story 4 */}
            <div className="space-y-4 group cursor-pointer mt-0 md:mt-16">
              <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                <Image
                  src={getProductImage(products[1].images[0])}
                  alt="Story 4"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-xl pt-2">Blue Hues</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 bg-[#f2f0ea]">
        <div className="max-w-3xl mx-auto bg-white p-12 md:p-20 text-center shadow-xl">
          <h2 className="font-serif text-4xl mb-6">Find art that belongs with you</h2>
          <p className="text-gray-500 mb-10 max-w-md mx-auto">
            Carefully curated pieces designed to live naturally in your space
          </p>
          <Link href="/shop">
            <button className="bg-white border border-black px-10 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center mx-auto hover:bg-black hover:text-white transition-colors">
              Explore the full collection <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
