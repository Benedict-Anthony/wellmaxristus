import Image from "next/image";
import hero from "@/assets/images/littleboy.jpg";
import Button from "@/components/Button";
import Link from "next/link";
import HomeAbout from "@/components/HomeAbout";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main>
      <section className="container py-12 flex flex-col justify-between items-center md:flex-row px-4">
        <div className="w-full p-3 text-center md:text-left">
          <h1 className="text-4xl text-center text-lightBlue  md:text-left md:text-7xl md:font-bold">
            <span className="text-lightPink">Learn</span> at home
          </h1>
          <h2 className="text-md text-center md:text-left md:text-3xl my-4 md:font-medium capitalize">
            Discover the Future of Learning with WellMax-Ristus School
          </h2>
          <h4 className="text-sm md:text-2xl text-blue">
            Make learning easy....
          </h4>

          <Button className="text-white mt-5  border-2 bg-lightPink rounded-md hover:bg-darkPink hover:text-white">
            <Link href={"/register"}>Get started</Link>
          </Button>
        </div>
        <div className="w-full ">
          <Image
            src={hero}
            width={400}
            height={400}
            alt="Well Max Ristus"
            className="w-full rounded-lg"
          />
        </div>
      </section>
      <HomeAbout />
      <Services />
    </main>
  );
}
