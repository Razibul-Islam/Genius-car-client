import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [service, setService] = useState([]);
  useEffect(() => {
    fetch("https://genius-car-server-red.vercel.app/services")
      .then((res) => res.json())
      .then((data) => setService(data));
  }, []);
  return (
    <div>
      <div className="text-center mb-4">
        <p className="font-bold text-2xl text-orange-600">Services</p>
        <h1 className="font-semibold text-5xl">Our Service Area</h1>
        <p className="capitalize">
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.{" "}
        </p>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-6">
        {service.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
