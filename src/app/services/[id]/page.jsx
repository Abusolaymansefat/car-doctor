import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image";
import React from "react";

export default async function servicesDetailsPage({ params }) {
  const p = await params;
  const servicesCollection = dbConnect(collectionNameObj.servicesCollection);
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
      <section>
        <Image src={data.img} width={400} height={200} alt="data.title"></Image>
        <h2 className="font-bold text-amber-400"> {data.title}</h2>
      </section>
      <h2>{p.id}</h2>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
