import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getVocabularys } from '../services/vocabularyService';
import { useAuth } from '../context/AuthContext';
// const callouts = [
//     {
//         name: '노랭이 단어장',
//         description: '해커스 단어장입니다.',
//         imageSrc: '/image/collections/1.jpg',
//         imageAlt: '단어장 이미지',
//         href: '/collections/1',
//     },
// ];

export default function Collections() {
    const navigate = useNavigate();
    const { user, setIsAuthenticated } = useAuth();
    const [vocab, setVocab] = useState([]);

    useEffect(() => {
        const fetchVocabularys = async () => {
            try {
                const data = await getVocabularys();
                if (data) {
                    setVocab(data);
                } else {
                    // 인증실패
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.log('Failed to fetch profile data.');
                setIsAuthenticated(false);
            }
        };
        fetchVocabularys();
    }, []);

    useEffect(() => {
        console.log(vocab);
    }, [vocab]);

    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 xs:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-5 lg:max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900">
                        단어장 목록
                    </h2>

                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                        {!vocab ? (
                            <div></div>
                        ) : (
                            vocab.map((item) => (
                                <div key={item.name} className="">
                                    <div className="h-80 w-full hover:opacity-75 overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                                        <img
                                            src={item.vocabulary_images}
                                            alt={item.vocabulary_images}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center gap-x-2">
                                        <div>
                                            <h2 className="mt-6 text-sm text-gray-500">
                                                <span className="" />
                                                {item.name}
                                            </h2>
                                            <p className="text-base font-semibold text-gray-900">
                                                {item.description}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-pretty inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 w-auto sm:text-sm"
                                            onClick={() => {
                                                navigate(item.name);
                                            }}
                                        >
                                            단어장 보기
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
