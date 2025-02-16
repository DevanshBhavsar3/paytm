"use client";

import { Button } from "@/components/button";
import { Details } from "@/components/details";
import { Footer } from "@/components/footer";
import { Heading } from "@/components/heading";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FiCreditCard } from "react-icons/fi";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { MdOutlineShield } from "react-icons/md";

export default function Home() {
  return (
    <main className="h-fit">
      <section className="h-fit p-5 bg-blue-500 text-white flex px-5 md:px-12 justify-center items-center flex-wrap">
        <div className="flex flex-col justify-center items-center gap-5 my-24">
          <Heading
            text="India's Most-loved Payments App"
            size="xl"
            style="max-w-lg text-center"
          />
          <p className="text-lg">
            Send money to your friends effortlessly with ePay.
          </p>
          <Button
            text="Sign Up for free"
            type="button"
            size="md"
            variant="tertiary"
            onClick={() => redirect("/auth/signup")}
          />
        </div>
        <div className="w-full h-1/2 rounded-lg border-2 border-blue-200 bg-blue-100/70 p-2">
          <Image
            src="/demo.png"
            alt="demo image"
            className="rounded-lg w-full h-full object-cover border-2 border-blue-200"
          />
        </div>
      </section>
      <section className="h-1/2 py-24 flex flex-col justify-center items-center gap-16">
        <Heading text="Why choose ePay?" size="lg" />
        <div className="flex justify-center items-center text-center gap-3">
          <Details
            icon={<FiCreditCard size={42} className="text-blue-500" />}
            text="Secure Transactions"
            subText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <Details
            icon={
              <HiOutlineLightningBolt size={42} className="text-blue-500" />
            }
            text="Lightning Fast"
            subText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
          <Details
            icon={<MdOutlineShield size={42} className="text-blue-500" />}
            text="Fraud Protection"
            subText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
