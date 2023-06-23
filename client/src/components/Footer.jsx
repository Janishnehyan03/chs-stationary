import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="text-center lg:text-left bg-gray-100 text-gray-600">
        <div className="mx-6 py-10 text-center md:text-left">
          <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className>
              <h6
                className="
      uppercase
      font-semibold
      mb-4
      flex
      items-center
      justify-center
      md:justify-start
    "
              >
                SHOPPING CART
              </h6>
            </div>
          </div>
        </div>
        <div className="text-center p-6 bg-gray-200">
          <span>© 2023 Copyright: </span>
          <a
            className="text-gray-600 mx-3 font-semibold"
            href="https://digitiostack.co.in/"
          >
            Digitio Stack |
          </a>
          <a
            className="text-gray-600 font-semibold"
            href="https://github.com/Janishnehyan03/"
          >
            Janish Nehyan
          </a>
        </div>
      </footer>
    </>
  );
}
