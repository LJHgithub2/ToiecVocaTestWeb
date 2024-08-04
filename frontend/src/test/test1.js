import React, { useState, useRef } from 'react';

export default function StyleWrapper() {
    const [items, setItems] = useState([
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' },
    ]);

    const containerRef = useRef(null);

    const handleRemoveItem = (id) => {
        const element = document.getElementById(`item-${id}`);
        element.classList.add('animate-shrinkOut');

        setTimeout(() => {
            // 요소 삭제 후 스크롤 애니메이션
            const prevScrollY = containerRef.current.scrollTop;
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));

            setTimeout(() => {
                containerRef.current.scrollTo({
                    top: prevScrollY - element.offsetHeight,
                    behavior: 'smooth',
                });
            }, 10); // DOM 업데이트 후 스크롤 위치 조정
        }, 300); // 애니메이션 시간과 일치
    };

    return (
        <div
            ref={containerRef}
            className="max-h-[300px] overflow-auto space-y-4"
        >
            {items.map((item) => (
                <div
                    key={item.id}
                    id={`item-${item.id}`}
                    className="p-4 bg-gray-100 rounded shadow transition transform duration-300"
                >
                    <span>{item.text}</span>
                    <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}

const styles = `
  @keyframes shrinkOut {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }

  .animate-shrinkOut {
    animation: shrinkOut 0.3s ease-out forwards;
  }
`;
