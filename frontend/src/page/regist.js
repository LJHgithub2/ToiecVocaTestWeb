import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useAuth } from '../context/AuthContext';
import { Switch } from '@headlessui/react';
import axios from '../config/axiosConfig'; // Adjust the import path based on your project structure

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Regist() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [agreed, setAgreed] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        ID: '',
        password: '',
        message: '',
    });
    const [formStatus, setFormStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (agreed) {
                await register(formData);
                setFormStatus('로그인 성공');
                navigate('/');
            } else {
                setFormStatus('동의를 해주세요.');
            }
        } catch (error) {
            setFormStatus('로그인 실패');
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                aria-hidden="true"
            >
                <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#67ff5d] to-[#4edfff44] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    회원가입
                </h2>
            </div>
            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-16 max-w-xl sm:mt-20"
            >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            성
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                autoComplete="family-name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            이름
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                autoComplete="given-name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="ID"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            ID
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="ID"
                                id="ID"
                                required
                                value={formData.ID}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            Password
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="message"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            가입 메시지
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                name="message"
                                id="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <Switch.Group
                        as="div"
                        className="flex gap-x-4 sm:col-span-2"
                    >
                        <div className="flex h-6 items-center">
                            <Switch
                                checked={agreed}
                                onChange={setAgreed}
                                className={classNames(
                                    agreed ? 'bg-blue-600' : 'bg-gray-200',
                                    'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                )}
                            >
                                <span className="sr-only">
                                    Agree to policies
                                </span>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        agreed
                                            ? 'translate-x-3.5'
                                            : 'translate-x-0',
                                        'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                    )}
                                />
                            </Switch>
                        </div>
                        <Switch.Label className="text-sm leading-6 text-gray-600">
                            동의?
                        </Switch.Label>
                    </Switch.Group>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className={`block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
            ${
                agreed
                    ? 'bg-my-color-600 text-white hover:bg-my-hover-color cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
                        disabled={!agreed}
                    >
                        회원가입 요청
                    </button>
                    {formStatus && (
                        <p
                            className={`mt-4 text-center text-sm ${
                                formStatus.includes('successful')
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            }`}
                        >
                            {formStatus}
                        </p>
                    )}
                </div>
            </form>
            <style>
                {`
                    button:disabled {
                        background-color: #cccccc; /* 비활성화된 상태의 배경색 */
                        color: #999999; /* 비활성화된 상태의 텍스트색 */
                        cursor: not-allowed; /* 비활성화된 상태에서 커서 */
                    }

                    button:disabled:hover {
                        /* 비활성화된 상태에서는 hover 효과가 없도록 지정 */
                        background-color: #cccccc;
                        color: #999999;
                    }
                `}
            </style>
        </div>
    );
}
