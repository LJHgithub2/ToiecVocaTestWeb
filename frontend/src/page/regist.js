import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Switch } from '@headlessui/react';

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Regist() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [agreed, setAgreed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        ID: '',
        password: '',
        message: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreed) {
            setError('이용약관에 동의해주세요.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            setError('회원가입에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass =
        'block w-full rounded-xl border-slate-200 px-3.5 py-2.5 text-slate-900 text-sm placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors';
    const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-lg animate-fade-in-up">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg mb-4">
                        <span className="text-white font-bold text-2xl">J</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">회원가입</h1>
                    <p className="text-sm text-slate-500 mt-1">JVT와 함께 TOEIC을 정복하세요</p>
                </div>

                {/* Form card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="lastName" className={labelClass}>성</label>
                                <input
                                    type="text" name="lastName" id="lastName"
                                    autoComplete="family-name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="홍"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label htmlFor="firstName" className={labelClass}>이름</label>
                                <input
                                    type="text" name="firstName" id="firstName"
                                    autoComplete="given-name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="길동"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="ID" className={labelClass}>아이디</label>
                            <input
                                type="text" name="ID" id="ID" required
                                value={formData.ID}
                                onChange={handleInputChange}
                                placeholder="사용할 아이디를 입력하세요"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className={labelClass}>비밀번호</label>
                            <input
                                type="password" name="password" id="password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="비밀번호를 입력하세요"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className={labelClass}>
                                자기소개{' '}
                                <span className="text-slate-400 font-normal">(선택)</span>
                            </label>
                            <textarea
                                name="message" id="message" rows={3}
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="간단한 자기소개를 작성해주세요"
                                className={inputClass + ' resize-none'}
                            />
                        </div>

                        {/* Agreement */}
                        <div className="flex items-center gap-3 py-1">
                            <Switch
                                checked={agreed}
                                onChange={setAgreed}
                                className={cn(
                                    agreed ? 'bg-indigo-600' : 'bg-slate-200',
                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                )}
                            >
                                <span
                                    className={cn(
                                        agreed ? 'translate-x-5' : 'translate-x-0',
                                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                    )}
                                />
                            </Switch>
                            <span className="text-sm text-slate-600">이용약관에 동의합니다</span>
                        </div>

                        {error && (
                            <div className="flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
                                <svg className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !agreed}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : '가입하기'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-slate-500 mt-6">
                    이미 계정이 있으신가요?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                    >
                        로그인
                    </button>
                </p>
            </div>
        </div>
    );
}
