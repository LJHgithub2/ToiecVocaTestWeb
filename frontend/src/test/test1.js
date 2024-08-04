import React, { useState, useRef } from 'react';

function TEST1() {
    const [items, setItems] = useState([]);
    const lastItemRef = useRef(null);

    const handleAddItem = () => {
        // 새로운 아이템 추가
        const newItem = `Item ${items.length + 1}`;
        setItems([...items, newItem]);
        console.log(items);

        // DOM이 업데이트되고 나서 스크롤을 이동하기 위해 setTimeout 사용
        setTimeout(() => {
            lastItemRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100); // 100ms 딜레이 후 스크롤 이동
    };

    return (
        <div className="flex flex-col items-center p-4">
            <button
                onClick={handleAddItem}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Add Item
            </button>

            <div className="w-full max-w-md space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        ref={index === items.length - 1 ? lastItemRef : null}
                        className="p-4 bg-gray-100 rounded shadow transition transform duration-300 opacity-0 animate-fadeInUp"
                    >
                        {item}
                        sada
                    </div>
                ))}
            </div>
        </div>
    );
}

// Tailwind의 커스텀 애니메이션 유틸리티 추가
const styles = `
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.3s ease-out forwards;
  }
`;

// 스타일을 컴포넌트에 추가
const StyleWrapper = () => (
    <>
        <style>{styles}</style>
        <TEST1 />
    </>
);

export default StyleWrapper;
