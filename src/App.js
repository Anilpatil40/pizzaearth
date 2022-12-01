import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { pizzas } from "./defaults/data";

function App() {
  const [pizza, setPizza] = useState(pizzas[0]);
  const [subTotal, setSubTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [addOns, setAddOns] = useState(false);
  const [totals, setTotals] = useState({
    subTotal: 0,
    total: 0,
  });

  useEffect(() => {
    const subTotal = pizza.price * quantity;
    setTotals({
      subTotal,
      total:
        subTotal -
        (subTotal * pizza.discount) / 100 +
        (addOns && quantity ? 5 : 0),
    });
  }, [pizza, quantity, addOns]);

  return (
    <div className="w-screen h-screen m-auto max-w-screen-md p-20">
      <div className="flex flex-col gap-10">
        <h1 className="text-2xl font-bold">{pizza?.label}</h1>
        <span>{pizza?.description}</span>
        <div className="flex gap-2">
          <div className="flex-1 flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xl">Add Quantity</span>
              <div className="flex items-center gap-4">
                <button
                  className="disabled:bg-slate-300 cursor-pointer bg-gray-400 text-white w-8 h-8 text-center"
                  onClick={() => setQuantity((quantity) => quantity - 1)}
                  disabled={quantity <= 0}
                >
                  -
                </button>
                <span className="w-6 text-center">{quantity}</span>
                <button
                  className="disabled:bg-slate-300 cursor-pointer bg-gray-400 text-white w-8 h-8 text-center"
                  onClick={() => setQuantity((quantity) => quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex gap-3 cursor-pointer">
              <input
                className="cursor-pointer"
                type="checkbox"
                name="toppings"
                id="toppings"
                disabled={quantity == 0}
                onChange={(e) => setAddOns(e.target.checked)}
              />
              <label className="cursor-pointer" htmlFor="toppings">
                Add ons
              </label>
            </div>
          </div>
          <div className="flex-1 p-10 py-20">
            <img className="object-center w-4/5" src={pizza.image} alt="" />
          </div>
        </div>
        <div className="price-container flex">
          <div className="flex flex-col gap-3 ml-auto mr-10">
            <div>Total ${totals?.subTotal}</div>
            <div className="text-blue-500">Discount {pizza.discount}%</div>
            <div className="text-red-500 font-bold">
              To Pay ${totals?.total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
