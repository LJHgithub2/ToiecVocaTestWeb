import CheckBox from "./button/checkBox";
import CounterBtn from "./button/counterBtn";
import DetailView from "./detailView";
import React, { useState } from "react";

function Item(props) {
  var person = props.person;
  var index = props.index;
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li key={person.word} className=" py-2">
      <div
        className={`flex justify-between items-center cursor-pointer transition duration-300 ease-in-out ${
          isOpen ? "bg-gray-100" : ""
        }`}
      >
        <div>
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-3xl font-semibold leading-6 text-gray-900">
                {person.word}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-x-5">
          <div className="hidden sm:flex sm:flex-col flex-wrap">
            <p className="text-sm my-1 grow text-right leading-10 text-gray-900 max-w-lg sm:max-w-xs md:max-w-sm lg:max-w-lg line-clamp-1 break-all">
              {person.mean}
            </p>
            <p className="text-xs my-2 leading-5 text-right text-gray-500">
              {person.role}
            </p>
          </div>
          <div className="flex flex-col">
            <CheckBox id={person.word}></CheckBox>
            <CounterBtn></CounterBtn>
          </div>
          <div className="flex items-center">
            <button className = "hover:transition-all hover:scale-110" onClick={() => toggleAccordion()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 transition duration-300 ease-in-out ${
                  isOpen ? "transform rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* 아코디언으로 표시된 상세 정보 */}
      {isOpen && (
        <div className="">
          <div className="bg-white p-4 border shadow-md">
            <p>Additional details about {person.word}</p>
            <DetailView person={person}></DetailView>
          </div>
        </div>
      )}
    </li>
  );
}

export default Item;
