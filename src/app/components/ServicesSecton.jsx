import dbConnect from "@/lib/dbConnect";
import Image from "next/image";
import React from "react";

export default async function ServicesSecton() {
  const servicesCollection = dbConnect("test_services");
  const data = await servicesCollection.find({}).toArray();

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {data.map((item) => (
        <div
          key={item._id}
          className="col-span-12 md:col-span-6 lg:col-span-4 border rounded-xl p-4 shadow-sm"
        >
          <Image
            src={item.img}
            width={314}
            height={208}
            alt={item.title}
            className="rounded-md mb-3"
          />
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className="text-gray-600 text-md font-medium">Price: ${item.price}</p>
        </div>
      ))}
    </div>
  );
}
