import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function servicesDetailsPage({ params }) {
  const p = await params;
  const servicesCollection = dbConnect(collectionNamesObj.servicesCollection);
  const data = await servicesCollection.findOne({ _id: new ObjectId(p.id) });
  return (
    <div>
      <section className="flex justify-center">
        <figure className="relative w-full max-w-7xl">
          <Image
            src={"/assets/images/checkout/checkout.png"}
            width={1120}
            height={300}
            alt="{banner}"
            className="w-full h-auto"
          ></Image>
          <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
          <div className="w-full h-full font-bold text-2xl flex items-center ps-160">
           <div>
             <h1 className="text-amber-500"> services Details</h1>
           </div>
          </div>
          </div>
        </figure>
      </section>
      <section className="container mx-auto grid grid-cols-12 gap-4 mt-4">
        {/* Left Side */}
        <div className="col-span-9 space-y-4">
          <Image
            className="w-full"
            src={data?.img}
            width={400}
            height={280}
            alt={data.title}
          />
          <h1 className="font-bold text-3xl">{data.title}</h1>
          <p className="text-justify">{data?.description}</p>
        </div>
        {/* Right Side */}
        <div className="col-span-3 space-y-4">
          <Link href={`/checkout/${data._id}`}>
            <button className="w-full text-white h-9 bg-orange-500">
              Checkout
            </button>
          </Link>
          <p className="text-center text-xl font-bold">
            Price: $ {data?.price}
          </p>
        </div>
      </section>
    </div>
  );
}
