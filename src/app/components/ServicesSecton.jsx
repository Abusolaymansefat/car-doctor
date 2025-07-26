import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";

export default async function ServicesSection() {
  const db = await dbConnect();
  const servicesCollection = db.collection(collectionNamesObj.servicesCollection);
  const data = await servicesCollection.find({}).toArray();

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {data.length === 0 ? (
        <p className="col-span-12 text-center text-gray-500">No services found.</p>
      ) : (
        data.map((item) => (
          <div
            key={item._id.toString()}
            className="col-span-12 md:col-span-6 lg:col-span-4 border rounded-xl p-4 shadow-sm"
          >
            <Image
              src={item.img}
              alt={item.title}
              width={314}
              height={208}
              className="rounded-md mb-3 object-cover"
            />
            <div className="flex justify-between items-center mt-5">
              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-white text-md font-medium">
                  Price: ${item.price}
                </p>
              </div>
              <Link href={`/services/${item._id}`} className="text-orange-500">
                <FaArrowRight />
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
