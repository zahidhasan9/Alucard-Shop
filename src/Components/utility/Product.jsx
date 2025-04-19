import React from "react";

// image import
import ImgBanner from "../../assets/images/Pro-category/c1.webp";
import P1 from "../../assets/images/Pro-category/P1.webp";
import P2 from "../../assets/images/Pro-category/P2.webp";
import P3 from "../../assets/images/Pro-category/P3.webp";
import P4 from "../../assets/images/Pro-category/P4.webp";
import P5 from "../../assets/images/Pro-category/P5.webp";
import P6 from "../../assets/images/Pro-category/P6.webp";

const prod = [
  {
    id: 1,
    name: "Rayban Rounded Sunglass Brown Color",
    price: 85.62,
    originalPrice: 320.54,
    soldBy: "Young Music Shop",
    rating: 5,
    reviews: 1,
    image: P1,
  },
  {
    id: 2,
    name: "Herschel Leather Duffle Bag In Brown Color",
    price: 102,
    originalPrice: 320.54,
    soldBy: "Young Music Shop",
    rating: 5,
    reviews: 1,
    image: P2,
  },
  {
    id: 3,
    name: "Grand Slam Indoor Of Show Jumping Novel",
    price: 66,
    originalPrice: 320.54,
    soldBy: "Young Music Shop",
    rating: 5,
    reviews: 1,
    image: P3,
  },
  {
    id: 4,
    name: "Unero Military Classical Backpack",
    price: 98,
    originalPrice: 320.54,
    soldBy: "Young Music Shop",
    rating: 5,
    reviews: 1,
    image: P4,
  },
  {
    id: 5,
    name: "Sleeve Linen Blend Caro Pane Shirt",
    price: 85.62,
    originalPrice: 320.54,
    soldBy: "Young Music Shop",
    rating: 5,
    reviews: 1,
    image: P5,
  },
  {
    id: 6,
    name: "Men’s Sports Runnning Swim Board Shorts",
    price: 12,
    originalPrice: 320.54,
    soldBy: "Young Music Shop",
    rating: 5,
    reviews: 1,
    image: P6,
  },
];
const menu = [
  { menu: "Best Seller" },
  { menu: "New Arrival" },
  { menu: "Boys" },
  { menu: "Girls" },
  { menu: "Baby" },
  { menu: "Women" },
  { menu: "Sales Deal" },
  { menu: "Combo Offer" },
];
const Product = () => {
  return (
    <div className=" bg-gray-700">
      <div className="container  shadow-md">
        <div className="flex md:flex-row flex-col gap-1 md:h-[630px] font-Fira bg-gray-200 text-gray-600">
          <div className="flex justify-center lg:w-2/5 md:w-2/12 bg-red-500 ">
            <div className="md:relative lg:w-2/5 w-full p-5 bg-red-50 ">
              <div className="flex flex-col items-start gap-y-2 md:gap-y-10 ">
                <h1 className="text-xl font-normal md:text-2xl ">Clothing</h1>
                <div className="flex flex-wrap md:flex-col cursor-pointer text-[11px] md:text-sm">
                  {menu.map((menu, idx) => (
                    <ul className=" md:py-1 pr-3" key={idx}>
                      <li>{menu.menu}</li>
                    </ul>
                  ))}
                </div>
                <div className="md:absolute bottom-5">
                  <h1 className="text-[10px] md:text-xs ">View All</h1>
                </div>
              </div>
            </div>
            <div className="w-2/3 hidden lg:block">
              <img
                className="object-cover w-full h-full"
                src={ImgBanner}
                alt="banner"
              />
            </div>
          </div>
          <div className="Rside flex justify-center items-center lg:w-2/3 w-full bg bg-red-400 h-full">
            <div className="grid grid-cols-4 md:grid-cols-3  gap-1">
              {prod.map((data, idx) => (
                <div
                  key={idx}
                  className=" flex flex-col items-center justify-center col-span-2 md:col-span-1 md:py-3 bg-yellow-400 "
                >
                  <div className=" lg:size-48 md:size-36 size-54">
                  <img
                    className="object-cover w-full h-full"
                    src={data.image}
                    alt={data.name}
                  />
                  </div>
                  <div className="flex flex-col text-sm items-start md:pt-5 mx-5">
                    <h1 className="text-blue-700 font-Blinker leading-tight cursor-pointer">{data.name}</h1>
                    <p className="text-xs py-0.5">Price: {data.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
