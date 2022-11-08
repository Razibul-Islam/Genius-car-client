import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const CheckOut = () => {
  const { _id, title, price } = useLoaderData();
  const { user } = useContext(AuthContext);
  // console.log(title);
  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "unregistered";
    const phone = form.phone.value;
    const message = form.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };
    fetch(`https://genius-car-server-red.vercel.app/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Order placed successfully");
          form.reset();
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <form onSubmit={handlePlaceOrder}>
        <h2 className="text-4xl">You are about to order: {title}</h2>
        <h2 className="text-3xl">Price: ${price}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full"
            required
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full"
            required
          />
          <input
            name="phone"
            type="text"
            placeholder="Your Phone"
            className="input input-bordered w-full"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            defaultValue={user?.email}
            className="input input-bordered w-full"
            readOnly
            required
          />
        </div>
        <textarea
          name="message"
          className="textarea textarea-bordered h-24 w-full"
          placeholder="Your Message"
        ></textarea>
        <input
          className="btn btn-warning"
          type="submit"
          value="Place Your Order"
        />
      </form>
    </div>
  );
};

export default CheckOut;
